import { useContext } from "react";
import { Chats } from "../Chats";
import { MatchContext, MatchContextType } from "../Matching/MatchContext";

export default function ChatSpot({ onTypeSelect }:any){
    const matchContext = useContext(MatchContext) as MatchContextType;
    const chatrooms = matchContext.chatrooms?
    matchContext.chatrooms.map((room:Chats)=>{
        return room;
        
    }):null;
    const handleTypeSelect = (type: string | null) => {
        onTypeSelect(type);
      };
    
      return (
        <div>
      <h2>Select a chatroom:</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
          </tr>
        </thead>
        <tbody>
          {chatrooms &&
            chatrooms.map((room: Chats) => (
              <tr key={room.chatid}>
                <td>
                  <button onClick={() => handleTypeSelect(room.chatid)}>
                    {room.title}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <button onClick={() => handleTypeSelect(null)}>Clear Selection</button>
    </div>
        
      );
}