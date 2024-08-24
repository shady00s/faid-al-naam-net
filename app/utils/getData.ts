import { useEffect, useState, useCallback } from "react";
import {instance} from "./axios";

export default function useGetData(url: string,id:string,keyId:string) {
  const [clientData, setclientData] = useState<any>([]);

  // Memoize the fetchData function using useCallback
  const fetchData = useCallback(async () => {
    try {
      let response:any;
      if(id!=""){
        response = await instance.get('/api/' + url+"?"+keyId+"="+id);

      }else{

        response = await instance.get('/api/' + url);
      }
      setclientData(response.data[url] || []);  
    } catch (error) {
      console.error('Error fetching clientData:', error);
    }
  }, [url]);  

  useEffect(() => {
    fetchData();
  }, [fetchData]);  
   return clientData;
}