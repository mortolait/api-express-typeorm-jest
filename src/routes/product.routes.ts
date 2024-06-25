import { Router } from "express";
import { createProductController } from "../http/controller/create_product.controller";

const router = Router()

router.post('/product', createProductController)

export default router