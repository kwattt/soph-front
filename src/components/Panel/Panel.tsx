import Info from "./Info"
import Messages from "./Messages"

/*

  TODO:
    FUNCS:
      Messages:
        oraculo ✅
        reminders ✅
        welcome ✅
        stalk

      Socials:
        facebook
        twitch
        twitter
        youtube

      Extras:
        autochannel
        bday
        purge

      Niveles:
        levels
        shop

      User: 
*/

function Panel({view}: {view: Views}) {
  if(view === 'info')
    return <Info/>

  if (view === 'messages')
    return <Messages/>

  if (view === 'socials')
    return <>lmao</>

  return <>Uhm, alguien está jugando con las variables 🧁</>
}

export default Panel