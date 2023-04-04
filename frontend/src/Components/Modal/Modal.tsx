import React, { useEffect, useState } from 'react'
import { Form, useNavigate } from 'react-router-dom';
import { Button, Carousel } from 'react-bootstrap';
import './Modal.css'
import { response } from 'express';

interface ModalProps{
    open:boolean;
    onClose:()=>void;
    chatId:string;
    loggedInUser:any[];
    
}

interface Review {
    name: string;
    reviews: string |FormDataEntryValue;
  }  

const Modal = ({open, onClose, chatId, loggedInUser}:ModalProps) => {
    const [reviewList, setReviewList] = useState([]);

    const navigate = useNavigate();
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

    const prepareForm = async(event:any) => {
        event.preventDefault();
        console.log("HERE IS THE EVENT________________")
        const form = event.target;
        const data = new FormData(form);
        console.log(data.entries())
        const entries = Array.from(data.entries());
        console.log(entries);

        // const newFormData :{[key: string]: FormDataEntryValue}={};

        const newArrayOfObj:Review[] = entries.map(([name, reviews])=>({name, reviews}));
        console.log(newArrayOfObj)
   
        console.log(JSON.stringify(newArrayOfObj))

        const addreview = await fetch('/users/addreview', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newArrayOfObj)
        });
        if (addreview.status >= 200 && addreview.status < 300){
            navigate('/chats');
        }
        else{
            console.log("failed to write review");
        }

    }

    if(!open) return null;

    return (
    <div className='overlay'>
      <div className='modalContainer'>
         <p onClick={onClose} className='closeBtn'>X</p>
         <div className='content'>
         How were your study buddies?
         <Form onSubmit={prepareForm}>

            {users.map((person, index)=>(
                <div key={index}>
                    <br/>
                    Give {person.username} a review:
                    <br/>
                        <textarea name={person.username} minLength={50}/>
                </div>
            ))}
            <br />
            <Button variant='secondary' size="sm" type='submit' >Done</Button>
            </Form>

         </div>
      </div>
    </div>
  )
}

export default Modal
