import builtInPath from "path"
import fs from "fs"

class HandleFile {

    static async upload(path , preffix , file){

        let rand = Math.floor(Math.random() * 100000)
        if(rand < 1000) rand += 1000

        const newfilename = `${preffix}-${Date.now()}${rand}${builtInPath.extname(file.name)}`

        if(!fs.readdirSync('public').includes(path)) fs.mkdirSync(`public/${path}`)
        
        await file.mv(`public/${path}/${newfilename}` , (error)=>{})

        return newfilename
    }

    static async uploadAll( path , preffix , limit , files ){

        if(typeof(files.length) == "undefined"){
            return await this.upload(path , preffix , files)
        }

        return await Promise.all(files
            .filter((value , index) => index < limit)
            .map(async value => await this.upload(path , preffix , value))
        )
    }

}

export default HandleFile