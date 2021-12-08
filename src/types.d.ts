type Views = typeof import('./constants').views[number]

interface User {
  id: string,
  username: string,
  discriminator: string,
  avatar: string | undefined,
  banner: string | undefined,
  month: number | undefined,
  day: number | undefined,
}
 
interface Limits {
  oraculo: number,
  welcome: number,
  stalkmsg: number,
  shops: number,
  socials: number,
  autochannel: number,
  purge: number,
}

interface Guild {
  id: string,
  name: string,
  icon : string | undefined,
  banner: string | undefined,
  members: number,
  channels: Channel[],
  roles: Role[]
  limits: Limits
}

interface Role {
  id: number,
  name: string
}

interface Channel {
  id: string,
  name: string,
  type: "GUILD_VOICE" | "GUILD_TEXT"
}

interface Oraculo {
  msg: string
}

interface Reminders {
  name: string
  message: string
}

interface WMessage {
  msg: string
  type: number
}

interface Stalk {
  roles: Array<string>
  messages: Array<string>
}

interface Twitch {
  channel:  string
  name: string
  type: number
}

interface Twitter {
  channel:  string
  name: string
  type: number
}

interface Facebook {
  channel:  string
  name: string
  type: number
}

interface Youtube {
  channel:  string
  name: string
  type: number
  real_name: string
}

interface Birthday {
  birthday: string
  bdaymsg: string
  bdayutc: number
}

interface Autochannel {
  origenchannel: string
  targetchannel: string
}


interface Purge {
  channel: string
  hour: number
  minute: number
  utc: number
}

interface Levels {
  levels: number
  channels: string[]
}

interface LevelUser {
  name: string,
  points: number,
  xp: number,
  level: number
}

interface Shop {
  name: string,
  role: string,
  channel: string,
  price: number,
  type: number
}
