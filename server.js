const express = require('express');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');

const app = express();
const port = 3000;

// Инициализация OpenAI с твоим API ключом
const openai = new OpenAI({
  apiKey: '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',  // Замените на свой ключ
});

// Middleware для парсинга JSON данных
app.use(bodyParser.json());

// Роут для общения с GPT
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: 'No message provided' });
  }

  try {
    const response = await openai.completions.create({
      model: 'text-davinci-003',  // Или другой GPT модель, например, gpt-3.5-turbo
      prompt: userMessage,
      max_tokens: 150,
    });

    res.json({ response: response.choices[0].text.trim() });
  } catch (error) {
    console.error('Error interacting with OpenAI:', error);
    res.status(500).json({ error: 'Something went wrong with OpenAI' });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
