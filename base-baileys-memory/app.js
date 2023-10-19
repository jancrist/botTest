const { createBot, createProvider, createFlow, addKeyword, EVENTS } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const {flowcerrar, flowcontratar, flowcontactar, flowservicios} =  require ("./flowhijos")
const flowpasantebot = require ("./Pasantebot")
const axios = require('axios');
const nodemailer = require('nodemailer');
const {RespuestaPadres, RespuestaInicio} = require ("./respuestas")

const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, // Usar SSL/TLS
    auth: {
        user: 'contacto@iusbotics.mx', // Tu dirección de correo
        pass: 'NZfu$cCTyGq7hQK', // Tu contraseña
    },
});

shared12={}

const flowOpcionCuatro =
addKeyword(['4', 'Contacto','representante'])
.addAnswer([
    '📚 Gracias por tu interés. \n\nNuestro equipo está disponible para atender tus consultas y necesidades:',
    
    '\n\n🙋‍♀️ Indícanos cómo podemos ayudarte y nos pondremos en contacto contigo en unos momentos.'
], { capture: true, delay: 1500 }, async (ctx, { state, flowDynamic, provider }) => {
    const descripcion = ctx.body;
        shared12[ctx.from] = { descripcion, number: ctx.from };
        console.log(`Número de teléfono: ${ctx.from}`);
        console.log(`Respuesta de descripcion: ${descripcion}`);
}).addAnswer("Como es tu nombre?", { capture: true, delay: 1500 }, async (ctx, { state, flowDynamic, provider }) => {
    const nombre = ctx.body
    shared12[ctx.from].nombre = nombre // Agregar la respuesta al objeto compartido del usuario
    console.log(`Respuesta nombre: ${nombre}`)})


    .addAnswer("Como es tu Email?", { capture: true, delay: 1500 }, async (ctx, { state, flowDynamic, provider }) => {
        const email = ctx.body
        shared12[ctx.from].email = email // Agregar la respuesta al objeto compartido del usuario
        console.log(`Respuesta mail: ${email}`)})
        
        
        
        
    .addAction(async (ctx, { gotoFlow, endFlow, flowDynamic, provider }) => {
    // Obtiene los datos de `shared4` que deseas usar en la solicitud POST
    const userData = shared12[ctx.from] || {};
    const descripcion= userData.descripcion || '';
    const number = userData.number || '';
    const nombre = userData.nombre || '';
    const email  = userData.email || '';
    const causa = "Contacto"
  
    
    
    // Define la URL a la que deseas enviar la solicitud POST
    const url = 'https://sheetdb.io/api/v1/qfi9aawdlg6qk';

    // Define los datos que deseas enviar en la solicitud POST
    const requestData = {
        data: [
            {
                nombre: userData.nombre,
                causa: causa,
                descripcion: userData.descripcion,
                numero: number,
                email: userData.email
                
            },
        ],
    };

    try {
        // Verifica si la solicitud POST ya se ha realizado para este usuario
        if (!userData.postSolicitudRealizada) {
            // Realiza la solicitud POST usando la biblioteca `node-fetch`
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            // Verifica la respuesta del servidor
            if (response.status === 201) {
                console.log('La solicitud POST fue exitosa');

                userData.postSolicitudRealizada = true; // Marca la solicitud como realizada
                // Envía el correo electrónico
                const mailOptions = {
                    from: 'contacto@iusbotics.mx', // Tu dirección de correo
                    to: 'manuelmoreno652@outlook.com', // Destinatario, tu dirección de correo
                    subject: `Nueva Solicitud! ${causa} `,

                    html: `
                    <!DOCTYPE html>
                    <html lang="es">
                    <head>
                        <meta charset="UTF-8">
                        <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <style>
                            /* Estilos CSS personalizados */
                            body {
                                font-family: Arial, sans-serif;
                                background-color: #f0f0f0;
                                margin: 0;
                                padding: 0;
                            }
                            .container {
                                max-width: 600px;
                                margin: 0 auto;
                                padding: 20px;
                                background-color: #ffffff;
                                border-radius: 5px;
                                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                            }
                            h1 {
                                font-size: 24px;
                                margin: 0;
                                padding: 0;
                                color: #333333;
                            }
                            p {
                                font-size: 16px;
                                line-height: 1.5;
                                color: #333333;
                                margin: 0 0 10px;
                            }
                            a {
                                color: #0078d4;
                                text-decoration: none;
                            }
                            .footer {
                                font-size: 14px;
                                color: #777777;
                            }
                            /* Agrega más estilos según sea necesario */
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Nueva consulta de ${userData.nombre}</h1>
                            <p><strong>Causa:</strong> ${causa}</p>
                            <p><strong>Descripcion:</strong>${descripcion}</p>
                            <p><strong>Numero:</strong>${userData.number}</p>
                            <p><strong>Email:</strong>${userData.email}</p>
                            
                            <p class="footer">Servicio ofrecido por<br>Wabo Technologies</p>
                        </div>
                    </body>
                    </html>
                    `,
                };
                    
                

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.error('Error al enviar el correo electrónico:', error);
                    } else {
                        console.log('Correo electrónico enviado:', info.response);
                    }
                });
                const mailOptions2 = {
                    from: 'contacto@iusbotics.mx', // Tu dirección de correo
                    to: userData.email, // Destinatario, tu dirección de correo
                    subject: `Solicitud ${causa}`,
                    html: `
                        <html>
                        <head>
                            <style>
                                /* Estilos CSS personalizados */
                                body {
                                    font-family: Arial, sans-serif;
                                    background-color: #f0f0f0;
                                    margin: 0;
                                    padding: 0;
                                }
                                .container {
                                    max-width: 600px;
                                    margin: 0 auto;
                                    padding: 20px;
                                    background-color: #ffffff;
                                    border-radius: 5px;
                                    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                                }
                                p {
                                    font-size: 16px;
                                    line-height: 1.5;
                                    color: #333333;
                                    margin: 0 0 20px;
                                }
                                a {
                                    color: #0078d4;
                                    text-decoration: none;
                                }
                                h1 {
                                    font-size: 24px;
                                    margin: 0;
                                    padding: 0;
                                    color: #333333;
                                }
                                .footer {
                                    font-size: 14px;
                                    color: #777777;
                                }
                                /* Agrega más estilos según sea necesario */
                            </style>
                        </head>
                        <body>
                            <div class="container">
                                <h1>Estimado/a ${userData.nombre},</h1>
                                <p>Espero que se encuentre bien. Le escribo para confirmar que hemos recibido su solicitud de manera exitosa. Agradecemos su confianza en nuestros servicios legales.</p>
                                <p>Nuestro equipo está trabajando diligentemente para procesar su solicitud y analizar todos los detalles proporcionados. Nos comprometemos a brindarle el mejor asesoramiento y atención durante todo el proceso.</p>
                                <p>En breve, uno de nuestros representantes se comunicará con usted para discutir los siguientes pasos y proporcionarle información adicional sobre el proceso. Estamos aquí para responder a todas sus preguntas y brindarle la asistencia necesaria.</p>
                                
                                <p>Le agradecemos nuevamente por elegirnos como su firma legal de confianza. Valoramos su solicitud y estamos comprometidos en brindarle un servicio de alta calidad.</p>
                                <p class="footer">Atentamente El Abogado.ar </p>
                                
                            </div>
                        </body>
                        </html>
                    `,
                };

                transporter.sendMail(mailOptions2, function (error, info) {
                    if (error) {
                        console.error('Error al enviar el correo electrónico al cliente:', error);
                        flowDynamic("Perfecto, en instantes un agente se comunicara con usted.")
                    } else {
                        console.log('Correo electrónico enviado al cliente:', info.response);
                        flowDynamic("Perfecto, en instantes un agente se comunicara con usted.")
                    }
                });
                endFlow();

                
            } else {
                console.log('La solicitud POST no fue exitosa');
                console.log(response.status);
            }
        } else {
            console.log('La solicitud POST ya se ha realizado previamente');
            endFlow();
        }
    } catch (error) {
        console.error('Error en la solicitud POST:', error);

        // En caso de error, puedes redirigir al usuario a un flujo específico aquí si lo deseas
    }
});



const flowPrincipal = addKeyword(EVENTS.WELCOME)
    .addAnswer(['🙌 Hola bienvenido *¡Soy Pasante-Bot 2.0!* 🤖',
                'Estoy aquí para mostrarte mis capacidades como asistente legal.'],
               {delay: 1000}) 

    .addAnswer(["Recuerda que puedes concluir la charla mandando *CERRAR*.",
                "O bien, si estás interesado en adquirirme puedes escribir *CONTRATAR* para que te contacte con nuestro personal. "
            ],   {delay: 3000}) 
              
            .addAnswer(
                [
                    "Como Pasante-Bot 2.0 tengo las funciones de mi versión anterior; pero además cuento con una Inteligencia Artificial Integrada, además puedo contestar preguntas frecuentes de tus productos y servicios de forma más natural.",
                    "Te recomiendo probar la opción 3, después volver con la palabra *INICIO* para que vayas al apartado de *servicios* y conozcas al final conozcas la sección de preguntas."], {delay: 2000})

            .addAnswer(["*1* Conoce el ejemplo de portafolio de *SERVICIOS*, que puedes modificar de acuerdo a tus precios y detalles.",
                        "*2* Explora la opción *CONTACTAR* al cliente, que de forma rápida y sencilla te agregará a un grupo de WhatsApp donde podrás platicar con el cliente.",
                        "*3* *PASANTEBOT* La inteligencia artificial encargada de dar una breve asesoría y enlazarte con el cliente",
                        "*4* Dejanos tus datos para comunicarnos via correo"],
                { delay: 4000, capture: true },
                async(ctx, { fallBack, gotoFlow }) => {
                    const userResponse = ctx.body.toLowerCase();
                                               
                    if (ctx.body === "INICIO") {
                         gotoFlow(flowPrincipal);
                       } else if (!RespuestaInicio.includes(userResponse) && !RespuestaPadres.includes(ctx.body)) {
                        return fallBack('Lo sentimos, no tenemos esa opción, pero puedes seleccionar entre los servicios que ofrecemos.');
                    }
                },
                [flowcerrar, flowcontratar, flowcontactar, flowservicios,flowpasantebot,flowOpcionCuatro]
                
            );
            
   



const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()

module.exports = { flowPrincipal };

