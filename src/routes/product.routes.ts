import { Router } from "express";
import { createProductController } from "../http/controller/create_product.controller";
import { getProductController } from "../http/controller/get_products.controller";

const router = Router()

router.post('/product', createProductController)
router.get("/product", getProductController)

export default router