import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mockingRouter from "./routes/mocks.router.js";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUiExpress from "swagger-ui-express"; 

const app = express();
const PORT = process.env.PORT || 8080;
 mongoose.set('strictQuery', false);
const connection = mongoose.connect(`mongodb+srv://Coder_70285:wfda6Jpj5IoFoIfk@cluster0.cfpeb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/coder_70285`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use(express.json());
app.use(cookieParser());

app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use("/api/mocks", mockingRouter);

app.listen(PORT, () => console.log(`Listening on ${PORT}`))


const swaggerOptions = {
    definition: {
        openapi: "3.0.1",
        info: {
            title: "Documentación de la App Adoptame", 
            description: "App dedicada a encontrar familias para los perritos de la calle"
        }
    }, 
    apis: ["./src/docs/**/*.yaml"]
}
const specs = swaggerJSDoc(swaggerOptions); 
app.use("/apidocs", swaggerUiExpress.serve, swaggerUiExpress.setup(specs)); 



