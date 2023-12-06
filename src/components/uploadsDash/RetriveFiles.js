import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Spinner from "../spinner/Sipnner"
import { ProviderPass } from '../Provider'


export default function RetriveFiles() {

    const {user} = useContext(ProviderPass)

    const [fetchedFiles, setFetchedFiles] = useState([])

    const getFilesHandler = async () => {
        try {
            const res = await axios.get('http://localhost:3300/getfiles', {
                withCredentials: true,
                params: {
                    user: user.email, uid: user.uid
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            console.log(res.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getFilesHandler()
    },[])

  return (
    <div>RetriveFiles</div>
  )
}





