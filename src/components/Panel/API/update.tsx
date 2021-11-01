import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../contexts/userContext';

/*
  UpdateStatus:
    0: Nothing
    1: Updated
    2: Failed
*/

const useUpdateApi = async (endpoint: string, data: any, ogData: any) => {
  const {current} = useContext(UserContext)
  const [updateStatus, setUpdateStatus] = useState(0)

  useEffect(() => {
    const updateData = async (endpoint: string, data: any) =>  {
      await axios.post(process.env.REACT_APP_BASE_URL + '/API' + endpoint, data, 
      {withCredentials: true, params: {guild: current}})
        .then(response => {

        }).catch(error => {

        })
    }

    if(data !== ogData)
      updateData(endpoint, data)
  }, [data])

  return updateStatus
}

export default useUpdateApi;
