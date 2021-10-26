import Info from "./Info"
import Messages from "./Messages"

function Panel({view}: {view: Views}) {
  if(view === 'info')
    return <Info/>

    if (view === 'messages')
    return <Messages/>

  return <>Uhm, alguien está jugando con las variables 🧁</>
}

export default Panel