import React, { useRef, useEffect, useState } from "react";
import { io } from "socket.io-client";
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import "./ChatApp.css";
import MessageBox from "../Components/MessageBox.jsx";
import sampleAvatar from "../assets/images.png";
import { useLoaderData } from "react-router-dom";
import axios from "axios";
import SenderBox from "../Components/SenderBox.jsx";
import RecievedBox from "../Components/RecievedBox.jsx";
import { addMessage, setGroup } from "../store/userSlice.js";

const ChatApp = () => {
  const result = useLoaderData();
  const socket = useRef(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const chat = useSelector((state) => state.chat);
  const groups = useSelector((state) => state.groups);
  const [onlineUser, setOnlineUser] = useState([]);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [groupMembers, setGroupMembers] = useState([]);
  const messageBoxRef = useRef(null);

  useEffect(() => {
    socket.current = io("http://localhost:8000", {
      query: { username: user.username, id: user._id },
    });

    return () => {
      if (socket.current) {
        socket.current.disconnect();
      }
    };
  }, [user.username]);

  useEffect(() => {
    if (socket.current) {
      dispatch(setGroup(result.data.data));
      socket.current.on("recieve", (data) => {
        console.log(data);
        dispatch(addMessage({ id: data.groupId, message: data.message }));
      });
    }

    return () => {
      if (socket.current) {
        socket.current.off("Online");
      }
    };
  }, [socket.current]);

  useEffect(() => {
    setMessages(chat?.messages);
    setGroupMembers(chat?.groupMembers);

    return () => {
      setMessages([]);
    };
  }, [chat,groups.messages]);

  useEffect(()=>{
    const id = chat?.id;
    const object = groups.find((grp)=>grp._id == id)
    setMessages(object?.messages)
  },[groups])

  useEffect(() => {
    if (messageBoxRef.current) {
      messageBoxRef.current.scrollTop = messageBoxRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    // try {
    //   const msg = newMessage;
    //   setNewMessage("");
    //   await axios.post(
    //     "http://localhost:8000/api/chat/sendMessage",
    //     { groupId: chat._id, message: msg },
    //     { withCredentials: true }
    //   );
    // } catch (error) {
    //   console.log(error);
    // }
    const data = {
      id: user._id,
      time: new Date(Date.now()),
      content: newMessage,
      groupId: chat._id,
    };
    socket.current.emit("message", data);
    setNewMessage("");
  };

  return (
    <>
      <Navbar />
      <div className="grid grid-cols-5 h-[94vh] gap-4 pt-4 dark:bg-[#1f1f1ff7]">
        <div className="col-start-1 col-span-1 bg-white ml-2 rounded-lg dark:bg-[#1f1f1f]">
          <div className="h-20 flex items-center pl-2 gap-2 dark:text-white">
            <img
              src={user.avatarImage}
              alt="user_img"
              className="rounded-[50%] h-16 w-16"
            />
            <div>
              <h2 className="font-semibold">{user.username}</h2>
            </div>
          </div>
          {groups?.map((grp, idx) => (
            <MessageBox key={idx} username={grp?.name} id={grp?._id} />
          ))}
        </div>
        <div className="bg-white col-span-4 rounded-md ml-1 grid grid-rows-12 overflow-hidden">
          <div
            className="bg-white col-span-4 rounded-md rounded-b-none py-2 chat-area flex flex-col overflow-y-auto overflow-x-hidden row-start-1 row-span-11"
            ref={messageBoxRef}
          >
            {messages?.map((msg, idx) => {
              const obj = groupMembers.find((user) => user._id === msg.sender);
              return msg.sender === user._id ? (
                <SenderBox
                  message={msg.content}
                  time={msg.createdAt}
                  key={idx}
                />
              ) : (
                <RecievedBox
                  message={msg.content}
                  time={msg.createdAt}
                  img={obj?.avatarImage || sampleAvatar}
                  key={idx}
                  sender={obj?.username || "Unknown"}
                />
              );
            })}
          </div>
          <div className="flex overflow-x-hidden">
            <input
              type="text"
              className="h-12 ml-2 outline-none w-[1125px] pl-4 msg-box"
              placeholder="type message here ..."
              onChange={(e) => setNewMessage(e.target.value)}
              value={newMessage}
            />
            <button
              className="ml-2 h-12 w-24 bg-blue-700 text-white btn rounded-r-md"
              onClick={sendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatApp;
