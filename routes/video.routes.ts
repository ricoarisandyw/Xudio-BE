import express from 'express'
import VideoController from '../controllers/video.controller'
import IVideo from '../src/entity/IVideo'

const videoRouter = express.Router()

videoRouter.post('/', VideoController.create)
videoRouter.get('/', VideoController.getAll)
// migration purpose
videoRouter.get('/reset', async (req, res) => {
    const deleted = await IVideo.createQueryBuilder().where("id IS NOT NULL").delete().execute()
    res.json(deleted)
})

export default videoRouter