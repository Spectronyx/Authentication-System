import userModel from "../models/userModels.js";

export const getUserData = async (req,res)=>{
    const {userId} = req.body;
    const user = await userModel.findById(userId);

    if(!user){
        return res.json({
            success: false,
            message:"User not found"
        });
    }

    res.json({
        success:true,
        userData:{
            name: user.name,
            isAccountVerified: user.isAccountVerified
        }
    })
}