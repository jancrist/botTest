const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const flowcerrar = addKeyword ("CERRAR", {sensitive: true})
.addAnswer (["Gracias por la visita, estaré aquí nuevamente cuando gustes.🤖",
"Únicamente tienes que volver a saludarme. 👌",
], {delay:2000},
async (ctx, {endFlow}) => {
if(ctx.body === "CERRAR"){
return endFlow ()
}})

const flowcontratar = addKeyword("CONTRATAR", {sensitive: true})
.addAnswer("Aguarda un momento estamos desviando tu conversación con personal de IUS BOTICS.", { delay: 2000 })
.addAction(async (ctx, { provider }) => {
    const nanoid = await import('nanoid');
    const ID_GROUP = nanoid.nanoid(5);
    const sock = await provider.getInstance();

    const group = await sock.groupCreate("IUSBOTICS", [`${ctx.from}@s.whatsapp.net`]);
    console.log("created group with id: " + group.gid);
    sock.sendMessage(group.id, { text: 'Hola, te hemos agregado a un grupo para que hables con nuestro personal.' })

})
.addAnswer(["Listo, a partir de este momento un asesor será quien te atienda.",
            "Gracias por tu interés en mí, Pasantebot 1.0🤖"],
{ delay: 2000 }, 
async (ctx, {endFlow}) => {
    endFlow ()
    }
)
const flowcontactar = addKeyword(["2", "CONTACTAR", "Contactar", "contactar"], {sensitive:true})
.addAnswer("Aguarda un momento estamos desviando tu conversación a nuestro abogado", { delay: 2000 })
.addAction(async (ctx, { provider }) => {
    const nanoid = await import('nanoid');
    const ID_GROUP = nanoid.nanoid(5);
    const sock = await provider.getInstance();

    const group = await sock.groupCreate("Despacho", [`${ctx.from}@s.whatsapp.net`]);
    console.log("created group with id: " + group.gid);
    sock.sendMessage(group.id, { text: 'Hola, te hemos agregado a un grupo para que hables con nuestro abogado especializado.' })

    /*
    const Contacto = "+525511111111"
    const response = await sock.groupParticipantsUpdate(group.id, [`${Contacto}@s.whatsapp.net`], "add");
    console.log("Added participants to the group:", response);*/
})
.addAnswer(["Listo, estás en un grupo con nuestro abogado, a partir de este momento será él quien te atienda.",
            "Esa es una de mis funcionalidades como Pasantebot 1.0, puedes seguir explorando mis funciones.🤖",
            "Únicamente tienes que volver a saludarme. 👌" ],
{ delay: 2000 }, 
async (ctx, {endFlow}) => {
     endFlow ()
    }
);

const {flowcivil, flowmercantil, flowfamiliar} = require ("./flownietos")

const flowservicios = addKeyword(["1", "SERVICIOS", "Servicios", "servicios"], {sensitive:true})

.addAnswer(
    [
      "Nuestro despacho tiene especialistas en diferentes ramas, a continuación te mostraré las especialidades que trabajamos:",
      "🏠 Civil",
      "📜 Mercantil",
      "👨‍👩‍👧‍👦 Familiar",
      "Escribe cual es la materia de tu interés"
    ],
    { delay: 2000, capture: true },
    async(ctx, { fallBack, gotoFlow }) => {
      const { flowPrincipal } = require("./app");
      const { RespuestaServicios, RespuestaPadres } = require("./respuestas");
      const userResponse = ctx.body.toLowerCase();
  
      if (ctx.body === "INICIO") {
         gotoFlow(flowPrincipal);
      } else if (ctx.body === "CERRAR") {
         gotoFlow(flowcerrar);
      } else if (ctx.body === "CONTRATAR") {
         gotoFlow(flowcontratar);
      } else if (!RespuestaServicios.includes(userResponse) && !RespuestaPadres.includes(ctx.body)) {
        return fallBack('Lo sentimos, no tenemos esa opción, pero puedes seleccionar entre los servicios que ofrecemos.');
      }
    },
    [flowcivil, flowmercantil, flowfamiliar]
  );
  
module.exports = {
    flowcerrar,
    flowcontratar,
    flowcontactar,
    flowservicios
};
