const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/chat', async (req, res) => {
    const { message } = req.body;
    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003',
            prompt: message,
            max_tokens: 100,
        }, {
            headers: {
                'Authorization': `Bearer YOUR_API_KEY`, // Заменить на твой ключ API
            },
        });

        res.json({ reply: response.data.choices[0].text.trim() });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Что-то пошло не так.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

