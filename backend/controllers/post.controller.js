import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import Notification from "../models/notification.model.js";
import {v2 as cloudinary} from "cloudinary";
export  const createPost=async(req,res)=>{
   try{
const {text}=req.body;
const{img}=req.body;
const userId=req.user._id.toString();
console.log(userId);
const user=await User.findById(userId);
if(!user)return res.status(404).json({message:"User not found"});
if(!text&&!img)
{
    return res.status(404).json({message:"post must have text or img"});

}
if(img)
{
    const uploadedResponse=await cloudinary.uploader.upload(img);
    img=uploadedResponse.secure_url;
}
const newPost=new Post({
    user:userId,
    text,
    img,

});
await newPost.save();
res.status(201).json(newPost);
   } 
   catch(error)
   {
res.status(500).json({error:"Internal server error"});
console.log("eror in create post controller",error);
   }
};
  export const deletePost=async(req,res)=>{
try{
const post =await Post.findById(req.params.id);
if(!post)
{
    return res.status(404).json({error:"post not found"});
}
if(post.user.toString()!==req.user._id.toString())
{
    return res.status(404).json({error:"you are not authorized for this post"});

}
if(post.img)
{
    const imgId=post.img.split("/").pop().split(".")[0];
    await cloudinary.uploader.destroy(imgId);

}
await Post.findByIdAndDelete(req.params.id);
res.status(200).json({message:"Post delete successfully"});
}catch(error)
{
console.log("error in delete post ",error);
res.status(500).json({error:"internal server error"});

}
}
export const  commentOnPost=async(req,res)=>{
    try{
    const {text}=req.body;
    const postId=req.params.id;
    const userId=req.user._id;
    if(!text)
    {
        return res.status(400).json({error:"text fiwld is required"});

    
    }
    const post=await Post.findById(postId);

    if(!post)
    {
        return  res.status(400).json({error:"post not found"});

    }
    const comment ={user:userId,text};
    post.comments.push(comment);
    await post.save();
    res.status(200).json({post});
}catch(error)
{
    console.log("Errror in comment post controller",error);
    res.status(500).json({error:"INternal server error"});
}
}
export const likeUnlikePost=async(req,res)=>{
    try{

    
    const userId=req.user._id;
    const{id:postId}=req.params; // rename post id to postId
    const post=await Post.findById(postId);
   if(!post)
    {
return res.status(400).json({error:"Post is not found"});

    } 
    const  userLikedPost=post.likes.includes(userId);
    if(userLikedPost)
    {
// un like post
// post id {postId} is equal to  passing of id and finding id are equal
//  then remove from database
await Post.updateOne({_id:postId},{$pull:{likes:userId}});
// user liked posts 
await User.updateOne({_id:userId},{$pull:{likedPosts:postId}});

res.status(200).json({message:"post Unliked sucessfully"});

    }else{
// like post
post.likes.push(userId);

await User.updateOne({_id:userId},{$push:{likedPosts:postId}});

await post.save();
const notification=new Notification(
    
    {
from:userId,
to:post.user,
type:"like",
    }
)
await notification.save();
res.status(200).json({message:"post liked sucessfully"});

    }

}catch(error)

{
    console.log("Errror in like post controller",error);
    res.status(500).json({error:"Internal server error"});   
}
}
export const getAllPosts=async(req,res)=>{
    try{
const posts=await Post.find().sort({createdAt:-1})
.populate({
    path:"user",
    select:"-password",
})
.populate(
    {
        path:"comments.user",
        select:"-password",
    }
)
if(posts.length==0)
{
    return res.status(200).json([]);

}
res.status(200).json(posts);
    }catch(error)
    {
        console.log("Errror in geAllposts controller",error);
        res.status(500).json({error:"Internal server error"});
    }
}
export const getLikedPosts=async(req,res)=>{
    const userId=req.params.id;
  try{
const user=await User.findById(userId);
if(!user) return res.status(404).json({error:"User not found"});
const likedPosts=await Post.find({_id:{$in:user.likedPosts}})
.populate(
    {
      path:"user",
      select:"-password"  ,
    }
)
.populate(
    {
        path:"comments.user",
        select:"-password",
        }
)
res.status(200).json(likedPosts);
  } catch(error) 
  {
    console.log("Errror in getLikedposts controller",error);
    res.status(500).json({error:"Internal server error"}); 
  }
}
export const getFollowingPosts=async(req,res)=>{
    try{
const userId=req.user._id;
const user=await User.findById(userId);
if(!user) return res.status(400).json({error:"User not found"});
const following=user.following;
const feedPosts=await Post.find({user:{$in:following}})
.sort({createdAt:-1}) // latest posts
.populate({
    path:"user",
    select:"-password",
})
.populate({
    path:"comments.user",
    select:"-password",
});
res.status(200).json(feedPosts);
    }catch(error)
    {
        console.log("Errror in getFollowingposts controller",error);
        res.status(500).json({error:"Internal server error"});
    }
}
export  const getUserPosts=async(req,res)=>{
    try{
const {username}=req.params;
const user=await User.findOne({username});
if(!user)return res.status(404).json({error:"user not found"});
const posts=await Post.find({user:user._id}).sort({createdAt:-1})
.populate({
    path:"user",
    select:"-password",
})
.populate({
    path:"comments.user",
    select:"-password",
});
res.status(200).json(posts);

    }
    catch(error)
    {
        console.log("Errror in getUserposts controller",error);
        res.status(500).json({error:"Internal server error"});
    }
}