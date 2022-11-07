import { ComponentStory } from "@storybook/react"
import React from "react"
import { createMeta } from "stories/utils"
import {
  DataHearingScheduledType,
  Dimension,
  SimpleGraphPropsType
} from "../../analysis/graphtypes"
import { SimpleGraph } from "../../analysis/components/SimpleGraph"
import { SimpleLineGraph } from "../../analysis/components/SimpleLineGraph"
import hearingScheduled from "../../analysis/data/hearing_scheduled.json"
import { CompareGraph } from "../../analysis/components/CompareGraph"

export default createMeta({
  title: "Analysis/SimpleGraph",
  figmaUrl: undefined,
  component: SimpleLineGraph
})

const Template: ComponentStory<typeof SimpleGraph> = () => {
  return <SimpleGraph />
}

export const Primary = Template.bind({})

const TemplateLine: ComponentStory<typeof SimpleLineGraph> = () => {
  return <SimpleLineGraph />
}

export const Secondary = TemplateLine.bind({})


const TemplateCompare: ComponentStory<typeof CompareGraph> = () => {
  return <CompareGraph />
}

export const Third = TemplateCompare.bind({})