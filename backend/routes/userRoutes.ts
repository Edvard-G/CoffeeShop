import express from 'express'
import {getUsers, loginUser, signUp} from '../controllers/userController'

const router = express.Router();

router.post('/login', loginUser)
router.post('/signup', signUp)
router.get('/', getUsers)

export default router