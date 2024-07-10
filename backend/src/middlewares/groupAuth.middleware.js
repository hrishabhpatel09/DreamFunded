import { Chat } from "../models/chat.Schema.js";
import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
const groupAuth = async (req, res, next) => {
  const id = req.user.id;
  const { groupId } = req.body;
  if (!id)
    return res
      .status(401)
      .json(new ApiResponse("Please Login To Send Message", { sucess: false }));
  if (!groupId)
    return res
      .status(401)
      .json(new ApiResponse("Please Provide a Group Id", { sucess: false }));

  //checking if user is Part of The Group Or not
  const existingGroup = await Chat.findOne({
    _id: new mongoose.Types.ObjectId(groupId),
  });
  if (!existingGroup)
    return res.json(new ApiResponse("Invalid Group Id", { sucess: false }));
  const isPartOfGroup = existingGroup.participants.filter(
    (user) => user == id
  ).length;
  if (!isPartOfGroup)
    return res
      .status(401)
      .json(new ApiResponse("You are not a Part of Group", { sucess: false }));
  next();
};

export { groupAuth };
