import axios from 'axios'
import { useEffect, useState } from 'react'

type StatT = {
  message: string,
  guilds: number,
  users: number
} 

const useStats = () : StatT => {
  const [stats, setStats] = useState<StatT>({message: '⌛', guilds: 0, users: 0})

  const fetchStatsData = () => {
    let _mounted = true 

    const fetchStats = async() => {
      await axios.get<StatT>(process.env.REACT_APP_BASE_URL + "/api/extra/stats").then((res) => {
        setStats(res.data)
      }).catch((err) => {
        console.log(err)
      })
      .catch((err) => {
        if(_mounted){
          console.log(err)
        }
      })
    }
    fetchStats() 

    return () => {
      _mounted = false
    }    
  }

  useEffect(() => {
    fetchStatsData()
  }, [])

  return stats
}

export default useStats