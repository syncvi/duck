import { initChat } from "@mumulhl/duckduckgo-ai-chat";
import readline from 'readline';
import { marked } from 'marked';
import { markedTerminal } from 'marked-terminal';

const chat = await initChat("gpt-4o-mini");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

marked.use(markedTerminal());

async function startChat() {
    rl.question("You: ", async (userInput) => {
        if (userInput.toLowerCase() === 'redo') {
            chat.redo();
            console.log("Redoing the last message...");
            startChat();
            return;
        }

        if (userInput.startsWith('@')) {
            userInput = "Please translate and explain grammar: " + userInput;
        }

        let message = await chat.fetchFull(userInput);
        
        var formattedMessage = marked.parseInline(message);
        formattedMessage = marked.parse(formattedMessage);
        console.log(formattedMessage);

        startChat(); 
    });
}

startChat();
