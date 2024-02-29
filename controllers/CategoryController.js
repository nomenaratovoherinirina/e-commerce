import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const addCategory = async(req , res) => {
    if(req.method == "GET")
        return res.render('admin/category/add')

    try {
        const {name} = req.body

        await prisma.category.create({data:{name}})

        return res.redirect('/admin/add/product')
        
    } catch (error){
        return res.render('errors/error500')
    }
}


export {addCategory}