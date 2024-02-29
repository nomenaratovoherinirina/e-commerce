import brcypt from "bcryptjs"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

const profil = (req , res) => {
    let user = req.user
    user = {
        ...user,
        password:null
    }
    return res.render('profil' , {user})
}

const changepassword = async(req , res) => {
    const {old , newp , confirmation} = req.body

    let error = null
    if(!old || !newp || !confirmation)
        error = "champs vide"
    
    const isValid = bcrypt.compareSync(old , req.user.password)
    
    if(!isValid)
        error = "mot de passe incorrect"

    if(newp != confirmation)
        error ="confirmation incorrect"

    if(newp.length < 5)
        error = "mot de passe trop court"
    
    if(newp.length > 60)
        error = "mot de passe trop long"
    
    if(error != null)
        req.flash('error' , error)
    
    await prisma.user.update({
        data:{
            password: bcrypt.hashSync(newp, 13)
        },
        where:{id:req.user.id}
    })

    req.flash('success' , "modification terminer")
    return res.redirect('/profil')

    


}


export {profil , changepassword }