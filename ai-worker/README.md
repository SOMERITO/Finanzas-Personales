# Diagnóstico financiero con IA

Este servicio mantiene la clave de OpenAI fuera del HTML público. No usa Firebase Cloud Functions y por eso no requiere cambiar Firebase de Spark a Blaze.

## Qué datos se envían

Al pulsar el botón de evaluación, el navegador envía únicamente una instantánea del mes seleccionado: secciones, nombres de conceptos, importes, información de deuda registrada, metas y eventos del mes. No envía el estado de otros meses, correo de la cuenta ni contraseñas. El token de Firebase se envía únicamente en la cabecera Authorization para autenticar la solicitud.

El Worker valida la firma y los claims del token de Firebase, comprueba que el UID sea el único autorizado configurado, limita el tamaño de solicitud y usa OpenAI Responses API con store=false. La clave OPENAI_API_KEY debe agregarse como secreto en Cloudflare, nunca en GitHub ni en el navegador.

## Configuración requerida

1. Crea una clave de API en https://platform.openai.com/api-keys. La facturación de API es independiente de ChatGPT. Las cuentas nuevas usan créditos prepagados; la compra mínima publicada es USD 5. Si compras créditos, desactiva la recarga automática para evitar compras automáticas.
2. En https://dash.cloudflare.com/, abre Workers & Pages y crea un Worker llamado finanzas-personales-ai. En su editor, pega el contenido de worker.js y despliega.
3. En Settings / Variables and Secrets del Worker, agrega:
   - OPENAI_API_KEY como Secret (clave privada de OpenAI).
   - FIREBASE_PROJECT_ID como variable de texto con valor finanzas-personales-7aa8b.
   - ALLOWED_FIREBASE_UID como variable de texto con el UID exacto del usuario creado en Firebase Authentication. Encuéntralo en Firebase Console > Authentication > Users. No uses el correo como UID.
   - OPENAI_MODEL como variable opcional con valor gpt-6-luna.
4. Mantén la URL del Worker en HTTPS. El código limita CORS al origen https://somerito.github.io y rechaza cualquier UID distinto al configurado.
5. Copia la URL pública del Worker (termina en workers.dev) para configurarla después en la constante AI_DIAGNOSIS_ENDPOINT del HTML. No añadas OPENAI_API_KEY al HTML.

## Pruebas antes de producción

- Verifica que la URL del Worker sea HTTPS.
- Comprueba que una sesión de Firebase autorizada genera respuesta.
- Comprueba que una cuenta con UID distinto recibe HTTP 403.
- Comprueba que sin token recibe HTTP 401.
- Genera la evaluación para un mes con datos y verifica que no aparezcan datos de otros meses.
- La interfaz pide confirmación antes de enviar la instantánea a OpenAI.

## Coste y privacidad

GPT-6 Luna figura en la página de precios de OpenAI a USD 0.10 por millón de tokens de entrada y USD 0.50 por millón de tokens de salida. El coste de cada análisis depende del tamaño de la instantánea y de la respuesta. Cloudflare Workers Free anuncia una cuota de 100,000 solicitudes por día, sujeta a límites y condiciones del servicio. OpenAI API se factura por separado de ChatGPT. No publiques secretos ni actives la integración para todos hasta probarla.

Fuentes oficiales:
- https://developers.openai.com/api/docs/models/gpt-6-luna
- https://developers.openai.com/api/reference/resources/responses/methods/create
- https://help.openai.com/es-419/articles/8264644-setting-up-and-managing-prepaid-api-billing
- https://developers.cloudflare.com/workers/platform/pricing/