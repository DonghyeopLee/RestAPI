import User from "../model/user.js";

export const getAllUser = async (req, res, next) => {
    let users;
    try {
        users = await User.find();
    } catch (error) {
        return res.status(500).json({message: error.message});
    }   
    if(!users) {
        return res.status(404).json({message: "No users found"});
    }
    return res.status(200).json({users});
}

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    let exisingUser;
    try {
        exisingUser = await User.findOne({ email });
    }catch (error) {
        console.error(error);
    }
    if(exisingUser) {
        return res.status(400).json({ message: "User already exists"});
    }
    const user= new User({ name, email, password });
    try{
        await user.save();
    }
    catch (error){
        console.log(error);
    }
    return res.status(200).json({user});

}

