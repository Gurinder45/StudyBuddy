import { useState, useEffect } from "react";
import { Button, ListGroup } from "react-bootstrap";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";


const Sidebar = (props:any) => {
  const navigate = useNavigate();
  const { chatId, loggedInUser } = props;
  const [users, setUsers] = useState<any[]>([]);
  const [socket, setSocket] = useState<any>(null);
  const fetchUsers = async () => {
    const response = await fetch(`/chats/${chatId}/users`);
    const data = await response.json();
    setUsers(data);
  }; 

  useEffect(() => {
    fetchUsers();
    const newSocket = io("/chat", { query: { chatId } });
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    console.log("before updating")
    if (socket) {
      socket.on("update-users", () => {
        console.log("updating")
        fetchUsers();
      });
    }
  }, [socket]);

  const handleAddUser = () => {
    // TODO: implement add user functionality
  };

  const handleLeaveChat = () => {
    if (socket) {
        socket.emit("leave", {
          chatroom: chatId,
          user: loggedInUser,
        });    
        navigate("/chats");
    }
  };


  return (
    <div>
      <ListGroup>
        {users.map((user) => (
          <ListGroup.Item key={user.username}>{user.username}</ListGroup.Item>
        ))}
      </ListGroup>
      {/* <Button onClick={handleAddUser}>Add User</Button> */}
      <Button onClick={handleLeaveChat}>Leave Chat</Button>
    </div>
  );
};

export default Sidebar;
