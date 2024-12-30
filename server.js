import express from 'express';
import bodyParser from 'body-parser';
import { initChat } from "@mumulhl/duckduckgo-ai-chat";
import { marked } from 'marked';
import { markedTerminal } from 'marked-terminal';

marked.use(markedTerminal());
const app = express();
const port = 13130;

const chat = await initChat("gpt-4o-mini");

app.use(bodyParser.json());

app.post('/translate', async (req, res) => {
    let userInput = req.body.sentence;

    if (!userInput) {
        return res.status(400).json({ error: '[-] No sentence provided' });
    }

    if (userInput === '!redo') {
        try {
            await chat.redo();
            console.log('[+] Redo action executed successfully.');
            return res.status(200).json({ message: 'Redo action executed successfully.' });
        } catch (error) {
            console.error('[-] Failed to execute redo action:', error);
            return res.status(500).json({ error: 'Failed to execute redo action.' });
        }
    }

    if (userInput.startsWith('@')) {
        userInput = "Please translate and explain grammar: " + userInput.slice(1);
    }

    try {
        let message = await chat.fetchFull(userInput);
        
        let formattedMessage = marked.parseInline(message);
        formattedMessage = marked.parse(formattedMessage);

        console.log(formattedMessage);

        return res.status(200).json({ message: 'Translation successful.', translation: formattedMessage });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
