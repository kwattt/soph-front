import axios from "axios"
import {createContext, useState, useEffect, FC} from "react";

type GuildCType = {
}

const defaultContext : GuildCType = {

}

export const GuildContext = createContext(defaultContext)

const GuildProvider : FC = ({children}) => {
  const [guild, setGuild] = useState(defaultContext)


  return <GuildContext.Provider  
    value={{
    }}
  >
    {children}
  </GuildContext.Provider>
}

export default GuildProvider