const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const app = express();

app.use(express.json());

// Upload storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const dir = path.join(__dirname, 'files');
        fs.readdir(dir, (err, files) => {
            if (err) throw err;
            for (const file of files) {
                fs.unlinkSync(path.join(dir, file));
            }
            cb(null, dir);
        });
    },
    filename: (req, file, cb) => {
        cb(null, 'article.pdf');
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Только PDF файлы разрешены для загрузки'));
        }
    }
});

app.use(express.static(path.join(__dirname, 'public')));

// Upload route
app.post('/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: 'Файл не загружен.' });
    }

    exec('python3 summarizer.py', (error, stdout, stderr) => {
        if (error) {
            console.error('Ошибка при выполнении скрипта:', stderr);
            return res.status(500).json({
                success: false,
                message: 'Ошибка при выполнении скрипта.',
                error: stderr
            });
        }

        fs.readFile(path.join(__dirname, 'summary.txt'), 'utf8', (err, data) => {
            if (err) {
                return res.status(500).json({ success: false, message: 'Не удалось прочитать summary.txt' });
            }
            res.json({ success: true, summary: data });
        });
    });
});

// Question route
app.post('/question', (req, res) => {
    const question = req.body.question;
    fs.writeFile(path.join(__dirname, 'question.txt'), question, (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Не удалось записать вопрос в question.txt' });
        }

        exec('python3 question.py', (error, stdout, stderr) => {
            if (error) {
                console.error('Ошибка при выполнении скрипта:', stderr);
                return res.status(500).json({
                    success: false,
                    message: 'Ошибка при выполнении скрипта.',
                    error: stderr
                });
            }

            fs.readFile(path.join(__dirname, 'answer.txt'), 'utf8', (err, data) => {
                if (err) {
                    return res.status(500).json({ success: false, message: 'Не удалось прочитать answer.txt' });
                }
                res.json({ success: true, answer: data });
            });
        });
    });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
