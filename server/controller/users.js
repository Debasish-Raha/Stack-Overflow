import mongoose from "mongoose"
import users from '../models/auth.js'

export const getallusers = async (req, res) => {
    try {
        const allUsers = await users.find();
        const allUserDetails = allUsers.map(user => ({
            _id: user._id,
            name: user.name,
            about: user.about,
            tags: user.tags,
            joinedon: user.joinedon,
        }));
        res.status(200).json(allUserDetails);
    } catch (error) {
        console.error("Error fetching all users:", error);
        res.status(404).json({ message: error.message });
    }
}
export const updateprofile=async(req,res)=>{
    const{id:_id}=req.params;
    const {name,about,tags}=req.body;
    if(!mongoose.Types.ObjectId.isValid(_id)){
        return res.status(404).json("user unavailable");
    }
    try {
        const updateprofile=await users.findByIdAndUpdate(_id,{name,about,tags}, {new:true}
        );
        res.status(200).json(updateprofile)
    } catch (error) {
        res.status(404).json({message:error.message})
        return
    }
}