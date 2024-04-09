import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";

export const Home = async (req, res) => {
  if (!req.userId){
    return res.render("Home",{user:''})
  }
  const id = req.userId;
  console.log(req.userId)
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
      include: {
        postDetail: true,

      }
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
  // return res.json({})
  const query = req.query;
  console.log(query)
  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
    });

//         const storeList = [
//     {
//         "type": "Feature",
//         "geometry": {
//           "type": "Point",
//           "coordinates": [72.82952788802635, 18.920675417289807]
//         },
//         "properties": {
//           "name": "Pizza outlet 1",
//           "address": "Ground Floor, Strand Coffee House, PJ Ramchandani Marg, Apollo Bandar, Colaba, Mumbai, Maharashtra 400005, India",
//           "phone": "23 2323 2323"
//         }
//       }
// ]
    return res.render('SearchPage',{data:posts});

  } catch (err) {
    console.log('err',err);
      }
};

