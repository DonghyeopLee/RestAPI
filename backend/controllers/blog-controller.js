import Blog from "../model/Blog.js";

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
