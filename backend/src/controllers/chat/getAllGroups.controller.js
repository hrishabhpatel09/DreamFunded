import { response } from "express";
import { User } from "../../models/userSchema.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { Chat } from "../../models/chat.Schema.js";
import mongoose, { Types } from "mongoose";

const getUserGroups = async (req, res) => {
  const id = req.user.id;
  if (!id)
    return res.status(404).json(new ApiResponse("User should be Logged In"));
  const response = await Chat.aggregate([
    {
      $match: {
        participants: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "participants",
        foreignField: "_id",
        as: "groupMembers",
      },
    },
    {
      $lookup: {
        from: "chatmessages",
        localField: "_id",
        foreignField: "chat",
        as: "messages",
      },
    },
    {
      $project: {
        name: 1,
        admin: 1,
        createdAt: 1,
        "messages.sender": 1,
        "messages.content": 1,
        "messages.createdAt": 1,
        "groupMembers.username": 1,
        "groupMembers.avatarImage": 1,
        "groupMembers._id": 1,
      },
    },
  ]);

  if (!response) return res.send(new ApiResponse("Incorrect Username"));
  return res.status(200).json(new ApiResponse("Gropus fetched", response));
};

const getAllMessages = async (req, res) => {
  // const id = req.user.id;
  const { groupId } = req.body;
  const AllMessages = await Chat.aggregate([
    {
      $match: {
        _id: new Types.ObjectId(groupId || ""),
      },
    },
    {
      $lookup: {
        from: "chatmessages",
        localField: "_id",
        foreignField: "chat",
        as: "messages",
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "participants",
        foreignField: "_id",
        as: "groupMembers",
      },
    },
    {
      $project: {
        name: 1,
        admin: 1,
        createdAt: 1,
        "messages.sender": 1,
        "messages.content": 1,
        "messages.createdAt": 1,
        "groupMembers.username": 1,
        "groupMembers.avatarImage": 1,
        "groupMembers._id": 1,
      },
    },
  ]);
  if (!AllMessages) return res.json({ data: "No Messages" });
  return res.status(200).json(
    new ApiResponse("Messages Fetch Successfully", {
      sucess: true,
      AllMessages,
    })
  );
};

const getUserGroupsId = async (id) => {
  const userGroups = await Chat.aggregate([
    {
      $match: {
        participants: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $project: {
        _id: 1,
      },
    },
  ]);
  if(!userGroups) return [];
  else return userGroups;
};

export { getUserGroups, getAllMessages, getUserGroupsId };
