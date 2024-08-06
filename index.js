const { ValidateApi } = require('@guardrails-ai/api-client');

async function main() {
    const client = new ValidateApi({
        basePath: 'http://127.0.0.1:8000/',
        middleware: []
    });

    // Validating pre-fetched/static data using a remote guard 
    console.log("A successful validation on static data")
    await client.validate({
        guardName: 'arize',
        validatePayload: {
            llmOutput: "two words"
        }
    }).then(console.log);
    
    console.log("\nAn unsuccessful validation on static data")
    await client.validate({
        guardName: 'arize',
        validatePayload: {
            llmOutput: "oneword"
        }
    }).then(console.log);


    // Validating data generated by a model using a remote guard
    // Here, the guardrails server generates the data through OpenAI
    console.log("\n A successful validation on LLM data")
    await client.validate({
        guardName: 'arize',
        validatePayload: {
            model: "gpt-4o-mini",
            messages: [{
                role: "user",
                content: "return two lower case words to me, separated by a space"
            }]
        }
    }).then(console.log);


    console.log("\n An unsuccessful validation on LLM data")
    await client.validate({
        guardName: 'arize',
        validatePayload: {
            model: "gpt-4o-mini",
            messages: [{
                role: "user",
                content: "return three lower case words to me, separated by a space"
            }]
        }
    }).then(console.log);

    console.log("\n A successful validation on LLM data")
    await client.validate({
        guardName: 'arize',
        validatePayload: {
            model: "gpt-4o-mini",
            messages: [{
                role: "user",
                content: "return two lower case words to me, separated by a space"
            }]
        }
    }).then(console.log);
}


main();