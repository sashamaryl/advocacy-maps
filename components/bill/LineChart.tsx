import * as d3 from "d3"
import { capitalize } from "instantsearch.js/es/lib/utils"
import { useEffect, useMemo, useRef } from "react"
import rawdata from "./temp-chart-data.json"

type Stance = "endorse" | "neutral" | "oppose"
const stances: Stance[] = ["endorse", "neutral", "oppose"]

const height = 192,
  width = 607,
  margin = 32,
  frameHeight = 303

const top = margin,
  bottom = top + height,
  left = margin,
  right = left + width

type TestimonyData = {
  id: number
  stance: Stance
  date: Date
  stanceCounts: any
}

const colorDict: { [name: string]: string } = {
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

    return d3.scaleTime().domain(dateExtent).range([left, right])
  }, [data])

  const yScale = useMemo(() => {
    return d3.scaleLinear().domain([0, 60]).range([top, bottom].reverse())
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
      .attr("height", frameHeight)
      .attr("width", width + margin * 2)

    stances.forEach(stance => {
      const points = data.map(d => [
        xScale(d.date),
        yScale(d.stanceCounts[stance])
      ]) as [number, number][]

      svg
        .append("g")
        .append("path")
        .attr("d", line(points))
        .attr("fill", "none")
        .attr("stroke", d => colorDict[stance])
        .attr("stroke-width", 3)
    })

    const labelSection = svg
      .append("g")
      .append("foreignObject")
      .style("height", "30px")
      .style("width", "320px")
      .style("x", 320 / 2 + "px")
      .style("y", height + margin + 30 + "px")
      .style("transform", `translate(-50% 100% - 30px)`)
      .append("xhtml:div")
      .style("height", "100%")
      .style("width", "100%")

    const labelBox = labelSection
      .append("xhtml:div")
      .style("height", "30px")
      .style("width", "320px")

      .style("display", "flex")
      .style("flex-direction", "row")
      .style("justify-content", "space-around")

    const labelBoxes = labelBox
      .selectAll("div")
      .data(guideData)
      .enter()
      .append("div")
      .attr("class", "line-labels")
      .style("display", "flex")
      .style("align-items", "center")

    labelBoxes
      .append("text")
      .style("flex", "1")
      .style("font-size", 16 + "px")
      .style("font-weight", 500)
      .style("text-anchor", "middle")
      .text(d => `${capitalize(d[0])}`)
      .style("color", d => colorDict[d[0]])

    labelBoxes
      .append("text")
      .style("flex", "1")
      .style("font-size", 25 + "px")
      .style("font-weight", 500)
      .style("text-anchor", "middle")
      .text(d => ` ${d[1]}`)
      .style("color", "var(--bs-black)")
      .style("", "middle")

    svg.append("g").call(xAxis).attr("transform", `translate(0 ${bottom})`)
    svg.append("g").call(yAxis).attr("transform", `translate(${left} 0)`)
  }, [data, guideData, line, xAxis, xScale, yAxis, yScale])

  return <svg ref={ref}></svg>
}
