import express from 'express'
import VideoController from '../controllers/video.controller'

const videoRouter = express.Router()

videoRouter.post('/', VideoController.create)
videoRouter.get('/', VideoController.getAll)

export default videoRouter