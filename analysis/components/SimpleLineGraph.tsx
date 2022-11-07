import * as d3 from "d3"
import { useEffect, useMemo, useRef } from "react"
import hearingScheduled from "../data/hearing_scheduled.json"
import { dimensions, stringToDate } from "./GraphUtilities"
import { DataHearingScheduledType } from "analysis/graphtypes"

export const SimpleLineGraph = () => {
  const ref = useRef(null)

  const data: DataHearingScheduledType[] = useMemo(() => {
    return hearingScheduled.slice(200, 220)
  }, [])

  console.log(data)

  const domainX = [0, data.length]
  const rangeX = [dimensions.margin, dimensions.width - dimensions.margin]

  const xScale = d3.scaleLinear().domain(domainX).range(rangeX)

  const sourceDate = data.map(o => new Date(Date.parse(o.date)))
  const hearingDate = data.map(o => new Date(Date.parse(o.scheduled_date)))

  const domainY = [d3.min(sourceDate), d3.max(hearingDate)]
  const rangeY = [dimensions.height - dimensions.margin, 0]

  const yScale = d3
    .scaleTime()
    .domain(domainY as Date[])
    .range(rangeY)

  const sourcePoints = data.map(
    (d, i) => [xScale(i), yScale(stringToDate(d.date))] as [number, number]
  )
  const hearingPoints = data.map(
    (d, i) =>
      [xScale(i), yScale(stringToDate(d.scheduled_date))] as [number, number]
  )

  const xAxis = d3.axisBottom(xScale).ticks(15)
  const yAxis = d3.axisLeft(yScale).ticks(5)

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("height", dimensions.height)
      .attr("width", dimensions.width)
      .attr("margin", dimensions.margin)
      .attr("transform", `translate(${dimensions.margin} ${dimensions.margin})`)

    const source = svg.append("g")
    const hearing = svg.append("g")
    const difference = svg.append("g")

    const line = d3.line()
    source
      .append("path")
      .attr("d", line(sourcePoints))
      .attr("fill", "none")
      .attr("stroke", "var(--bs-orange")
      .attr("stroke-width", 4)

    hearing
      .append("path")
      .attr("d", line(hearingPoints))
      .attr("fill", "none")
      .attr("stroke", "var(--bs-blue")
      .attr("stroke-width", 4)

    difference
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr(
        "height",
        d =>
          yScale(stringToDate(d.date)) - yScale(stringToDate(d.scheduled_date))
      )
      .attr("width", 10)
      .attr("x", (d, i) => xScale(i))
      .attr(
        "y",
        d =>
          dimensions.height -
          dimensions.margin -
          (yScale(stringToDate(d.date)) -
            yScale(stringToDate(d.scheduled_date)))
      )
      .attr("fill", "var(--bs-green")

    difference
      .append("g")
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .text(d => d.id)
      .attr("font-size", "22")
      .attr("fill", "var(--bs-green)")
      .attr("x", (d, i) => xScale(i))
      .attr(
        "y",
        d =>
          dimensions.height -
          dimensions.margin -
          (yScale(stringToDate(d.date)) -
            yScale(stringToDate(d.scheduled_date)))
      )

    const axisX = svg
      .append("g")
      .call(xAxis)
      .attr(
        "transform",
        `translate(0 ${dimensions.height - dimensions.margin})`
      )

    const axisY = svg.append("g").call(yAxis)

    axisX.attr("fill", "none").attr("font-size", "16").attr("color", "gray")

    axisY
      .attr("fill", "none")
      .attr("font-size", "16")
      .attr("color", "gray")
      .attr("transform", `translate(${dimensions.margin} 0)`)
  })

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        height: "100vh",
        width: "100vw"
      }}
    >
      <svg ref={ref}></svg>
    </div>
  )
}
