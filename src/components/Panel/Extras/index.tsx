import Section, { SectionC } from "../Section"
import Autochannel from "./Autochannel"
import Birthday from "./Birthday"

const Extras = () => {
  return <Section>
    <SectionC>
      <Birthday/>
    </SectionC>
    <SectionC>
      <Autochannel/>
    </SectionC>
  </Section>
}

export default Extras