import React, { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const ChatList = () => {
  const navigate = useNavigate();
  const data: any = useLoaderData();
  const [chats, setChats] = useState([]);

  useEffect(() => {
        if (!data.loggedIn) {
          setTimeout(() => navigate("/login"), 0);
        } else {
          const fetchUserChats = async () => {
            const response = await fetch("/chats");
            const data = await response.json();
            setChats(data);           
          };
          fetchUserChats();
        }
    }, [data.loggedIn, navigate]);



  return (
    <div>ChatList
        <button onClick={() => {navigate('/create-chat')}}>create</button>
    </div>
  )
}

export default ChatList