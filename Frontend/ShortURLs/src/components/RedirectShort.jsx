import { useEffect } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import Loading from "./Loading";

export default function RedirectShort() {
    const backendURL = import.meta.env.VITE_BACKEND_SERVER_URL;
    const frontendURL = import.meta.env.VITE_FRONTEND_SERVER_URL;
    const { code } = useParams(); 
    useEffect(() => {
        async function getData(){
            const response = await axios.get(backendURL + "shorten/" + code);
            
            if(response.status === 200){
                window.location.href = response.data.url;
            }
        }
        getData();
    }, [])

  return (
    <div className="bg-gray-800 h-screen flex items-center justify-center"><Loading/></div>
  )
}
