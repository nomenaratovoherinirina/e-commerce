import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import passportLocal from "passport-local"

const prisma = new PrismaClient()

const localStrategy = passportLocal.Strategy //

export default (passport) => {

    passport.use(
        new localStrategy({usernameField:'email'} , async(email , password ,done) => {

            try {

                const user = await prisma.user.findUnique({where:{email:email}})

                if(!user)
                    return done(null , false , {message:"adress email invalide"})

                const isValid = bcrypt.compareSync(password , user.password)

                if(!isValid)
                    return done(null , false , {message:"mot de passe incorrecte"})
            
                return done(null , user)
                

            }catch(error){
                return done(null , false , {message:"une erreur s'est produite , veuillez reessayer plus tard"})
            }

        })
    )

    passport.serializeUser((user , done) => {
        done(null , user.id)
    })

    passport.deserializeUser(async(id , done) => {
        try{
            const user = await prisma.user.findUnique({where:{id:id}})
            done(null , user)
        }catch(error){
            return done(null , false , {message:"une erreur s'est produite , veuillez reessayer plus tard"})
        }
    })

}