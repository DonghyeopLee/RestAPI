import mongoose from "mongoose";
import Blog from "../model/Blog.js";
import User from "../model/user.js";

export const getAllBlogs = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    if (!blogs) {
        return res.status(404).json({ message: "No blogs found" });
    }
    return res.status(200).json({blogs});
}

export const addBlogs = async (req, res, next) => {
    const{title,description,image,user} = req.body;

    let exisingUser;
    try {
        exisingUser = await User.findById(user);
    } catch (error) {
        console.error(error);
    }
    if(!exisingUser){
        return res.status(400).json({ message: "User not found" });
    }
    const blog = new Blog({
        title, 
        description, 
        image, 
        user,
    });
    try {
       const session = await mongoose.startSession();
       session.startTransaction();
       await blog.save({session});
       exisingUser.blogs.push(blog);
       await exisingUser.save({session});
       await session.commitTransaction();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
    return res.status(201).json({blog});
}

export const updateBlog = async (req, res, next) => {
    const { title, description, image } = req.body;
    const blogid = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(
            blogid, { 
                title,
                description,
                image,
                new: true,
             });
    } catch (error) { return console.log(error); }
    if (!blog) {
        return res.status(404).json({ message: "Unable to update blog" });
    } 
    return res.status(200).json({ blog });
}

export const getById = async (req, res, next) => {
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findById(blogId);
    } catch (error) {
        return res.status(500).json({message: "error fetching blog" });
    }
    if(!blog) {
        return res.status(404).json({message: "blog not found"});
    }
    return res.status(200).json(blog);
}
export const deleteBlog = async (req, res, next) => {
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndDelete(blogId).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
    if(!blog) {
        return res.status(404).json({message: "blog not found"});
    }
    return res.status(200).json({message: "Blog deleted successfully"});
}