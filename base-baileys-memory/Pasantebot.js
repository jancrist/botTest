const { createBot, createProvider, createFlow, addKeyword, addAnswer, EVENTS } = require('@bot-whatsapp/bot')

const ChatGPTClass = require("./chatgptcoreclass");
const chatGPT = new ChatGPTClass();

const {PROMPT, INFO, PREGUNTAS, TODO} = require ("./PROMPT");

const flowPrincipal = require("./app")
const {flowcerrar, flowcontratar, flowcontactar, flowservicios } = require ("./flowhijos")

const flowpasantebot = addKeyword("3", "PASANTEBOT", {capture:true})

    .addAnswer(["¡Hola, soy Pasantebot! 🤖 (1/2)",
                "Soy una inteligencia artificial que está para brindarte una primera asesoría"],
        {delay: 2000},
        async() => {
            console.log("Sending to chatGPT:", PROMPT);
            const response = await chatGPT.handleMsgChatGPT(PROMPT);
            console.log("Received from chatGPT:", response);
        })

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


module.exports = flowpasantebot
