import { createMeta } from "stories/utils"
import { ComponentStory } from "@storybook/react"
import { ProfilePage } from "components/ProfilePage"
import { wrapper } from "components/store"
import { Provider as Redux } from "react-redux"
import { Providers } from "components/providers"
import { signInUser1 } from "tests/integration/common"
import { ProfileAboutSection } from "components/ProfilePage/ProfileAboutSection"
import { Profile } from "components/db"

export default createMeta({
  title: "Profile/Pages/ProfileAboutSection",
  component: ProfileAboutSection,
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
  ],
  parameters: {
    backgrounds: { name: "medium", value: "#f4f4f4" }
  }
})

const Template: ComponentStory<typeof ProfileAboutSection> = args => (
  <ProfileAboutSection {...args} />
)

export const Primary = Template.bind({})

type ProfileAboutSectionProps = React.ComponentProps<typeof ProfileAboutSection>

Primary.args = {
  profile: {
    about: "This is a test about section"
  } as Profile,
  isOrg: false
} as ProfileAboutSectionProps

Primary.storyName = "ProfileAboutSection"
