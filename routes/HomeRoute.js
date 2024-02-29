import { Router } from "express"
// import { authenticatedOnly, nonAuthenticatedOnly } from "../config/security.js"
import { home } from "../controllers/Homecontroller.js"
import { addLike, removeLike } from "../controllers/LikeController.js"
import { singleProduct } from "../controllers/ProductController.js"
import { changepassword, profil } from "../controllers/UserController.js"
import { searchProduct } from "../controllers/ProductController.js"

const HomeRoute = Router()

HomeRoute.get('/' ,  home)
HomeRoute.get('/product/:slugg' , singleProduct)
HomeRoute.get('/search' , searchProduct)
HomeRoute.get('/like/:userId/:productId' , addLike)
HomeRoute.get('/dislike/:userId/:productId' , removeLike)
HomeRoute.get('/profil' , profil)
HomeRoute.post('/profil/change/password', changepassword)

export default HomeRoute