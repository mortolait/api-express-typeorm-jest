import { Router } from "express";
import { createUserController } from "../http/controller/create_user.controller";
import { exampleMiddleware } from "../http/midwares/auth-middleware";
import { authUserController } from "../http/controller/auth.controller";
import { getUserController } from "../http/controller/get_users.controller";
import { updateUserController } from "../http/controller/update_user.controller";

const router = Router()


router.post('/users', createUserController)
router.get('/users', getUserController)
router.put('/users/:id', updateUserController)
router.post('/session', authUserController)

export default router

