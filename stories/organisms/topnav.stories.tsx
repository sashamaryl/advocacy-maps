import { Meta, StoryObj } from "@storybook/react"
import { TopNav } from "components/layout"
import { Providers } from "components/providers"
import { wrapper } from "components/store"
import { Provider as Redux } from "react-redux"

const meta: Meta = {
  title: "Organisms/Top Nav",
  component: TopNav,
  decorators: [
    (Story, ...rest) => {
      const { store, props } = wrapper.useWrappedStore(...rest)

      return (
        <Redux store={store}>
          <Providers>
            <div className={"h-100 d-flex flex-column "}>
              <Story />
            </div>
          </Providers>
        </Redux>
      )
    }
  ]
}

export default meta

type Story = StoryObj<typeof TopNav>

export const Primary: Story = {
  args: {},
  name: "Top Nav"
}
