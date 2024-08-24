import { useEffect, useState, useCallback } from "react";
import {instance} from "./axios";

export default function useGetData(url: string) {
  const [clientData, setclientData] = useState<any>([]);

  // Memoize the fetchData function using useCallback
  const fetchData = useCallback(async () => {
    try {
      let response:any;
         response = await instance.get('/api/' + url);
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