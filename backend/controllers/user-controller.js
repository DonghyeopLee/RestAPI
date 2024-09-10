import User from "../model/user";


const getAllUser = asynce (req,res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        return res.status(500).json({message: error.message});
    }   
    if(!users) 
        return res.status(404).json({message: "No users found"});
}


