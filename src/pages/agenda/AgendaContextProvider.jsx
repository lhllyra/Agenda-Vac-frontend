import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from '../../utils/api';

export const AgendaContext = createContext();
// eslint-disable-next-line react/prop-types
export default function AgendaContextProvider({ children }) {
  const [agenda = [], setAgenda] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/appointment');
      setAgenda(response.data.data);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AgendaContext.Provider value={[agenda, setAgenda, fetchData]}>
      {children}
    </AgendaContext.Provider>
  );
}
