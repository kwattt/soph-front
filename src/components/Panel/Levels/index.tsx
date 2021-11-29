import Section, {SectionC} from "../Section"
import Shop from "./Shop"
import Niveles from "./Niveles"

const Levels = () => {
  return <Section>
    <SectionC>
      <Shop/>
    </SectionC>
    <SectionC>
      <Niveles/>
    </SectionC>
  </Section>
}

export default Levels