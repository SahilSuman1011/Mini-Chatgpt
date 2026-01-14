import Groq from 'groq-sdk';

const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

async function main(){
    const completion = await groq.chat.completions.create({
        temperature: 0,
        model: 'llama-3.3-70b-versatile',
        messages: [
            {
                role: 'system',
                content: 'You are Alfred, a smart personal assistant. Be always polite.',
            },
            {
                role: 'user',
                content: 'what is current delhi weather',
            }
        ]
    });

    console.log(completion.choices[0].message.content);
}
main()