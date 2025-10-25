import express from 'express';
import {  AllLogs, getLogsforUserScenarioSession, superLogsClear, ScenarioLogs } from '../controllers/logs.controller';
const router = express.Router();


/*
* get all logs for admins using admin id
*/
router.get('/logs/:id',AllLogs)
/*
* admin gets all logs for a particular scenario
*/

router.get('/logs/scenario/:id',ScenarioLogs) 
/*
* player gets logs for particular scenario using user Id with scenarioId in body
*/
router.get('/scenario/logs/:id', getLogsforUserScenarioSession)



/*
*  superadmin using id removes all logs in system
*/
router.delete('/logs/clear/:id',superLogsClear)


export default router;