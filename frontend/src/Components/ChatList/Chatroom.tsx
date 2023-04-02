import { useEffect, useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import RootNavbar from "../Root/RootNavbar";
import io from 'socket.io-client';

const Chatroom = () => {
  const navigate = useNavigate();
  const data: any = useLoaderData();
  const { id } = useParams<{ id: string }>();
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState<any>(null);

  useEffect(() => {
    if (!data.loggedIn) {
      setTimeout(() => navigate("/login"), 0);
    }
  }, [data.loggedIn, navigate]);


  useEffect(() => {
    const newSocket = io("/chat", { query: { chatId: id } });
    setSocket(newSocket);
  
    return () => {
      newSocket.close();
    };
  }, []);
  

  useEffect(() => {
    if (socket) {
      socket.on("response", (message: any) => {
        setMessages((messages: any) => [...messages, message]);
      });
    }
  }, [socket]);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       const response = await fetch(`/chats/${id}`);
//       const data = await response.json();
//       setMessages(data);
//     };
//     fetchMessages();
//   }, [id]);

const handleSubmit = (event: any) => {
    event.preventDefault();
    const now = new Date();
    const timestamp = now.toUTCString();
  
    if (newMessage.trim() === "") {
      return;
    }
  
    if (socket) {
      socket.emit("message", {
        chatroom: id,
        body: newMessage,
        fromuser: data.username,
        sent: timestamp,
      });

    const messageObj = {
        chatroom: id,
        body: newMessage,
        fromuser: data.username,
        sent: timestamp,
    }
    setMessages((messages: any) => [...messages, messageObj]);
  
    setNewMessage("");
    }
  };

  return (
    data.loggedIn ?
    <>
        <RootNavbar loggedIn={data.loggedIn} />
        <Container>
          <Row>
            <Col sm={0} md={1}></Col>
            <Col sm={12} md={10}>
            <div>
                <h3>Chatroom {id}</h3>
                <div style={{ maxHeight: '400px', overflowY: 'scroll' }}>
                  {messages.map((message: any, index: number) => (
                    <div key={index} className={`my-3 d-flex ${message.fromuser === data.username ? 'justify-content-end' : 'justify-content-start'}`}>
                      <div className={`p-3`} style={{ display: 'flex', flexDirection: 'column' }}>
                        {message.fromuser === data.username ? <span className="text-muted ml-2" style={{ textAlign: 'right'}}>You</span> : <span className="text-muted ml-2">{message.fromuser}</span>}
                        <p className='mb-1'>{message.body}</p>
                        <small style={{ textAlign: message.fromuser === data.username ? 'right' : 'left' }}>{new Date(message.sent).toLocaleString('en-US', { month: 'short', day:'numeric', hour: 'numeric', minute: 'numeric', hour12: true })}</small>
                        
                      </div>
                    </div>
                  ))}
                </div>
                <Form onSubmit={handleSubmit} className="d-flex">
                  <Form.Group className="flex-grow-1 mr-2">
                    <Form.Control
                      type="text"
                      placeholder="Enter message"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" style={{ width: "15%" }}>
                    Send
                  </Button>
                </Form>
              </div>
                        
            </Col>
            <Col sm={0} md={1}></Col>
          </Row>
        </Container>
    </>
    : <div className='d-flex justify-content-center align-items-center my-auto vh-100'>
        <Spinner animation="border" variant='primary' style={{ width:'100px', height:'100px' }} />
      </div>
  );
};

export default Chatroom;
