import { dimensions } from "analysis/components/GraphUtilities"
import * as d3 from "d3"
import { useEffect, useMemo, useRef } from "react"
import { string } from "yargs"
import rawdata from "./temp-chart-data.json"

type Stance = "endorse" | "neutral" | "oppose"
const stances: Stance[] = ["endorse", "neutral", "oppose"]

type TestimonyData = {
  id: number
  stance: Stance
  date: Date
  stanceCounts: any
}

const colorDict = {
  endorse: "var(--bs-orange)",
  neutral: "var(--bs-blue)",
  oppose: "var(--bs-green)"
}

export type LineChartPropsType<T> = {
  data?: T[]
  filter?: string
}

const dummydata: TestimonyData[] = Object.values(rawdata).map(d => {
  return {
    id: +d.id,
    stance: d.stance as Stance,
    date: new Date(d.date),
    stanceCounts: d.stanceCounts
  }
})

export const LineChart = ({
  data = dummydata,
  filter = "all"
}: LineChartPropsType<TestimonyData>) => {
  const ref = useRef(null)

  const xScale = useMemo(() => {
    const dates = data.map(d => d.date)
    const dateExtent = d3.extent(dates) as [Date, Date]

    return d3
      .scaleTime()
      .domain(dateExtent)
      .range([dimensions.margin, dimensions.width - dimensions.margin])
  }, [data])

  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, 60])
      .range(
        [dimensions.margin, dimensions.height - dimensions.margin].reverse()
      )
  }, [])

  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)
  const line = d3.line()

  const guideData = d3.rollup(
    data,
    v => d3.count(v, d => stances.findIndex(s => s === d.stance)),
    d => d.stance
  )

  console.log(guideData)

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("height", dimensions.height)
      .attr("width", dimensions.width)

    const oppLinePoints = data.map(d => [
      xScale(d.date),
      yScale(d.stanceCounts["oppose"])
    ]) as [number, number][]

    const neuLinePoints = data.map(d => [
      xScale(d.date),
      yScale(d.stanceCounts["neutral"])
    ]) as [number, number][]

    const endLinePoints = data.map(d => [
      xScale(d.date),
      yScale(d.stanceCounts["endorse"])
    ]) as [number, number][]

    svg
      .append("g")
      .append("path")
      .attr("d", line(oppLinePoints))
      .attr("fill", "none")
      .attr("stroke", d => colorDict["oppose"])
      .attr("stroke-width", 6)

    svg
      .append("g")
      .append("path")
      .attr("d", line(neuLinePoints))
      .attr("fill", "none")
      .attr("stroke", d => colorDict["neutral"])
      .attr("stroke-width", 6)

    svg
      .append("g")
      .append("path")
      .attr("d", line(endLinePoints))
      .attr("fill", "none")
      .attr("stroke", d => colorDict["endorse"])
      .attr("stroke-width", 6)

    const labelSection = svg
      .append("foreignObject")
      .attr("height", dimensions.height)
      .attr("width", dimensions.width)
      .append("xhtml:div")
      .attr("height", dimensions.height)
      .attr("width", dimensions.width)
      .style("y", dimensions.height - dimensions.margin)
      .style("display", "flex")
      .style("flex-direction", "row")
      .style("justify-content", "space-around")
      .style("border", "3px solid gold")

    labelSection
      .selectAll("div")
      .attr("class", "line-labels")
      .data(guideData)
      .enter()
      .append("div")
      .attr("background-color", "blue")
      .attr("flex", "1")
      .append("text")
      .text(d => `${d[0]} ${d[1]}`)
      .attr("color", "orange")

    svg
      .append("g")
      .call(xAxis)
      .attr(
        "transform",
        `translate(0 ${dimensions.height - dimensions.margin})`
      )
    svg
      .append("g")
      .call(yAxis)
      .attr("transform", `translate(${dimensions.margin} 0)`)
  }, [data, guideData, line, xAxis, xScale, yAxis, yScale])

  return <svg ref={ref}></svg>
}
