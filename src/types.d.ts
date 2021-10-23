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

interface Guild {
  id: string,
  name: string,
  icon : string | undefined,
  banner: string | undefined,
  members: number,
  channels: Channel[],
  roles: Role[]
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
