const userDb = require( '../model/user' );
let user = {}

user.setupDB = () => {
    return userDb.setupDB().then( response => {  
     if( response ){
         return response;
        } else{
            let err = new Error( 'Insertion Failed' );
            err.status = 500;
           throw err;
        } 
    } );
 }
user.loginUser = ( username, password ) => {
    
    return userDb.userLogin( username, password ).then( response => {
        return response
    } )
}
user.registerUser = ( username, password,firstname,lastname ) => {
    
    return userDb.registerUser( username, password, firstname,lastname).then( response => {
        return response
    } )
}
user.pushOrders = (username, order) => {
    return userDb.pushOrders(username,order).then(data=>{
        if(data){
            return data
        }
        else{
            return null
        }
    })
}

user.getOrders = (username) => {
    return userDb.getOrders(username).then(data =>{
        if(data){
            return data
        } 
    })
}
module.exports=user

