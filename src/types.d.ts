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
  type: string
}

interface Oraculo {
  msg: string
}