import { Chat } from "../models/chat.Schema.js";
import mongoose from "mongoose";
import { ApiResponse } from "../utils/ApiResponse.js";
const groupAuth = async (req, res, next) => {
  // user id of user requesting for group from jwt tokens
  const id = req.user.id;

  // groupsId where requesting
  const { groupId } = req.body;

  //cheching if id and groupId is There
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

  // if No Group Found Then Invalid GroupId
  if (!existingGroup)
    return res.json(new ApiResponse("Invalid Group Id", { sucess: false }));
  const isPartOfGroup = existingGroup.participants.filter(
    (user) => user == id
  ).length;

  // If user is Not a part of Group
  if (!isPartOfGroup)
    return res
      .status(401)
      .json(new ApiResponse("You are not a Part of Group", { sucess: false }));
  
    
  //Group Authentication Successfull redirecting to next middleware/controller
  next();
};

export { groupAuth };
