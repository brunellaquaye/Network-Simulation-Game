import express, {Request, Response} from 'express';
import { Server } from 'socket.io'
import { createServer } from 'node:http'
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from 'path';
import { socketHandler } from './utils/socketHandler';
// 
import deviceRoutes from './routes/device.route';
import authenticationRoutes from './routes/auth.route'
import { globalErrorHandler } from './middleware/errorHandler';

import scenarioRoute from './routes/scenarios.route';
import simulator from './routes/simulation.route'


const app = express();
const PORT = process.env.PORT || 3000;
const server = createServer(app)
export const io = new Server(server,{
  cors: { origin: "*" }
});
// Load the Swagger YAML file
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger', 'scenarios_devices.yaml'));

// middleware to parse JSON requests
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); //swaggerDOcs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(globalErrorHandler)

// ROUTES
app.use('/api/device', deviceRoutes);
app.use('/api', scenarioRoute)
app.use('/api/authentication', authenticationRoutes);
app.use('/api/simulate',simulator)

// define a simple route
app.get("/", (req: Request, res: Response) => {
    res.json({message: "Hello, World!"});
});
io.on("connection", (socket) => socketHandler(io, socket));


// start server
server.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
