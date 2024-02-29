import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const home = async(req , res) => {

    const products = await prisma.product.findMany() 
    return res.json(products)
}

export {home}