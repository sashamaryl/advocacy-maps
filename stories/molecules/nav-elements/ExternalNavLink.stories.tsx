
import { Meta, StoryObj } from "@storybook/react"
import { ExternalNavLink } from "components/Navlink"


const meta: Meta = {
  title: "Molecules/Nav Elements/ExternalNavLink",
  component:ExternalNavLink
}

type Story = StoryObj<typeof ExternalNavLink>

export const Primary: Story = {
  args: {
    href: '#',
    children: 'ExternalNavLink'
  },
  name: "ExternalNavLink",
}

export default meta