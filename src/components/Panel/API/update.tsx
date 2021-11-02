import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../contexts/userContext';

/*
  UpdateStatus:
    0: Nothing
    1: Loading
    2: Updated
    3: Failed
*/

const useUpdateApi = (endpoint: string, data: any, ogData: any) => {
  const {current} = useContext(UserContext)
  const [updateStatus, setUpdateStatus] = useState(0)

  useEffect(() => {
    let _mounted = true;

    const updateData = async (endpoint: string, data: any) =>  {
      await axios.post(process.env.REACT_APP_BASE_URL + '/API' + endpoint, data, 
      {withCredentials: true, params: {guild: current}})
        .then(response => {
          if (_mounted)
            setUpdateStatus(2)
          }).catch(error => {
          if (_mounted)
            setUpdateStatus(3)
          }).finally(() => {
            if (_mounted)
              setTimeout(regretStatus, 1500)
          })
    }

    const regretStatus = () => {
      if (_mounted)
        setUpdateStatus(0)
    }

    if(data !== ogData && data){
      setUpdateStatus(1)
      updateData(endpoint, data)
    }

    return () => {
      _mounted = false
    }

  }, [data, endpoint, current, ogData])

  return updateStatus
}

export default useUpdateApi;
