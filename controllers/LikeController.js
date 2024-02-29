import { PrismaClient } from "@prisma/client"

const prisma  = new PrismaClient()

const addLike = async(req , res) => {
    const {productId , userId} = req.params

    await prisma.likes.create({
        data:{
            userId: parseInt(userId),
            productId: parseInt(productId)
        }
    })

    return res.json({message:"success"})

}

const removeLike = async(req ,res) => {
    const {productId , userId} = req.params

    const like = await prisma.likes.findFirst({
        where:{
            AND:[
                {productId:parseInt(productId)},
                {userId:parseInt(userId)}
            ]
        }
    })

    await prisma.likes.delete({
        where:{id:parseInt(like.id)}
    })

    return res.json({message:"deleted"})

}

export {addLike , removeLike}