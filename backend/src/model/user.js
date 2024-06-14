const collection = require( '../utilites/connection' );
const userData = require( './user.json' );

let user = {}

user.setupDB = () => {
    return collection.getUserCollection().then( usercol => {
        return usercol.deleteMany().then( data => {
            if( data ){ //
            return usercol.insertMany( userData ).then( result => {
                if( result && result.length > 0 ) return result.length
                else return null
            } );
        } else{return null}//
        } );
    } );
}

user.userLogin = ( username, password ) => {
    return collection.getUserCollection().then( usercol => {
        // //console.log(usercol.length, username,password)
        return usercol.findOne( { "userdetails.userName": username } ).then( data => {
            if( data ) {
                console.log(data,"1234")
                if( password == data['userdetails']['password'] ) {
                    return data
                    
                } else{
                    throw new Error( "The password entered is incorrect!!" )
                }
            } else{
                throw new Error( "You are not registered !" );
            }
        } )
    } )}
    user.registerUser = (username, password, firstName, lastName) => {
        console.log("123",username,lastName)
        if(!lastName){
            console.log("12")
            return collection.getUserCollection().then( ( model ) => {
      
                return user.generateId().then( ( newUserId ) => {
                    // registerDetails.userId = newUserId;
                    // //console.log(registerDetails)
                    const newUser = {
                        userId: newUserId,
                        userdetails: {
                            userName: username,
                            password: password,
                            fname: firstName,
                            lastName: lastName,
                            googleAuth:true
                        },
                        order: []
                    }
                    return model.findOne( {  "userdetails.userName": username } ).then( ( foundData ) => {
                        console.log(foundData,"found")
                            if(foundData?.googleAuth){
                                console.log("1234",foundData)
                                return data
                            }
                            return model.create( newUser ).then( ( data ) => {
                                
                                if( data ) {
                                    //console.log(data)
                                    return data
                                } else{
                                    
                                    return null
                                }
                            } )
                    } )
                } )
            } )
        }
        else{
            console.log("new")
        return collection.getUserCollection().then( ( model ) => {
      
            return user.generateId().then( ( newUserId ) => {
                // registerDetails.userId = newUserId;
                // //console.log(registerDetails)
                const newUser = {
                    userId: newUserId,
                    userdetails: {
                        userName: username,
                        password: password,
                        fname: firstName,
                        lastName: lastName,
                        googleAuth:false
                    },
                    order: []
                }
                return model.findOne( {  "userdetails.userName": username } ).then( ( foundData ) => {
                    if( foundData ) {                    
                        throw new Error("Email is already registered!");                    }
                    else{
                        return model.create( newUser ).then( ( data ) => {
                            console.log(data)
                            if( data ) {
                                console.log(data)
                                return data
                            } else{
                                
                                return null
                            }
                        } )
                    }
                } )
            } )
        } )
    }
    };
    user.generateId = () => {
        return collection.getUserCollection().then( ( model ) => {
            return model.distinct( "userId" ).then( ( ids ) => {
                if(ids.length==0){
                    return 1001
                }
                let uId = Math.max( ...ids );
                return uId + 1;
            } )
        } )
    }
    user.pushOrders = ( userName,orderobj )=>{
        //console.log(orderobj); 
        return collection.getUserCollection().then( usercol =>{
            return usercol.findOne( {"userdetails.userName": userName} ).then( user =>{
                return usercol.updateOne( { "userdetails.userName": userName },
                                    {$push: {order: orderobj} } ).then( updatedData => {
                                        if( updatedData.nModified == 1 ) {
                                            return user['order']
                                        } else{
                                            throw new Error( "Unable to add product" )
                                        }
                                    } )
            } )
        } )
    }
    
    user.getOrders = ( username )=>{
        return collection.getUserCollection().then( usercol =>{
            return usercol.findOne( {"userdetails.userName": username},{_id: 0,order: 1} ).then( orders =>{
                if( orders ){
                    return orders.order
                }
                else{
                    let err=new Error( "Error in getting orders" )
                    err.status=404
                    throw err
                }
            } )
        } )
    }
    


module.exports = user