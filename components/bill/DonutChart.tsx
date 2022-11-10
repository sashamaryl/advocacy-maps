import { dimensions } from "analysis/components/GraphUtilities"
import * as d3 from "d3"
import { PieArcDatum } from "d3"
import { useEffect, useRef } from "react"

type DonutData = {
  key: string
  value: number
}
type DonutDataProps = { data: DonutData[] }

const colorDict: { [name: string]: string } = {
  endorse: "var(--bs-orange)",
  neutral: "var(--bs-blue)",
  oppose: "var(--bs-green)"
}

export const DonutChart = () => {
  const ref = useRef(null)

  useEffect(() => {
    const data: DonutData[] = [
      { key: "endorse", value: 9 },
      { key: "neutral", value: 3 },
      { key: "oppose", value: 9 }
    ]

    const arcs = d3
      .pie<DonutData>()
      .sort(null)
      .value(d => d.value)(data)

    const arc = d3
      .arc<PieArcDatum<DonutData>>()
      .innerRadius(
        Math.min(
          dimensions.width - dimensions.margin,
          dimensions.height - dimensions.margin
        ) / 4
      )
      .outerRadius(
        Math.min(
          dimensions.width - dimensions.margin,
          dimensions.height - dimensions.margin
        ) /
          3 -
          dimensions.margin
      )

    const svg = d3.select(ref.current)

    svg
      .attr("height", dimensions.height)
      .attr("width", dimensions.width)
      .append("g")
      .attr("className", "donut")
      .selectAll("path")
      .data(arcs)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", d => colorDict[d.data.key])
      .attr(
        "transform",
        `translate(${dimensions.width / 2} ${dimensions.height / 2})`
      )

    svg
      .append("g")
      .append("text")
      .text("21")
      .attr("text-anchor", "middle")
      .attr("font-size", 49)
      .attr("font-family", "Nunito")
      .attr("x", dimensions.width / 2)
      .attr("y", dimensions.height / 2 + 24)
  }, [])
  return <svg ref={ref}></svg>
}
