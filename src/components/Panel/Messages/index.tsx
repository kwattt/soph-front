import Oraculo from "./Oraculo"
import Section, {SectionC} from "../Section"
import Reminders from "./Reminders"

const Messages = () => {
  return <Section>
    <SectionC>
      <Oraculo />
    </SectionC>
    <SectionC>
      <Reminders />
    </SectionC>
  </Section>
}

export default Messages