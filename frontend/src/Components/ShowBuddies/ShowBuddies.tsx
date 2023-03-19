import React, { useEffect, useRef, useState, useMemo } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import './ShowBuddies.css';
import { LatLng } from "use-places-autocomplete";

export default function ShowBuddies(){
   const {isLoaded} = useLoadScript({googleMapsApiKey:'AIzaSyDNSk4C-ACBV0F0z8yck_KYto3YS_yyZ2Q',})
   if(!isLoaded) return <div>Loading...</div> 
   return <Map />;
}

function Map(){

    const [latitude, setLatitude] = useState<any>();
    const [longitude, setLongitude] = useState<any>();

    useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.longitude)
        console.log(position.coords.latitude)
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLatitude(lat);
        setLongitude(lng);
/*
        fetch(`/users/post-loc/${username}`, {
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
        */
    });
    }, []);


/*
    const [markers, setMarkers] = useState<any>([{}]);
    /*
    const sessionCookie = document.cookie.split('; ').find(cookie => cookie.startsWith('session='));
    console.log(document.cookie)
    console.log(sessionCookie)
    const username = sessionCookie ? sessionCookie.split('=')[1] : null;
    
    const username = "sosol"
    useEffect(() => {
        fetch(`/users/get-users/${username}`)
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw response;
          })
          .then((data) => {
            const newMarkers = data.map((user:any) => {
              return {
                lat: user.location.lat,
                lng: user.location.lng,
              };
            });
            setMarkers(newMarkers);
          })
          .catch((error) => {
            console.log(error);
          });
      }, []);



    const renderMarkers = () => {
        return markers.map((marker:any, index:any) => {
          return <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />;
        });
    };
    {renderMarkers()}
*/
    const loc = useMemo(()=>({lat:latitude, lng:longitude }),[latitude,longitude])
    return (<GoogleMap zoom = {15} center = {loc} mapContainerClassName = "map-container">
        
        <Marker position={loc}/>
    </GoogleMap>);
     
}
