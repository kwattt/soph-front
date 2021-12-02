import Section, { SectionC } from "../Section"
import Autochannel from "./Autochannel"
import Birthday from "./Birthday"
import Purge from "./Purge"

const Extras = () => {
  return <Section>
    <SectionC>
      <Birthday/>
    </SectionC>
    <SectionC>
      <Autochannel/>
    </SectionC>
    <SectionC>
      <Purge/>
    </SectionC>
    <SectionC>
      
    </SectionC>
  </Section>
}

export default Extras