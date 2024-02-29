import {PrismaClient} from "@prisma/client"
import bcrypt from "bcryptjs"
import passport from "passport"

const prisma = new PrismaClient()

const login = (req , res , next) => {
    if(req.method == "GET")
        return res.render("security/login")

    passport.authenticate('local' , {
        successRedirect:'/admin',
        failureRedirect:'/login',
        failureFlash: true
    })(req , res , next)
}

const register = async(req , res) => {
    if(req.method == "GET")
        return res.render("security/register" , {error: []})

    let {fullname , email , password , confirmation} = req.body

    console.log(req.body)
    let error = []

    if(!fullname || !email || !password || !confirmation)
        error.push("please fill all blank fields")
    
    email = email.toLowerCase().trim()
    const user = await prisma.user.findUnique({where:{email}})

    if(user)
        error.push("email adress already used")

    if(password != confirmation)
        error.push("invalid password confirmation")

    if(password.length < 6)
        error.push("password min length 6 charaters")

    if(password.length > 60)
        error.push("password min length 60 charaters")

    if(error.length == 0){
        const hashedPassword = bcrypt.hashSync(password , 13)
        await prisma.user.create({
            data:{
                fullname,
                email,
                password: hashedPassword
            }
        })
        return res.redirect('/login')
    }

    return res.render('security/register', {error})

}

const logout = (req ,res) => {

    req.logout((error) => {
        if(error){
            throw new Error(error.message)
        }else{
            req.flash('success', 'vous etes deconnecter')
            return res.redirect('/login')
        }
    })

}


export {login , register , logout}