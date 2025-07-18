import jwt from 'jsonwebtoken';

const authMiddleWare = async(req,res,next) => {
    const {token} = req.headers;
    if(!token){
        return res.json({success:false,message:"Not Authorized Login Again"});
    }
    try{
        const token_decode = jwt.verify(token,process.env.JWT_SECRET);
        req.body = req.body || {};
        req.body.userId = token_decode.id;
        next();
    }catch (e){
        console.log(e);
        res.json({success:false,message:"error"})
    }
}

export default authMiddleWare;