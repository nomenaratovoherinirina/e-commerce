import { Router } from "express"
import { authenticatedOnly, nonAuthenticatedOnly } from "../config/security.js"
import { login, register , logout } from "../controllers/SecurityController.js"

const SecurityRoute = Router()

SecurityRoute.get('/login', nonAuthenticatedOnly , login)
SecurityRoute.post('/login' , nonAuthenticatedOnly , login)
SecurityRoute.get('/register' , nonAuthenticatedOnly , register)
SecurityRoute.post('/register', nonAuthenticatedOnly , register)
SecurityRoute.get('/logout', authenticatedOnly , logout)

export default SecurityRoute