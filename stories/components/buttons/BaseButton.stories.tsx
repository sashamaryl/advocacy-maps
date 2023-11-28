import { ComponentStory } from "@storybook/react"
import { createMeta } from "stories/utils"
import { BaseButton } from "../../../components/buttons"



export default createMeta({
  title: "Components/Buttons/BaseButton",
  component: BaseButton
})

const Template: ComponentStory<typeof BaseButton> = ({
  children, ...args
}) => {
  return <BaseButton {...args}>{children}</BaseButton>
}
Template.decorators = [Story => <div className={`w-100 d-flex`}><Story /></div>]


const variants = ['primary', 'secondary', 'Link', 'warning', 'light', 'dark', 'success']

export const Primary = Template.bind({})

Primary.args = {
  label: "Label",
  className: "",
  variant: "primary"
}
Primary.storyName = "plain"



/* We should pull the icon from the icon folder once they are loaded. Inline svgs should be replaced with reusable icon svg files/components.  */
const GearIcon = () => {
  return <svg
    xmlns="http://www.w3.org/2000/svg"
    width="36"
    height="36"
    fill="transparent"
    className={``}
    viewBox="-2 -2 20 20" // negative values prevent the stroke from being clipped
  >
    <path stroke="currentColor" strokeWidth="1.5px" d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z" />
  </svg>
}


export const WithGear = Template.bind({})
WithGear.args = {
  label: "Label",
  className: "",
  variant: "warning",
  icon: <GearIcon />
}

WithGear.storyName = "with icon"


export const showBoth = () => <div className="d-flex flex-column align-items-start gap-1">
  <Primary {...Primary.args} />
  <WithGear {...WithGear.args} iconPosition={'Left'} />
  <WithGear {...WithGear.args} iconPosition={'Right'} variant="secondary" />
  <Primary {...Primary.args} variant="warning" label="a longer label for a longer button" />
</div>