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
    // const filteredUsers = data.filter((user: any) => user.username !== loggedInUser);
    // setUsers(filteredUsers);
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
    if (socket) {
      socket.on("update-users", () => {
        fetchUsers();
      });
    }
  }, [socket]);

  const handleLeaveChat = () => {
    if (socket) {
      const confirmLeave = window.confirm("Are you sure you want to leave the chat?");
      if (confirmLeave) {
        socket.emit("leave", {
          chatroom: chatId,
          user: loggedInUser,
        });    
        navigate("/chats");
      }
    }
  };
  


  return (
    <div className="mb-3">
      <h4 style={ { textAlign: 'center'} }>Users</h4>
      <ListGroup>
        {users.map((user) => (
          <ListGroup.Item key={user.username} className="border-0 mb-2">{user.username}</ListGroup.Item>
        ))}
      </ListGroup>
      <div className="d-grid gap-1">
        <Button variant="outline-success" size="sm" onClick={()=> navigate(`/add-users/${chatId}`)}>
          Add Users
        </Button>
        <Button variant="outline-danger" size="sm" onClick={handleLeaveChat}>
          Leave Chat
        </Button>
        
      </div>

    </div>
  );
   
};

export default Sidebar;
