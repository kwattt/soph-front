import Info from "./Info"

function Panel({view}: {view: Views}) {
  if(view === 'info')
    return <Info/>

  return <>Uhm, alguien está jugando con las variables 🧁</>
}


export default Panel