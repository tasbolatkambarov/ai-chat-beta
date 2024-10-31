const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const { message } = JSON.parse(event.body);

    // Настройки для запроса к OpenAI API
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const apiKey = process.env.OPENAI_API_KEY;  // Ключ будет храниться в Netlify

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [{ role: 'user', content: message }],
            }),
        });
        
        const data = await response.json();

        // Отправляем ответ обратно на сайт
        return {
            statusCode: 200,
            body: JSON.stringify({ response: data.choices[0].message.content }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Ошибка при обработке запроса' }),
        };
    }
};
