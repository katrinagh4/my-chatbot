const express = require('express');
const { OpenAI } = require('openai');  // исправленный импорт
const app = express();
const port = 3000;

// Инициализация OpenAI с использованием API ключа
const openai = new OpenAI({
  apiKey: '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',  // Замени на свой ключ
});

// Пример простого эндпоинта для общения с GPT-3
app.post('/chat', async (req, res) => {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4.0',  // Укажи нужную модель
      messages: [{ role: 'user', content: req.body.message }],
    });

    res.json(response);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
