import express from 'express';
import DashboardController from '../controllers/dashboard.controller';

const dashboardRouter = express.Router();

dashboardRouter.get("/", DashboardController.getDashboard)
dashboardRouter.get("/user", DashboardController.getUserDashboard)

export default dashboardRouter