
const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./routes/clients.routes.ts', './routes/contacts.routes.ts', './routes/session.route.ts']

swaggerAutogen(outputFile, endpointsFiles)