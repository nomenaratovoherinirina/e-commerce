class AppString {

    static slugger(string){
        if(typeof(string) != "string")
            throw new TypeError("slugger paramater must be a string")

        return string.replaceAll(' ' , '-').trim().concat('-').concat(Date.now().toString(36))
    }

}


export default AppString