import { PrismaClient } from "@prisma/client"
import { query } from "express"
import HandleFile from "../lib/files.js"
import AppString from "../lib/string.js"

const prisma = new PrismaClient()

const addproduct = async(req , res) => {
    if(req.method == "GET"){
        const categories = await prisma.category.findMany()
        return res.render('admin/product/add' , {categories})
    }

    const {title , content , category} = req.body
    const {images}  = req.files

    const files = await HandleFile.uploadAll( "product" , 'PROD' , 6 , images) // 1 images => string  , 1+ images => []

    let data = {
        title: title.trim(),
        categoryId: parseInt(category),
        slugg: AppString.slugger(title),
        content: content.trim(),
        image1: null,
        image2: null,
        image3: null,
        image4: null,
        image5: null,
        image6: null,
    }

    if(typeof(files) == "string"){
        data.image1 = files
    }else{
        for(let index in files){
            data[`image${parseInt(index) + 1}`] = files[index]
        }
    }

    // typeof(files) == "string" ? data.image1 = files : data.forEach((value , index) =>  data[`image${parseInt(index) + 1}`] = value)
    
    await prisma.product.create({data})
    
    return res.redirect('/admin')
}

const singleProduct = async(req ,res) => {

    const {slugg} = req.params
    // const {user} = req

    const productInfo = await prisma.product.findUnique({
        where:{
            slugg:slugg
        }
        // ,
        // include:{
        //     category:true,
        //     likes: true
        // }
    })

    // let isLiked = undefined
    
    // if(user)
    //     isLiked = productInfo.likes.find(value => value.userId == user.id)
    //id userId productId
    
    // let result = [1,2,3].find((value, index) => {
    //     if(value == 1){
    //         return value
    //     }
    // })
    return res.render({productInfo})
    // return res.render('single' , {productInfo, user , isLiked})
}
const searchProduct = async(req , res)=>{
    let query = req.query.q
    let categoryId = req.query.cat
    const categories = await prisma.category.findMany()

    let where = {
        title:{
            search:query
        }
    }

    if(categoryId){
        where.categoryId = parseInt(categoryId)
    }

    const products = await prisma.product.findMany({where})

    return res.render('search' , {query , products , categories , categoryId})
}

export {addproduct , singleProduct , searchProduct}