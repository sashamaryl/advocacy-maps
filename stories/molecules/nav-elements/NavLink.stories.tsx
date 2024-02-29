import { Meta, StoryObj } from "@storybook/react"
import { NavLink } from "components/Navlink"


const meta: Meta = {
  title: "Molecules/Nav Elements/NavLink",
  component: NavLink
}

type Story = StoryObj<typeof NavLink>

export const Primary:Story = {
  args: {
    href: '#',
    handleClick: () => console.log('clicked'),
    children: 'NavLink'
  },
  name: "NavLink",
}

export default meta