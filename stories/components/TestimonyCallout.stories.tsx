import { ComponentStory } from "@storybook/react"
import { Callout } from "components/TestimonyCallout/TestimonyCallout"
import { ComponentProps } from "react"
import { Col, Row } from "react-bootstrap"
import { createMeta } from "stories/utils"

export default createMeta({
  title: "Components/TestimonyCallout",
  component: Callout,
})



const Template: ComponentStory<typeof Callout> = (args: CalloutProps) => <Callout {...args} />

type CalloutProps = ComponentProps<typeof Callout>


export const Primary = Template.bind({})
Primary.args = {
  position: "neutral",
  content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi vitae nis
  consectetur adipiscing elit. Sed vitae nisi vitae nis`,
  billId: "HB1234",
  authorDisplayName: "Jermey Doehicky"
}

export const Secondary = Template.bind({})
Secondary.args = {
  position: "endorse",
  content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi vitae nis
  consectetur adipiscing elit. Sed vitae nisi vitae nis`,
  billId: "HB1234",
  authorDisplayName: "John Doejeojeojoe"
}

export const Third = Template.bind({})
Third.args = {
  position: "oppose",
  content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae nisi vitae nis
  consectetur`,
  billId: "HB1234",
  authorDisplayName: "John Doejeojeojoe"
}

export const Page = () => (

  <Row className="w-100 h-100">
    <Primary {...Primary.args as CalloutProps} />
    <Secondary {...Secondary.args as CalloutProps} />
    <Callout {...Third.args as CalloutProps} />
    <Callout {...Secondary.args as CalloutProps} />
  </Row >
)
