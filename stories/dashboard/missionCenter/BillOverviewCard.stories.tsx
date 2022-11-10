import { CosponsorsGraph } from "components/bill/CosponsorsGraph"
import { DonutChart } from "components/bill/DonutChart"
import { LineChart } from "components/bill/LineChart"
import { Template } from "runtypes/lib/types/template"
import { createMeta } from "stories/utils"
import { BillOverviewCard } from "../../../components/bill/BillOverviewCard"

export default createMeta({
  title: "Dashboard/Mission Center/BillOverviewCard",
  figmaUrl:
    "https://www.figma.com/file/3ifz37EOwDfmnEG8320KlD/CS1---MAPLE?node-id=307%3A12453",
  component: BillOverviewCard
})

export const Line = () => <LineChart />
export const Donut = () => <DonutChart />
export const Cosponsors = () => <CosponsorsGraph />