import axios, { AxiosResponse } from "axios"
import {createContext, useState, useEffect, FC} from "react";

type UserCType = {
  logged: boolean,
  current: string,
  user: User,
  guilds: Guild[],

  setCurrent: any
}

const defaultContext : UserCType = {
  logged: false,
  current: '0',
  user: {
    id: '0',
    username: 'none',
    discriminator: 'none',
    avatar: undefined,
    banner: undefined,
    month: undefined,
    day: undefined
  },
  guilds: [],
  setCurrent: (val: string) => {}
}

export const UserContext = createContext(defaultContext)

const UserProvider : FC = ({children}) => {
  const [data, setData] = useState(defaultContext)

  const fetchUserGuilds = async () => {
    let _mounted = true 

    const fetchData = async() => {
      await axios.get<Guild[]>(process.env.REACT_APP_BASE_URL + "/api/user/guilds", {withCredentials: true}).then((res) => {
        setData(oldData => ({...oldData, 
          guilds: res.data
          }))
      }).catch((err) => {
        if(err.response){
          if(err.response.status === 401)
            return
        }
        console.log(err)
      })
      .catch((err) => {
        if(_mounted){
          console.log(err)
        }
      })
    }
    fetchData() 

    return () => {
      _mounted = false
    }    
  }
  const fetchUserData = async() => {
    let _mounted = true 

    const fetchData = async() => {
      await axios.get<User>(process.env.REACT_APP_BASE_URL + "/api/user/info", {withCredentials: true}).then((res) => {
        setData(oldData => ({...oldData, 
          logged: true,
          user: res.data
          }))
          fetchUserGuilds()
        }).catch((err) => {
        if(err.response){
          if(err.response.status === 401)
            return
        }
        console.log(err)
      })
      .catch((err) => {
        if(_mounted){
          console.log(err)
        }
      })
    }
    fetchData() 

    return () => {
      _mounted = false
    }    
  }

  useEffect(() => {
    fetchUserData()
  }, [])

  const setCurrent = (val: string) => {
    setData(oldData => ({...oldData, current: val}))
  }

  return <UserContext.Provider  
    value={{
      ...data,
      setCurrent
    }}
  >
    {children}
  </UserContext.Provider>
}

export default UserProvider