import React, { useEffect, useRef, useState, useMemo } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import './ShowBuddies.css';
import { LatLng } from "use-places-autocomplete";
/*
declare global {
    interface Window {
      google: any;
    }
  }
  
  function initMap() {
    // Create a new map centered on the user's location
    navigator.geolocation.getCurrentPosition(function (position) {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: userLocation,
        zoom: 10
      });
      new window.google.maps.Marker({
        position: userLocation,
        map: map,
        title: "You are here!"
      });
    });
  }

  const ShowBuddies: React.FC = () => {
    const [googleLoaded, setGoogleLoaded] = useState(false);
  
    useEffect(() => {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDNSk4C-ACBV0F0z8yck_KYto3YS_yyZ2Q`;
      script.async = true;
      document.body.appendChild(script);
  
      script.addEventListener("load", () => {
        setGoogleLoaded(true);
      });
  
      return () => {
        script.removeEventListener("load", () => {
          setGoogleLoaded(true);
        });
      };
    }, []);
  
    useEffect(() => {
      if (googleLoaded) {
        initMap();
      }
    }, [googleLoaded]);
  
    return <div id="map" style={{ height: "100%" }}></div>;
  };
*/

export default function ShowBuddies(){
   const {isLoaded} = useLoadScript({googleMapsApiKey:'AIzaSyDNSk4C-ACBV0F0z8yck_KYto3YS_yyZ2Q',})
   if(!isLoaded) return <div>Loading...</div> 
   return <Map />;
}

type UserLocation = {
    lat: number | null;
    lng: number | null;
};

function Map(){

    //const [userLocation, setUserLocation] = useState({ lat: null, lng: null });

    //const [userLocation, setUserLocation]= useState<UserLocation>({ lat: null, lng: null });
    const [latitude, setLatitude] = useState<any>();
    const [longitude, setLongitude] = useState<any>();

    useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
        //const { latitude: lat, longitude: lng } = position.coords;
        console.log(position.coords.longitude)
        console.log(position.coords.latitude)
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        setLatitude(lat);
        setLongitude(lng);
        //setUserLocation( {position.coords.latitude, position.coords.longitude});
    });
    }, []);

    const loc = useMemo(()=>({lat:latitude, lng:longitude }),[latitude,longitude])
    return (<GoogleMap zoom = {5} center = {loc} mapContainerClassName = "map-container">
        <Marker position={loc}/>
    </GoogleMap>);
     
}
