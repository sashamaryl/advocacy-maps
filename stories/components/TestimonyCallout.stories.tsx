import { ComponentStory } from "@storybook/react"
import { Callout } from "components/TestimonyCallout/TestimonyCallout"
import { createMeta } from "stories/utils"

export default createMeta({
  title: "Components/TestimonyCallout",
  component: Callout,
  decorators: [(Story) => (<div className="d-flex flex-column align-items-around m-5 p-5">
      <div className="col-8 m-1 p-1 bg-gray" id="hover-control">
        <Story />
      </div>

      <div className="col-4 m-1 p-1 bg-gray">
        <Story />
      </div>
    </div >
)]
})

const Template: ComponentStory<typeof Callout> = args => < Callout {...args} />




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
  consectetur`,
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