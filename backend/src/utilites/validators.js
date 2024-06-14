let validator ={}
validator.username=( username )=>{

    if( username.match( /^[A-z][A-z0-9.]+@[a-z]+\.[a-z]{2,3}$/ ) ){
        return username;
    }
    else{
        let err=new Error( "Email id format is wrong" )
        err.status=406
        throw err
    }
}

validator.password=( password ) =>{
   
    if( password.match( /^(?=.*[A-Z])(?=.*[!@#$&*%&])(?=.*[0-9])(?=.*[a-z]).{7,20}$/ ) ){
        return password;
    }
    else{
        let err=new Error( "password format is wrong" )
        err.status=406
        throw err
    }
}

module.exports=validator