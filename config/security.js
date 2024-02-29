const authenticatedOnly = (req , res , next) => {

    if(req.isAuthenticated()){
        next()
    }else{
        req.flash('error' , 'you need to loggin first')
        return res.redirect('/login')
    }
}

const nonAuthenticatedOnly = (req , res , next) => {
    if(req.isAuthenticated()){
        return res.redirect('/admin')
    }else{
        next()
    }
}

export {authenticatedOnly , nonAuthenticatedOnly}