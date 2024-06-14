const prodDb = require('../model/product')

let product = {}

product.setupDB=()=>{
    return prodDb.setupDB().then( data => {  
        if( data ){
            return data;
           } else{
               let err = new Error( 'Insertion Failed' );
               err.status = 500;
              throw err;
           } 
       } );
}
product.getProddetails=(category)=>{
    return prodDb.getProducts( category ).then( data=>{
        if( data ){
            return data
        } else{
            let err = new Error( 'Product details not found' );
               err.status = 404;
              throw err;
        }
    } )
}
product.search=(searchitem)=>{
    return prodDb.search( searchitem ).then( data=>{
        
        if( data.length>0 ){
            return data
        } else{
            return null
        }
    } )
}

product.getAllprod=()=>{
    return prodDb.getAllprod().then(data=>{
        if(data){
            return data
        }else{
            let err = new Error( 'Product details not found' );
               err.status = 404;
              throw err;
        }
    })
}
product.updateQty=(order)=>{
    return prodDb.updateQty(order).then(data=>{
        if(data.nModified!=0){
            // //console.log("success")
            return data
        }else{
            return null
        }
    })
}
module.exports = product