import Oraculo from "./Oraculo"
import Section, {SectionC} from "../Section"
import Reminders from "./Reminders"
import Welcome from "./Welcome"
import Stalk from "./Stalk"

const Messages = () => {
  return <Section>
    <SectionC>
      <Oraculo />
    </SectionC>
    <SectionC>
      <Reminders />
    </SectionC>
    <SectionC>
      <Welcome />
    </SectionC>
    <SectionC>
      <Stalk />
    </SectionC>
  </Section>
}

export default Messages