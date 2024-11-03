from openai import OpenAI

client = OpenAI(base_url="http://localhost:1234/v1", api_key="lm-studio")


def answer(article_text, question):
    completion = client.chat.completions.create(
        model="gemma-2-9b",
        messages=[
            {"role": "system",
             "content": f"Тебе нужно профессионально ответить на вопрос пользователя по этой статье: {article_text}"},
            {"role": "user", "content": f"Ответь на вопрос: {question}"}
        ],
        temperature=0.9,
    )
    return completion.choices[0].message.content


with open('article_text.txt', 'r+', encoding='utf-8') as text:
    art_text = text.read()

with open('question.txt', 'r+', encoding='utf-8') as q:
    question_text = q.read()

answer_text = answer(art_text, question_text)

with open('answer.txt', 'w+', encoding='utf-8') as ans:
    ans.write(answer_text)
