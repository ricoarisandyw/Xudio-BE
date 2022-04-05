import express from 'express'
import DashboardController from '../controllers/dashboard.controller';

const dashboardRouter = express.Router();

dashboardRouter.get("/", DashboardController.getDashboard)

export default dashboardRouter