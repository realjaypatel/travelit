import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.route.js";
import postRoute from "./routes/post.route.js";
import testRoute from "./routes/test.route.js";
import userRoute from "./routes/user.route.js";
import chatRoute from "./routes/chat.route.js";
import bodyParser from "body-parser"
import messageRoute from "./routes/message.route.js";
import fileUpload from "express-fileupload";

const app = express();
app.set('view engine', 'ejs');
app.use(cors({ origin:"*"}));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileUpload({ createParentPath: true }));


app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);
app.use("/api/chats", chatRoute);
app.use("/api/messages", messageRoute);


app.listen(8800, () => {
  console.log("Server is running! on 8800");
});
