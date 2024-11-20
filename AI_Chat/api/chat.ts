const fetch = require('node-fetch');

exports.handler = async (event, context) => {
    const { message } = JSON.parse(event.body);
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
