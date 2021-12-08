import Extras from "./Extras"
import Info from "./Info"
import Levels from "./Levels"
import Messages from "./Messages"
import Socials from "./Socials"

/*

  TODO:
    FUNCS:
      Messages: ✅ 
        oraculo ✅
        reminders ✅
        welcome ✅
        stalk ✅

      Socials: ✅
        facebook ✅
        twitch ✅
        twitter ✅
        youtube ✅

      Extras:
        autochannel ✅
        bday ✅
        purge ✅

      Niveles:
        levels ✅
        shop ✅
        top ✅

      User: ✅

      Theme: 
        * Pending ⚠️

      Footer:
        Terms & Conditions ✅
        Privacy Policy ✅

*/

function Panel({view}: {view: Views}) {
  if(view === 'info')
    return <Info/>

  if (view === 'messages')
    return <Messages/>

  if (view === 'socials')
    return <Socials/>

  if (view === 'extras')
    return <Extras/>

  if (view === 'levels')
    return <Levels/>

  return <>Uhm, alguien está jugando con las variables 🧁</>
}

export default Panel