const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const fs = require('fs');

const {flowpreguntascivil, flowpreguntasmercantil, flowpreguntasfamiliar} = require ("./preguntas")

//Portafolio de servicios civiles
const Portafoliocivil = 'portafolio/mis_productos_civil.txt';
const ContenidoPortafoliocivil = fs.readFileSync(Portafoliocivil, 'utf8');
const Servicioscivil = JSON.parse(ContenidoPortafoliocivil);

    const productoscivil = Servicioscivil.map(servicio => servicio.nombres).flat();

    const getServicioCivil = (keyword) => {
        return Servicioscivil.find(servicio => servicio.nombres.some(name => name.toLowerCase() === keyword.toLowerCase()));
    }

//Portafolio de servicios mercantiles
const Portafoliomercantil = 'portafolio/mis_productos_mercantil.txt';
const ContenidoPortafoliomercantil = fs.readFileSync(Portafoliomercantil, 'utf8');
const Serviciosmercantil = JSON.parse(ContenidoPortafoliomercantil);

    const productosmercantil = Serviciosmercantil.map(servicio => servicio.nombres).flat();

    const getServiciomercantil = (keyword) => {
        return Serviciosmercantil.find(servicio => servicio.nombres.some(name => name.toLowerCase() === keyword.toLowerCase()));
    }

//Portafolio de servicios familiares
const Portafoliofamiliar = 'portafolio/mis_productos_familiar.txt';
const ContenidoPortafoliofamiliar = fs.readFileSync(Portafoliofamiliar, 'utf8');
const Serviciosfamiliar = JSON.parse(ContenidoPortafoliofamiliar);

    const productosfamiliar = Serviciosfamiliar.map(servicio => servicio.nombres).flat();

    const getServiciofamiliar = (keyword) => {
        return Serviciosfamiliar.find(servicio => servicio.nombres.some(name => name.toLowerCase() === keyword.toLowerCase()));
    }

//Flujo Productos Civil
const flowproductocivil = addKeyword(productoscivil)
.addAnswer("A continuación te muestro más información:", {delay: 2000},
async (ctx, {flowDynamic, fallBack}) => {
    const respuesta = ctx.body; 
   
    const servicio = getServicioCivil(respuesta);

    if (servicio) {
        await flowDynamic(`Título: ${servicio.titulo}
Precio: ${servicio.precio}
Descripción: ${servicio.descripcion_larga}
Datos necesarios: ${servicio.datos_necesarios}`);

    } else {
        fallBack("Lo siento, no tenemos ese producto o servicio.")
    }
})
.addAnswer (["Puedo contactarte con personal de IUSBotics escribiendo *CONTRATAR*.",
            "También puedo regresarte al *INICIO* o *CERRAR*, sólo tienes que escribir esas palabras.",
            "Puedes entrar al apartado de *preguntas comunes* con PasanteBot, o si prefieres puedes escribir *buscar de nuevo* para que sigas jugando con la opción de ofrecer servicios."],
            {capture: true},
            async(ctx, { fallBack, gotoFlow }) => {
                const { flowPrincipal } = require("./app");
                const { flowcerrar, flowcontratar, flowservicios} = require ("./flowhijos")
                const { RespuestaProductos, RespuestaPadres } = require("./respuestas");
                const userResponse = ctx.body.toLowerCase();
            
                if (ctx.body === "INICIO") {
                   gotoFlow(flowPrincipal);
                } else if (ctx.body === "CERRAR") {
                   gotoFlow(flowcerrar);
                } else if (ctx.body === "CONTRATAR") {
                   gotoFlow(flowcontratar);
                } else if (userResponse.includes("buscar de nuevo")) {
                    gotoFlow(flowservicios);
                } else if (!RespuestaProductos.includes(userResponse) && !RespuestaPadres.includes(ctx.body)) {
                  return fallBack('Lo sentimos, no tenemos esa opción, pero puedes seleccionar entre los servicios que ofrecemos.');
                }
              }, [flowpreguntascivil]
            );

//Flujo Productos Mercantil
const flowproductomercantil = addKeyword(productosmercantil)
.addAnswer("A continuación te muestro más información:", {delay: 2000},
async (ctx, {flowDynamic, fallBack}) => {
    const respuesta = ctx.body; 
   
    const servicio = getServiciomercantil(respuesta);

    if (servicio) {
        await flowDynamic(`Título: ${servicio.titulo}
Precio: ${servicio.precio}
Descripción: ${servicio.descripcion_larga}
Datos necesarios: ${servicio.datos_necesarios}`);

    } else {
        fallBack("Lo siento, no tenemos ese producto o servicio.")
    }
})
.addAnswer (["Puedo contactarte con personal de IUSBotics escribiendo *CONTRATAR*.",
            "También puedo regresarte al *INICIO* o *CERRAR*, sólo tienes que escribir esas palabras.",
            "Puedes entrar al apartado de *preguntas comunes* con PasanteBot, o si prefieres puedes escribir *buscar de nuevo* para que sigas jugando con la opción de ofrecer servicios."],
            {capture: true},
            async(ctx, { fallBack, gotoFlow }) => {
                const { flowPrincipal } = require("./app");
                const { flowcerrar, flowcontratar, flowservicios} = require ("./flowhijos")
                const { RespuestaProductos, RespuestaPadres } = require("./respuestas");
                const userResponse = ctx.body.toLowerCase();
            
                if (ctx.body === "INICIO") {
                   gotoFlow(flowPrincipal);
                } else if (ctx.body === "CERRAR") {
                   gotoFlow(flowcerrar);
                } else if (ctx.body === "CONTRATAR") {
                   gotoFlow(flowcontratar);
                } else if (userResponse.includes("buscar de nuevo")) {
                    gotoFlow(flowservicios);
                } else if (!RespuestaProductos.includes(userResponse) && !RespuestaPadres.includes(ctx.body)) {
                  return fallBack('Lo sentimos, no tenemos esa opción, pero puedes seleccionar entre los servicios que ofrecemos.');
                }
              },[flowpreguntasmercantil]
            );

//Flujo Productos Familiar
const flowproductofamiliar = addKeyword(productosfamiliar)
.addAnswer("A continuación te muestro más información:", {delay: 2000},
async (ctx, {flowDynamic, fallBack}) => {
    const respuesta = ctx.body; 
   
    const servicio = getServiciofamiliar(respuesta);

    if (servicio) {
        await flowDynamic(`Título: ${servicio.titulo}
Precio: ${servicio.precio}
Descripción: ${servicio.descripcion_larga}
Datos necesarios: ${servicio.datos_necesarios}`);


    } else {
        fallBack("Lo siento, no tenemos ese producto o servicio.")
    }
})
.addAnswer (["Puedo contactarte con personal de IUSBotics escribiendo *CONTRATAR*.",
            "También puedo regresarte al *INICIO* o *CERRAR*, sólo tienes que escribir esas palabras.",
            "Puedes entrar al apartado de *preguntas comunes* con PasanteBot, o si prefieres puedes escribir *buscar de nuevo* para que sigas jugando con la opción de ofrecer servicios."],
            {capture: true},
            async(ctx, { fallBack, gotoFlow }) => {
                const { flowPrincipal } = require("./app");
                const { flowcerrar, flowcontratar, flowservicios} = require ("./flowhijos")
                const { RespuestaProductos, RespuestaPadres } = require("./respuestas");
                const userResponse = ctx.body.toLowerCase();
            
                if (ctx.body === "INICIO") {
                   gotoFlow(flowPrincipal);
                } else if (ctx.body === "CERRAR") {
                   gotoFlow(flowcerrar);
                } else if (ctx.body === "CONTRATAR") {
                   gotoFlow(flowcontratar);
                } else if (userResponse.includes("buscar de nuevo")) {
                    gotoFlow(flowservicios);
                } else if (!RespuestaProductos.includes(userResponse) && !RespuestaPadres.includes(ctx.body)) {
                  return fallBack('Lo sentimos, no tenemos esa opción, pero puedes seleccionar entre los servicios que ofrecemos.');
                }
              },[flowpreguntasfamiliar]
            );


module.exports = {
    flowproductocivil,
    flowproductomercantil,
    flowproductofamiliar,
};
