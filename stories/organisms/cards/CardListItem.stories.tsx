import { ComponentStory } from "@storybook/react"
import { createMeta } from "stories/utils"
import { CardListItems, ListItem } from "components/Card"

export default createMeta({
  title: "Organisms/Cards/CardListItem",
  figmaUrl:
    "https://www.figma.com/file/3ifz37EOwDfmnEG8320KlD/CS1---MAPLE?node-id=119%3A2727",
  component: CardListItems
})

const Template: ComponentStory<typeof CardListItems> = ({ items, ...rest }) => {
  return <CardListItems items={items} {...rest}></CardListItems>
}

export const Primary = Template.bind({})
Primary.args = {
  items: [
    <ListItem
      key={1}
      billName="H.3330"
      billDescription="Important bill, must vote!"
      element={undefined}
    />
  ]
}

export const OnlyBillName = Template.bind({})
OnlyBillName.args = {
  items: [<ListItem key={1} billName="H.3330" />]
}

export const MultipleItems = Template.bind({})
MultipleItems.args = {
  items: [
    <ListItem
      key={1}
      billName="H.3330"
      billDescription="Important bill, must vote!"
    />,
    <ListItem
      key={2}
      billName="H.3330"
      billDescription="Important bill, must vote!"
    />,
    <ListItem
      key={3}
      billName="H.3330"
      billDescription="Important bill, must vote!"
    />
  ]
}
