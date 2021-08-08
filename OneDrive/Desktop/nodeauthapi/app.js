const express=require('express');
const jwt =require('jsonwebtoken');

const app=express();
 
app.get('/api', (req,res)=>{

    res.json({
        message:'Welcome to the api'
    });
});
app.post('/api/posts', verifyTokens,(req,res)=>{
 jwt.verify(req.token, 'secretkey',(err,authData) => {
     if(err){
         res.sendStatus(403);
     }
     else{
     res.json({
        message:'Post created',
        authData
    });
}
 });
});
app.post('/api/login', (req,res)=>{

   const user={
       id:1,
       username:'aalok',
       email:'aalok150124@gmail'
   }
   jwt.sign({user},'secretkey',{expiresIn:'30s'} ,(err,token ) => {
       res.json({
           token
       });
   });   
   });
// verfiy token function
function verifyTokens(req,res,next) {
    const bearerHeader=req.headers['authorization'];
    if (typeof bearerHeader !==undefined)
    {
        const bearer=bearerHeader.split(' ');
        const bearerToken=bearer[1];
        req.token=bearerToken;
        next(); 
    }
    else{
        res.sendStatus(403);
    }
}

app.listen(5000,() => console.log('Server started on port 5000'));