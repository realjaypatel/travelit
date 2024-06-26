import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const Home = async (req, res) => {
  if (!req.userId){
    return res.render("Home",{user:''})
  }
  const id = req.userId;
  try {
    let user = await prisma.user.findUnique({
      where: { id },
    });
    return res.render("Home",{user:user})
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "fail to get home page" });
   
  }
    
};

export const Profile = async (req, res) => {
  
  const id = req.userId;
  try {
    let userData = await prisma.user.findUnique({
      where: { id },
    });
    const userPosts = await prisma.post.findMany({
      where: { userId: id },

    });
    const saved = await prisma.savedPost.findMany({
      where: { userId: id },
      include: {
        post: true,
      },
    });
    const savedPosts = saved.map((item) => item.post);
    return res.render("Profile",{user:userData,posts:userPosts,saved:savedPosts})
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "fail to get profile page" });
   
  }
    
};

export const Search = async (req, res) => {

  const query = req.query;
  try {
    const posts = await prisma.post.findMany({
      where: {
        // city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
    });
    
    return res.render('SearchPage',{data:posts,user:req.userId,city : query.city});
  } catch (err) {
    console.log('err',err);
      }
};

export const getPost = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    return res.render('PostPage',{post:post,user:req.userId})


} catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get post" });
  }
};

