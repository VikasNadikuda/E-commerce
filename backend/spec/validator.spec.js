const validators = require( '../src/utilites/validators' )


 describe( "test validators",()=>{
    it( 'testing username with correct input' ,()=>{
        username= "vikas@infy.com";
        expect( validators.username( username ) ).toEqual( username );
    });

    
    it("testing password with correct input",()=>{
        password="Vikas@2023"
        expect(validators.password(password)).toEqual(password)
    })

    it("tesing username with wrong format",()=>{
        username="guru.com"
        expect(()=>{
            validators.username(username)
        }).toThrow(new Error("Email id format is wrong"))
    }) 
    

})