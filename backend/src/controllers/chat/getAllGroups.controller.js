import { response } from "express";
import { User } from "../../models/userSchema.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import mongoose from "mongoose";

const getUserGroups = async (req, res) => {
  const id = req.user.id;
  if(!id) return res.status(404).json(new ApiResponse('User should be Logged In'))
  const results = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "chats",
        localField: "_id",
        foreignField: "participants",
        as: "groups",
      },
    },
    {
      $project: {
        groups: 1,
        username: 1,
      },
    },
  ]);

  if(!response) return res.send(new ApiResponse('Incorrect Username'))
  return res.status(200).json(new ApiResponse('Gropus fetched',results))
};

export { getUserGroups };
