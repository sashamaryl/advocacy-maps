import { ComponentStory } from "@storybook/react"
import { BaseButton, MapleButtonGroup } from "components/buttons"
import { ButtonGroupProps } from "react-bootstrap"
import { createMeta } from "stories/utils"

export default createMeta({
  title: "Components/Buttons/MapleButtonGroup",
  component: MapleButtonGroup
})

const Template: ComponentStory<typeof MapleButtonGroup> = ({ ...args }: ButtonGroupProps) => <MapleButtonGroup {...args} />

export const Primary = Template.bind({})




Primary.storyName = "Button Group"
Primary.args = {
  children: [
  <BaseButton key={1}>button</BaseButton>, 
  <BaseButton key={2}>button</BaseButton>, 
  <BaseButton key={3}>button</BaseButton>]
}