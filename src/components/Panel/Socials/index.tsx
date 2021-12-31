import Section, { SectionC } from "../Section"
//import Facebook from "./Facebook"
import Twitch from "./Twitch"
import Twitter from "./Twitter"
import YoutubeC from "./Youtube"

const Socials = () => {
  return <Section>
    <SectionC>
      <Twitch/>
    </SectionC>
    <SectionC>
      <Twitter/>
    </SectionC>
    <SectionC>
      <YoutubeC/>
    </SectionC>
    <SectionC>
    </SectionC>
  </Section>
}

/*
    <SectionC>
      <Facebook/>
    </SectionC> /

*/

export default Socials