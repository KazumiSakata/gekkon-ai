# Геккон AI
 ИИ-суммаризатор, анализирующий и преобразовывающий информацию с источника в сокращенном виде, с использованием инфографики для менее времязатратного изучения темы. 
Web-приложение для автоматического резюмирования научных статей, построенное на HTML5 и CSS с бэкендом на Python и Javascript, использующее LM Studio для интеграции языковой модели.
## Демо

Ознакомиться с демо-записью работы бота можно ознакомиться по ссылке: https://disk.yandex.ru/d/y8yq46-_HZDR0A
## Основные фишки

- **Мультиязычность:** Поддержка нескольких языков для суммаризации научных статей (включая английский, русский и другие распространенные языки).
- **Специальные метрики:** Использование метрик ROUGE, BLEU и METEOR для оценки качества суммаризаций.
- **Адаптация для разных дисциплин:** Модель учитывает особенности различных областей знаний (медицина, техника, социальные науки).
- **Скорость и удобство:** Высокая производительность и точность благодаря интеграции с LM Studio.
- **Пользовательский интерфейс:** Простой и интуитивный интерфейс, доступный в браузере.
- **Q&A система:** Возможность задать вопрос по статье и получить на него ответ
## Установка

### Требования
- **Python 3.10+**
- **Node.js и npm** для управления зависимостями JavaScript
- **LM Studio** для интеграции языковой модели
- **Git** (для клонирования репозитория)

### Алгоритм установки
1. Клонируйте репозиторий:
    ```bash
    git clone https://github.com/KazumiSakata/gekkon-ai.git
    cd gekkon-ai
    ```

2. Установите Python-зависимости:
    ```bash
    pip install -r requirements.txt
    ```

3. Установите Node-зависимости:
    ```bash
    npm install
    ```
4. Установите LM Studio по ссылке: https://lmstudio.ai/download
5. Скачайте модель Gemma2 в LM Studio по ссылке: lmstudio://open_from_hf?model=DiTy/gemma-2-9b-it-russian-function-calling-GGUF
6. В настройках LM Studio: General > Уровень сложности интерфейса: Разработчик
7. В левом меню перейдите во вкладку "Разработка"
8. В верхнем меню выберите модель Gemma2 с подходящими настройками (У нас: Длина контекста - 8192, Разгрузка GPU - 42/42, CPU Thread Pool Size - 6, Размер пакета оценки - 512) и нажмите "Загрузить модель" (Ctrl+Enter)
9. Дождитесь завершения загрузки модели
10. С помощью кнопки "Start" (Ctrl+R) запустите локальный сервер с LLM
11. C помощью терминала запустите сервер:
```bash
node server.js
```
12. Откройте `http://localhost:3000/` в браузере

## Набор файлов
1. README.md
2. question.py
3. summarizer.py
4. summary.txt
5. question.txt
6. answer.txt
6. package.json
7. package-lock.json
8. article_text.txt
10. analysis.ipynb
11. ./public/index.html
12. ./public/script.js
13. ./public/style.css
14. ./public/logo.png
15. ./files/article.pdf

## Использование

1. Откройте 'localhost:3000' и загрузите научную статью в формате '.pdf' в окошко "Загрузите PDF файл, с которым хотите работать"
2. Нажмите кнопку «Отправить», ожидайте ответа от сервера.
3. Просмотрите результаты в поле "Результат ".
4. Вы можете задать вопросы по статье и получить на них ответ в поле "Введите ваш вопрос здесь"

## Дорожная карта проекта
**Ход работы**
- [x] Создание макета сайта, написание алгоритма суммаризатора
- [x] Реализация базового функционала
- [x] Интеграция LLM Gemma2 c помощью LM Studio
- [x] Добавление функции "Q&A"
- [x] Поддержка нескольких языков
    - [x] Русский
    - [ ] Английский

**Планы на будущее:**

- **База данных:** Добавление системы управления базой данных для хранения историй суммаризаций и обучения модели.
- **Самообучение модели:** Модель будет обучаться на новых данных и улучшать свои результаты.
- **Инфографика:** Автоматический перевод сгенерированного текста в визуальные диаграммы и инфографику.
- **Анализ статей источников:** Оптимизация анализа данных из крупных источников (PubMed, ArXiv и др.) для сокращения времени обработки.
- **Рекомендательная система и личный кабинет:** В дальнейшем каждый пользователь сможет делиться своими суммаризациями с коммьюнити, а также пользователю будут предлагаться похожие статьи.
## Поддержка проекта

Мы приветствуем вклад сообщества в развитие проекта! Чтобы внести свой вклад:

1. Форкните репозиторий.
2. Создайте новую ветку (`git checkout -b feature/YourFeature`).
3. Сделайте изменения и зафиксируйте их (`git commit -m 'Add new feature'`).
4. Запушьте изменения в свою ветку (`git push origin feature/YourFeature`).
5. Откройте Pull Request.

## Контакты

Для вопросов и предложений:

- Email: lopaev.zakhar@mail.ru
- VK: [Zakhar Lopaev](https://vk.com/jfproduction)

## Благодарности

Особая благодарность участникам проекта и команде SberAI за доступ к языковым моделям, которые сделали проект возможным. Благодарим авторов и команды разработчиков LM Studio и Hugging Face за предоставленные инструменты.

---