import axios from 'axios'
import { useState, useEffect, useContext } from 'react'

import { UserContext } from '../../../contexts/userContext'

const useApi = (endpoint: string) => {
  const {current} = useContext(UserContext)

  const [data, setData] = useState<any>(null)
  const [error, setError] = useState<boolean | number>(false)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      await axios.get(process.env.REACT_APP_BASE_URL + '/API' + endpoint, {withCredentials: true, params: {guild: current}}).then(response => {
        setData(response.data)
      }).catch(error => {
        setError(error)
      }).finally(() => {
        setLoading(false)
      })
    }
    fetchData()
  }, [endpoint, current]) 

  return {data, error, loading}
}

export {default as useUpdateApi} from './update'

export default useApi;