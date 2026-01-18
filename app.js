import Groq from 'groq-sdk';

const groq = new Groq({apiKey: process.env.GROQ_API_KEY});

async function main(){
    const completion = await groq.chat.completions.create({
        temperature: 0,
        model: 'llama-3.3-70b-versatile',
        messages: [
            {
                role: 'system',
                content: `You are Alfred, a smart personal assistant. Be always polite.
                You have access to following tools:
                1. searchWeb({query}: {query: string}) // search latest information and realtime data on the internet.`,
            },
            {
                role: 'user',
                content: 'when was iphone 16 launched?',
            }
        ] ,

        tools: [
               {
      "type": "function",
      "function": {
        "name": "webSearch",
        "description": "search latest information and realtime data on the internet.",
        "parameters": {
          // JSON Schema object
          type: "object",
          properties: {
            query: {
              type: "string",
              description: "The search query to perform search on."
            },
          },
          "required": ["query"]
        }
      }
    }
        ],

        tool_choice: 'auto',
    });


    const toolCalls = completions.choices[0].message.tool_calls

    if(!toolCalls){
        console.log(`Assistant: ${completions.choices[0].message.content}`)
        return;
    }

    for(const tool of toolCalls){
        console.log('tool: ', tool);
    }

    console.log(JSON.stringify(completion.choices[0].message, null, 2));
}

main()

async function webSearch({query}) {

    return 'Delhi CM is Ms Rekha Gupta';
}