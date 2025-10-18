import express, {Request, Response} from 'express';
import deviceRoutes from './routes/device.route';
import authenticationRoutes from './routes/auth.route'
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from 'path';

import scenarioRoute from './routes/scenarios.route';

const app = express();
const PORT = process.env.PORT || 3000;
// Load the Swagger YAML file
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger', 'scenarios_devices.yaml'));

// middleware to parse JSON requests
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); //swaggerDOcs
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('/api/device', deviceRoutes);
app.use('/api', scenarioRoute)

app.use('/api/authentication', authenticationRoutes);

// define a simple route
app.get("/", (req: Request, res: Response) => {
    res.json({message: "Hello, World!"});
});




// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

