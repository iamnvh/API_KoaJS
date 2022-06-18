import Router from "koa-router";
import * as productHandler from "../handlers/products/producthandlers";
import productInputMiddleware from "../middleware/productInputMiddleware";

const router = new Router({
  prefix: '/api'
});

router.get("/products", productHandler.getProducts);
router.post("/products", productInputMiddleware, productHandler.save);
router.put("/product/:id", productHandler.update);
router.delete("/product/:id", productHandler.remove);
router.get("/product/:id", productHandler.getProductById);

export default router;