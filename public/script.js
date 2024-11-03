// Add floating animation for logo on page load
window.addEventListener('load', () => {
    const logo = document.querySelector('.logo');
    logo.classList.add('float');
});

// Smooth scroll to results section after form submission
document.getElementById('uploadForm').onsubmit = async function(event) {
    event.preventDefault();
    const formData = new FormData(document.getElementById('uploadForm'));
    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        if (result.success) {
            document.getElementById('result').textContent = result.summary;
            document.getElementById('result-section').scrollIntoView({ behavior: 'smooth' });
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert('Ошибка при загрузке файла.');
    }
};

// Smooth scroll effect for question submission
async function submitQuestion() {
    const question = document.getElementById('question-input').value;
    try {
        const response = await fetch('/question', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ question })
        });
        const result = await response.json();
        if (result.success) {
            document.getElementById('answer').textContent = result.answer;
            document.getElementById('answer-section').scrollIntoView({ behavior: 'smooth' });
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert('Ошибка при отправке вопроса.');
    }
}
