import { Meta, StoryObj } from "@storybook/react"
import { Layout } from "components/layout"
import { Providers } from "components/providers"
import { wrapper } from "components/store"
import { Provider as Redux } from "react-redux"

const meta: Meta = {
  title: "Pages/Layout",
  component: Layout,
  decorators: [
    (Story, ...rest) => {
      const { store, props } = wrapper.useWrappedStore(...rest)

      return (
        <Redux store={store}>
          <Providers>
            <Story />
          </Providers>
        </Redux>
      )
    }
  ]
}

export default meta

type Story = StoryObj<typeof Layout>

export const Primary: Story = {
  args: {
    children: (
      <div style={{ height: "150px", textAlign: "center" }}>
        site page material
      </div>
    ),
    title: "layout story"
  },
  name: "ProfileSettingsModal"
}
