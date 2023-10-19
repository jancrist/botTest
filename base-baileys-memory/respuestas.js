const RespuestaPadres = ["INICIO", "CONTRATAR", "CERRAR", "PASANTEBOT"];
const RespuestaInicio = ["contactar", "servicios", "1", "2", "3"]
const RespuestaServicios = ["civil", "mercantil", "familiar"];
const RespuestaCivil = ["compraventa", "contrato de compraventa", "contrato compraventa", 
"arrendamiento", "contrato de arrendamiento", 
"hipoteca", "contrato de hipoteca", 
"fideicomiso", "contrato de fideicomiso", 
"donación", "contrato de donación"]
const RespuestaMercantil = ["franquicia", "contrato de franquicia", 
"joint venture", "contrato de joint venture", 
"distribución", "contrato de distribución", 
"licencia de marca", "contrato de licencia de uso de marca", 
"confidencialidad", "contrato de confidencialidad"];
const RespuestaFamiliar = ["acuerdo prenupcial", "contrato de acuerdo prenupcial", 
"divorcio contencioso", "proceso de divorcio contencioso", 
"adopción", "proceso de adopción", 
"demanda de alimentos", "proceso de demanda de alimentos", 
"reconocimiento de paternidad", "proceso de reconocimiento de paternidad"];
const RespuestaProductos = ["buscar de nuevo", "preguntas comunes"]

var Respuesta = { RespuestaPadres, RespuestaInicio, RespuestaServicios, RespuestaCivil, RespuestaMercantil, RespuestaFamiliar, RespuestaProductos }


module.exports = Respuesta 