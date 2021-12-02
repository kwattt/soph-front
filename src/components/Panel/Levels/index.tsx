import Section, {SectionC} from "../Section"
import Shop from "./Shop"
import Niveles from "./Niveles"
import Top from "./Top"

const Levels = () => {
  return <Section>
    <SectionC>
      <Niveles/>
    </SectionC>
    <SectionC>
      <Top/>
    </SectionC>
    <SectionC>
      <Shop/>
    </SectionC>
    <SectionC>

    </SectionC>
  </Section>
}

export default Levels