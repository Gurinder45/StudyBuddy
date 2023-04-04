import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Button, Carousel } from 'react-bootstrap';
import './Modal.css'

interface ModalProps{
    open:boolean;
    onClose:()=>void;
    chatId:string;
    loggedInUser:any[];
    
}


const Modal = ({open, onClose, chatId, loggedInUser}:ModalProps) => {
    // const navigate = useNavigate();
    // const { chatId, loggedInUser } = props;
    const [users, setUsers] = useState<any[]>([]);

    const getBuddiesForReview = async () => {
        // const response = await fetch(`/chats/${chatId}/users`);
        // const data = await response.json();
        const filteredUsers = loggedInUser.filter((user: any) => user.username !== loggedInUser[0].username);
        setUsers(filteredUsers);
    }; 

    useEffect(()=>{
        getBuddiesForReview();
    }, [loggedInUser])

    console.log(loggedInUser)
    console.log(chatId)
    console.log(users)

    const prepareForm = async(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

    }

    if(!open) return null;

    return (
    <div className='overlay'>
      <div className='modalContainer'>
         <p onClick={onClose} className='closeBtn'>X</p>
         <div className='content'>
         How were your study buddies?
         <form onSubmit={prepareForm}>

            {users.map((person, index)=>(
                <div key={index}>
                    <br/>
                    Give {person.username} a review:
                    <br/>
                        <textarea name="review" id={person.username} minLength={50}/>
                </div>
            ))}
            <br />
            <Button variant='secondary' size="sm" >Done</Button>
            </form>

         </div>
      </div>
    </div>
  )
}

export default Modal
