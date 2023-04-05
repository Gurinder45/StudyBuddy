import React, { useEffect, useRef, useState, useMemo, useCallback, useContext } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker, InfoWindow, Circle } from "@react-google-maps/api";
import './ShowBuddies.css';
import { LatLng } from "use-places-autocomplete";
import io from "socket.io-client";
import { MatchContext, MatchContextType } from "../Matching/MatchContext";
import { Container, Row, Col } from "react-bootstrap";
import ChatSpot from "./ChatSpots";

export default function ShowBuddies(){
   const {isLoaded} = useLoadScript({googleMapsApiKey:'AIzaSyDNSk4C-ACBV0F0z8yck_KYto3YS_yyZ2Q',})
   const [selectedType, setSelectedType] = useState<string>("");

   if(!isLoaded) {return <div>Loading...</div>}
   
   


   return(
      <Container>
        <Row>
          <Col md = "auto"><Map selectedType={selectedType} /></Col>
          <Col><ChatSpot onTypeSelect={setSelectedType} /></Col>
        </Row>
      </Container>
   );
}


function Map({ selectedType }:any){
    const [latitude, setLatitude] = useState<any>();
    const [longitude, setLongitude] = useState<any>();
    const [markers, setMarkers] = useState<any>([{}]);
    const [username, setusername] = useState("");
    const [newMarker, setNewMarker] = useState<any>(null);
    const [selectedMarker, setSelectedMarker] = useState<any>(null);
    const [socket, setSocket] = useState<any>(null);
    const matchContext = useContext(MatchContext) as MatchContextType;

    const buddiesList = matchContext.buddies ?
    matchContext.buddies.map((b)=>{
      return b.username;
      
    }):null;

    const candidatesList = matchContext.candidates ?
    matchContext.candidates.map((c)=>{
      return c.username;
      
    }):null;

    const chatrooms = matchContext.chatrooms?
    matchContext.chatrooms.map((c)=>{
      return c;
      
    }):null;

    useEffect(() => {
      if (chatrooms) {
        const newDict:any = {};
        chatrooms.forEach((chatroom) => {
          newDict.chatroom.chatid = useState(null);
        });
        //setMyDict(newDict);
      }
    }, [matchContext.chatrooms]);

    useEffect(()=>{
      const newSocket = io("/meet-up");
      setSocket(newSocket);
      if(selectedType){
        newSocket.emit("join room", selectedType);
      }
      
      /*
            setSocket(newSocket);
            const newrooms: any[] = []
            newMarkers.map((marker:any)=>{
              marker.buddies.map((buddy:any)=>{
                if(buddy === user){
                  const room = [user, marker.username]
                  const string = room.sort().join()
                  newrooms.push(string)
                  if(newSocket){
                    newSocket.emit("join room", string);
                  }
                }
              })
            })
        */
    })



    useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.longitude)
        console.log(position.coords.latitude)
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLatitude(lat);
        setLongitude(lng);
      
        fetch(`/users/post-loc`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                lat,
                lng
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to post location data');
            }
            
        })
        .catch(error => {
            console.error(error);
        });


        fetch(`/users/get-users-inoneKm`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw response;
          })
          .then((data) => {
            const usersWithinOneKm = data.usersWithinOneKm;
            const user = data.username
            const newMarkers = usersWithinOneKm.map((user:any) => {
                return {
                  lat: user.location.coordinates[1],
                  lng: user.location.coordinates[0],
                  username: user.username,
                  buddies: user.buddies
                };
              
            },
            );
            
            setMarkers(newMarkers);
            setusername(user)
          })
          
          .catch((error) => {
            console.log(error);
          });
          
        
    });
    }, []);


    useEffect(() => {
      if (socket) {
        socket.on("newmarker",(marker: any)=>{
          console.log(marker.username)
          setNewMarker(marker)
        });
      }
    }, [socket]);


  const OnCircleClick = useCallback((event: any) => {
    // create a new marker when the map is clicked
    const group = chatrooms?.map((c)=>{
        if(c.chatid == selectedType){
          return c.title
        }
    })
    const marker = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
      username: group+": Meet-up",
    }
    setNewMarker(marker);
    
    if(socket && selectedType){
      socket.emit("add-marker",selectedType, marker);
      /*
      rooms.map((room:any)=>{
        socket.emit("add-marker",selectedType, marker);
      })
      */
    }
  }, [socket]);

    var url = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
    const renderMarkers = () => {
        return markers.map((marker:any, index:any) => {
          if(candidatesList?.includes(marker.username) || buddiesList?.includes(marker.username)){
            if(buddiesList && buddiesList.includes(marker.username)){
              url = "http://maps.google.com/mapfiles/ms/icons/purple-dot.png"
            }
            else{
              url = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
            }
            return <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} title = {marker.username}  
            icon = {{
              url: url,
              scale: 10
            }}
            onClick={() => {
              
              setSelectedMarker(marker);
            }}
            >
            </Marker>;
          }
         
        });
    };
    
    

    const loc = useMemo(()=>({lat:latitude, lng:longitude }),[latitude,longitude])
    return (<GoogleMap zoom = {15} center = {loc} mapContainerClassName = "map-container">
        {renderMarkers()}
        {selectedMarker && (
          <InfoWindow
            position={{ lat: selectedMarker.lat, lng: selectedMarker.lng }}
            options={{
              pixelOffset: new google.maps.Size(0, -30),
            }}
            onCloseClick={() => {
              setSelectedMarker(null);
            }}
          >
            <div>{selectedMarker.username}</div>
          </InfoWindow>
        )}
        <Marker position={loc} title = "you" icon = {{
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
            scale: 10
          }} 
          onClick={() => {
            setSelectedMarker({
              lat: loc.lat,
              lng: loc.lng,
              username: "you"
            });
          }}
          />

        {newMarker&&(
          <Marker position={{lat: newMarker.lat, lng: newMarker.lng}} title = "Meet-up spot" icon = {{
            url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
            scale: 10
          }} 
          onClick={() => {
            setSelectedMarker({
              lat: newMarker.lat,
              lng: newMarker.lng,
              username: newMarker.username
            });
          }}/>
        )}

        {loc && (
        <Circle
          center={loc}
          radius={1000}
          options={{
            fillColor: "#1a73e8",
            fillOpacity: 0.2,
            strokeColor: "#1a73e8",
            strokeOpacity: 0.7,
            strokeWeight: 2,
          }}
          
        />
      )}

      {loc && (
        <Circle
          center={loc}
          radius={1000000}
          onClick ={OnCircleClick}
          options={{
            fillOpacity: 0,
            strokeOpacity: 0
          }}
        />
      )}
    </GoogleMap>);
     
}
