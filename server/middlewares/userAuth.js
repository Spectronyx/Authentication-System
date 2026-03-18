import jwt from "jsonwebtoken";

const userAuth = async (req,res,next) => {
    const { token } = req.cookies;

    if(!token){
        return res.json({
            success: false,
            message: "Not Authorized.Login Again."
        })
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        console.log(tokenDecode);
        if(tokenDecode.id){
            if (!req.body) {
                req.body = {}; // Initialize req.body if it doesn't exist
            }
            req.body.userId = tokenDecode.id;

        }else{
            return res.json({
                success: false,
                message: "Unable to verify your Email"
            })
        }
        return next();
    } catch (error) {
        return res.json({
            success: false,
            message:
                error.message
        })
    }
}

export default userAuth;