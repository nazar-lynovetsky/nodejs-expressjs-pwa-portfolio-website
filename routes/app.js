import express from 'express'

import appController from '../controllers/app.js'


const router = express.Router()

router.get('/', appController.getHome)
router.get('/works', appController.getWorks)

export default router