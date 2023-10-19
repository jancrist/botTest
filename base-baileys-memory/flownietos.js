const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const fs = require('fs');

//Importarmos Flows bisnietos
const {flowproductocivil, flowproductomercantil, flowproductofamiliar} = require ("./flowbisnietos")

//Portafolio de servicios civiles
const Portafoliocivil = 'portafolio/mis_productos_civil.txt';
let mensajecivil = ``;
const ContenidoPortafoliocivil = fs.readFileSync(Portafoliocivil, 'utf8');
const Servicioscivil = JSON.parse(ContenidoPortafoliocivil);

    Servicioscivil.forEach(product => {
    mensajecivil += `*${product.titulo}*\n`;
    mensajecivil += `Precio: ${product.precio}\n`;
    mensajecivil += `Descripción: ${product.descripcion_corta}\n`;
    });

//Portafolio de servicios mercantiles
const Portafoliomercantil = 'portafolio/mis_productos_mercantil.txt';
let mensajemercantil = ``;
const ContenidoPortafoliomercantil = fs.readFileSync(Portafoliomercantil, 'utf8');
const Serviciosmercantil = JSON.parse(ContenidoPortafoliomercantil);

    Serviciosmercantil.forEach(product => {
    mensajemercantil += `*${product.titulo}*\n`;
    mensajemercantil += `Precio: ${product.precio}\n`;
    mensajemercantil += `Descripción: ${product.descripcion_corta}\n`;
    });

//Portafolio de servicios familiares
const Portafoliofamiliar = 'portafolio/mis_productos_familiar.txt';
let mensajefamiliar = ``;
const ContenidoPortafoliofamiliar = fs.readFileSync(Portafoliofamiliar, 'utf8');
const Serviciosfamiliar = JSON.parse(ContenidoPortafoliofamiliar);
    
        Serviciosfamiliar.forEach(product => {
        mensajefamiliar += `*${product.titulo}*\n`;
        mensajefamiliar += `Precio: ${product.precio}\n`;
        mensajefamiliar += `Descripción: ${product.descripcion_corta}\n`;
        });

//Flow CIVIL 

const flowcivil =  addKeyword("civil")
.addAnswer([
  "Dentro de los servicios en materia Civil nos especializamos en Contratos y Demandas.",
  "A continuación te mostraré algo de nuestro portafolio de servicios:"
  ], {delay:2000, media: `./imagenes/imagen_civil.jpeg`}
)
.addAnswer(`Estos serían los productos:\n${mensajecivil}`, {delay: 2000})
.addAnswer([
    "Puedo darte más información del producto que quieres, o bien, contactarte con nuestro abogado.",
    "Únicamente escribe el producto o *CONTACTAR* para enlazarte con alguien.", 
    ],
    {delay: 2000, capture: true},
    async(ctx, { fallBack, gotoFlow }) => {
        const { flowPrincipal } = require("./app");
        const { flowcerrar, flowcontratar} = require ("./flowhijos")
        const { RespuestaCivil, RespuestaPadres } = require("./respuestas");
        const userResponse = ctx.body.toLowerCase();
    
        if (ctx.body === "INICIO") {
           gotoFlow(flowPrincipal);
        } else if (ctx.body === "CERRAR") {
           gotoFlow(flowcerrar);
        } else if (ctx.body === "CONTRATAR") {
           gotoFlow(flowcontratar);
        } else if (!RespuestaCivil.includes(userResponse) && !RespuestaPadres.includes(ctx.body)) {
          return fallBack('Lo sentimos, no tenemos esa opción, pero puedes seleccionar entre los servicios que ofrecemos.');
        }
      },
      [flowproductocivil]
    );

//Flow MERCANTIL
const flowmercantil = addKeyword("mercantil")
.addAnswer([
  "Dentro de los servicios en materia Mercantil nos especializamos en Contratos y Demandas.",
  "A continuación te mostraré algo de nuestro portafolio de servicios:"
  ], {delay:2000, media: `./imagenes/imagen_mercantil.jpg`})
  .addAnswer(`Estos serían los productos:\n${mensajemercantil}`, {delay: 2000})
  .addAnswer([
        "Puedo darte más información del producto que quieres, o bien, contactarte con nuestro abogado.",
        "Únicamente escribe el producto o *CONTACTAR* para enlazarte con alguien.", 
        ],
        {delay: 2000, capture: true},
        async(ctx, { fallBack, gotoFlow }) => {
            const { flowPrincipal } = require("./app");
            const { flowcerrar, flowcontratar} = require ("./flowhijos")
            const { RespuestaMercantil, RespuestaPadres } = require("./respuestas");
            const userResponse = ctx.body.toLowerCase();
        
            if (ctx.body === "INICIO") {
               gotoFlow(flowPrincipal);
            } else if (ctx.body === "CERRAR") {
               gotoFlow(flowcerrar);
            } else if (ctx.body === "CONTRATAR") {
               gotoFlow(flowcontratar);
            } else if (!RespuestaMercantil.includes(userResponse) && !RespuestaPadres.includes(ctx.body)) {
              return fallBack('Lo sentimos, no tenemos esa opción, pero puedes seleccionar entre los servicios que ofrecemos.');
            }
          },
          [flowproductomercantil]
        );


//Flow FAMILIAR
const flowfamiliar = addKeyword("familiar")
.addAnswer([
  "Dentro de los servicios en materia Familiar nos especializamos en Contratos y Demandas.",
  "A continuación te mostraré algo de nuestro portafolio de servicios:"
  ], {delay:2000, media: `./imagenes/imagen_familiar.jpg`})
  .addAnswer(`Estos serían los productos:\n${mensajefamiliar}`, {delay: 2000})
  .addAnswer([
        "Puedo darte más información del producto que quieres, o bien, contactarte con nuestro abogado.",
        "Únicamente escribe el producto o *CONTACTAR* para enlazarte con alguien.", 
        ],
        {delay: 2000, capture: true},
        async(ctx, { fallBack, gotoFlow }) => {
            const { flowPrincipal } = require("./app");
            const { flowcerrar, flowcontratar} = require ("./flowhijos")
            const { RespuestaFamiliar, RespuestaPadres } = require("./respuestas");
            const userResponse = ctx.body.toLowerCase();
        
            if (ctx.body === "INICIO") {
               gotoFlow(flowPrincipal);
            } else if (ctx.body === "CERRAR") {
               gotoFlow(flowcerrar);
            } else if (ctx.body === "CONTRATAR") {
               gotoFlow(flowcontratar);
            } else if (!RespuestaFamiliar.includes(userResponse) && !RespuestaPadres.includes(ctx.body)) {
              return fallBack('Lo sentimos, no tenemos esa opción, pero puedes seleccionar entre los servicios que ofrecemos.');
            }
          },
          [flowproductofamiliar]
        );

module.exports = {
    flowcivil,
    flowmercantil,
    flowfamiliar,
};
