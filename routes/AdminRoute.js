import { Router } from "express"
// import { authenticatedOnly } from "../config/security.js"
import { dashboard } from "../controllers/AdminController.js"
import { addCategory } from "../controllers/CategoryController.js"
import { addproduct } from "../controllers/ProductController.js"

const AdminRoute = Router()

// dashboard
AdminRoute.get('/',  dashboard)

// product
AdminRoute.get('/add/product', addproduct)
AdminRoute.post('/add/product',  addproduct)

// category
AdminRoute.get('/add/category',  addCategory)
AdminRoute.post('/add/category',  addCategory)


export default AdminRoute