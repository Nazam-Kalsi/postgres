import { handler } from "../helpers/handler";
import { create } from "./crud";

export const createPost = handler(async (req, res) => {
  const user = req.user;
  const { content, title } = req.body;
  console.log("in post : ", user);
  if (title.trim() === "" || content.trim() === "")
    throw new Error("can't be empty.");

  const newPost = await create("posts", { content, title, user_id: user.id });
  if (!newPost) throw new Error("Post not created");

  res.status(200).json({
    message: "success",
    data: newPost,
  });
});
