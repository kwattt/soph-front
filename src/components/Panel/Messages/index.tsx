import Oraculo from "./Oraculo"
import Section, {SectionC} from "../Section"
import Reminders from "./Reminders"
import Welcome from "./Welcome"

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
  </Section>
}

export default Messages