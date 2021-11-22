import Section, { SectionC } from "../Section"
import Facebook from "./Facebook"
import Twitch from "./Twitch"
import Twitter from "./Twitter"

const Socials = () => {
  return <Section>
    <SectionC>
      <Twitch/>
    </SectionC>
    <SectionC>
      <Twitter/>
    </SectionC>
    <SectionC>
      <Facebook/>
    </SectionC>
  </Section>
}

export default Socials