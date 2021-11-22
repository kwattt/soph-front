import axios from 'axios'
import { useState, useEffect, useContext, useRef } from 'react'

import { UserContext } from '../../../contexts/userContext'

const useApi = (endpoint: string) => {
  const {current} = useRef(useContext(UserContext).current)

  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<boolean | number>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    let _mounted  = true

    const fetchData = async () => {
      setLoading(true)
      await axios.get(process.env.REACT_APP_BASE_URL + '/API' + endpoint, {withCredentials: true, params: {guild: current}}).then(response => {
        if(_mounted)
        setData(response.data)
      }).catch(error => {

        if(error.response && _mounted)
          setError(error.response.status)
        else 
          if(_mounted)
            setError(500)

        }).finally(() => {
          if(_mounted)          
            setLoading(false)
      })
    }

    fetchData()

    return () => {
      _mounted = false
    }

  }, [endpoint, current]) 

  return {data, error, loading}
}

export {default as useUpdateApi} from './update'

export default useApi;