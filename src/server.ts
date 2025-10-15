import express, {Request, Response} from 'express';
import deviceRoutes from './routes/device.route';
import scenarioRoute from './routes/scenarios.route';

const app = express();
const PORT = process.env.PORT || 3000;

// middleware to parse JSON requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('/api/devices', deviceRoutes);
app.use('/api', scenarioRoute)


// define a simple route
app.get("/", (req: Request, res: Response) => {
    res.json({message: "Hello, World!"});
});



// start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

