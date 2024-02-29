import express from "express"
import dotenv from "dotenv"
import flash from "connect-flash"
import session from "express-session"
import passport from "passport"
import passportConfig from "./config/passport.js"
import expressEjsLayouts from "express-ejs-layouts"
import fileUpload from "express-fileupload"
import HomeRoute from "./routes/HomeRoute.js"
import SecurityRoute from "./routes/SecurityRoute.js"
import AdminRoute from "./routes/AdminRoute.js"
import cors from "cors"

const whiteList = ["http://localhost:3000", "http://localhost:3000/product" ]
const corsOptions = {
    origin : function (origin , callback){
        if(!origin || whiteList.indexOf(origin)!== -1){
            callback(null, true)
        }
        else{
            callback(new Error("NOT ALLOWD BY CORS"))
        }
    },
    credentials : true
}


passportConfig(passport)

const app = express()
dotenv.config()
const PORT = process.env.PORT || 4000

app.use(fileUpload())
app.use(expressEjsLayouts)
app.use(express.static("public"))
app.use(express.urlencoded({extended:false}))
app.set('view engine' , 'ejs')
app.use(cors(corsOptions))
const cookieTime = 1000*60*60
app.use(session({
    resave:true,
    secret: 'secret',
    saveUninitialized: true,
    cookie:{maxAge:cookieTime}
}))

app.use(flash())

app.use((req , res , next) => {
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error')
    next()
})



app.use(passport.initialize())
app.use(passport.session())

app.use('/' , HomeRoute)
app.use('/' , SecurityRoute)
app.use('/admin' , AdminRoute)
app.use('*' , (req , res) =>{
    return res.render('errors/error404')
})
app.use('*' , (req , res) => {
    return res.render('errors/erro505')
})

app.listen(PORT , () => console.log(`http://localhost:${PORT}`))