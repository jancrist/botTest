const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const fs = require('fs');

const ChatGPTClass = require("./chatgptcoreclass");
const chatGPT = new ChatGPTClass();


const {PROMPT, INFO, PREGUNTAS, TODO} = require ("./PROMPT");

const flowpreguntascivil = addKeyword("preguntas comunes")

    .addAnswer(["¡Hola, soy Pasantebot! 🤖 (1/2)",
                "Fui entrenado en las preguntas más comunes de los servicios civiles del despacho, entonces puedes preguntarme libremente."],
        {delay: 2000},
        async() => {
            console.log("Sending to chatGPT:", PREGUNTAS);
            const response = await chatGPT.handleMsgChatGPT(PREGUNTAS);
            console.log("Received from chatGPT:", response);
        })
    .addAnswer(["Recuerda que puedes concluir la charla mandando *CERRAR*.",
                "O bien, si estás interesado en adquirirme puedes escribir *CONTRATAR* para que te contacte con nuestro personal. "
            ]) 
    .addAnswer("Adelante dime como puedo ayudarte, siéntete libre de hablarme como a un humano.😉 (2/2)",
        {capture:true}, 
        async (ctx, {flowDynamic, fallBack, gotoFlow}) => {
            console.log("User message:", ctx.body);
            const response = await chatGPT.handleMsgChatGPT(ctx.body);
            console.log("Received from chatGPT:", response);
            const message = response.text;

            if (ctx.body === "INICIO") {
                gotoFlow(flowPrincipal);
            } else if (ctx.body === "CERRAR") {
                gotoFlow(flowcerrar);
            } else if (ctx.body === "CONTACTAR") {
                gotoFlow(flowcontactar);
            } else if (![`INICIO`, `CERRAR`, `CONTACTAR`].includes(ctx.body)) {
                await fallBack(message);
            }
        }
    );
   
    const flowpreguntasmercantil = addKeyword("preguntas comunes")

    .addAnswer(["¡Hola, soy Pasantebot! 🤖 (1/2)",
                "Fui entrenado en las preguntas más comunes de los servicios civiles del despacho, entonces puedes preguntarme libremente."],
        {delay: 2000},
        async() => {
            console.log("Sending to chatGPT:", PREGUNTAS);
            const response = await chatGPT.handleMsgChatGPT(PREGUNTAS);
            console.log("Received from chatGPT:", response);
        })
    .addAnswer(["Recuerda que puedes concluir la charla mandando *CERRAR*.",
                "O bien, si estás interesado en adquirirme puedes escribir *CONTRATAR* para que te contacte con nuestro personal. "
            ]) 
    .addAnswer("Adelante dime como puedo ayudarte, siéntete libre de hablarme como a un humano.😉 (2/2)",
        {capture:true}, 
        async (ctx, {flowDynamic, fallBack, gotoFlow}) => {
            console.log("User message:", ctx.body);
            const response = await chatGPT.handleMsgChatGPT(ctx.body);
            console.log("Received from chatGPT:", response);
            const message = response.text;

            if (ctx.body === "INICIO") {
                gotoFlow(flowPrincipal);
            } else if (ctx.body === "CERRAR") {
                gotoFlow(flowcerrar);
            } else if (ctx.body === "CONTACTAR") {
                gotoFlow(flowcontactar);
            } else if (![`INICIO`, `CERRAR`, `CONTACTAR`].includes(ctx.body)) {
                await fallBack(message);
            }
        }
    );

    const flowpreguntasfamiliar = addKeyword("preguntas comunes")

    .addAnswer(["¡Hola, soy Pasantebot! 🤖 (1/2)",
                "Fui entrenado en las preguntas más comunes de los servicios civiles del despacho, entonces puedes preguntarme libremente."],
        {delay: 2000},
        async() => {
            console.log("Sending to chatGPT:", PREGUNTAS);
            const response = await chatGPT.handleMsgChatGPT(PREGUNTAS);
            console.log("Received from chatGPT:", response);
        })
    .addAnswer(["Recuerda que puedes concluir la charla mandando *CERRAR*.",
                "O bien, si estás interesado en adquirirme puedes escribir *CONTRATAR* para que te contacte con nuestro personal. "
            ]) 
    .addAnswer("Adelante dime como puedo ayudarte, siéntete libre de hablarme como a un humano.😉 (2/2)",
        {capture:true}, 
        async (ctx, {flowDynamic, fallBack, gotoFlow}) => {
            console.log("User message:", ctx.body);
            const response = await chatGPT.handleMsgChatGPT(ctx.body);
            console.log("Received from chatGPT:", response);
            const message = response.text;

            if (ctx.body === "INICIO") {
                gotoFlow(flowPrincipal);
            } else if (ctx.body === "CERRAR") {
                gotoFlow(flowcerrar);
            } else if (ctx.body === "CONTACTAR") {
                gotoFlow(flowcontactar);
            } else if (![`INICIO`, `CERRAR`, `CONTACTAR`].includes(ctx.body)) {
                await fallBack(message);
            }
        }
    );



module.exports = {
    flowpreguntascivil,
    flowpreguntasmercantil,
    flowpreguntasfamiliar,
};
