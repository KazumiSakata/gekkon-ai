from openai import OpenAI
import PyPDF2

client = OpenAI(base_url="http://localhost:1234/v1", api_key="lm-studio")

def pdf_to_txt(pdf_path, output_txt):
    with open(pdf_path, 'rb') as pdf_file:
        pdf_reader = PyPDF2.PdfReader(pdf_file)

        text = ''

        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text += page.extract_text()

    with open(output_txt, 'w+', encoding='utf-8') as txt_file:
        txt_file.write(text)


def summarize(message_text):
    completion = client.chat.completions.create(
        model="gemma-2-9b",
        messages=[
            {"role": "system",
             "content": "Ты – бот, который специализируется на создании точных суммаризаций научных текстов. Ты "
                        "анализируешь содержание и представляешь текст в сжатой форме, сохраняя основной смысл и "
                        "контекст. Ты должен адаптироваться под любые стили и форматы текста, предоставляя ответ, "
                        "соответствующий запросам пользователя."},
            {"role": "user", "content": f"Сократи текст статьи: {message_text}"}
        ],
        temperature=0.9,
    )
    return completion.choices[0].message.content


pdf_to_txt('files/article.pdf', 'article_text.txt')

with open('article_text.txt', 'r+', encoding='utf-8') as text:
    art_text = text.read()

summarized_text = summarize(art_text)

with open('summary.txt', 'w+', encoding='utf-8') as sum:
    sum.write(summarized_text)
