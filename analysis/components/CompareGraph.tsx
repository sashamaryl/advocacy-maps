import React, { useEffect, useMemo, useRef } from "react"
import * as d3 from "d3"

import enactedVotes from "../data/enacted-votes.json"

type VotesType = {
  id: string
  branch: string
  date: Date
  type: string
  info: string
  yeas: string
  nays: string
}

const dimensions = {
  height: 600,
  width: 1600
}

const margins = 100

const compareDates = (aDate: Date, bDate: Date) => {
  return bDate > aDate ? 1 : -1
}

export const CompareGraph = () => {
  const ref = useRef(null)

  const data = useMemo(() => {
    const incomingVotes = Object.values(enactedVotes)
    const votes: VotesType[] = incomingVotes
      .filter(v => typeof v.yeas === "string" && typeof v.nays === "string")
      .map(v => {
        return {
          ...v,
          date: new Date(v.date) as Date,
          yeas: v.yeas as string,
          nays: v.nays as string
        }
      })

    return votes
  }, [])

  const line = d3.line()

  const yScale = d3
    .scaleLinear()
    .domain([0, 250])
    .range([dimensions.height - margins, margins])

  const xScale = d3
    .scaleTime()
    .domain([new Date(Date.parse("Jan, 1, 2021")), new Date()])
    .range([margins, dimensions.width - margins])

  const xAxis = d3.axisBottom(xScale).ticks(15, "%b '%y")
  const yAxis = d3.axisLeft(yScale).ticks(5)

  const yeaPointsHouse = data
    .filter(d => d.branch === "House")
    .sort((a, b) => compareDates(a.date, b.date))
    .map(d => [xScale(d.date), yScale(parseInt(d.yeas))] as [number, number])

  const nayPointsHouse = data
    .filter(d => d.branch === "House")
    .sort((a, b) => compareDates(a.date, b.date))
    .map(d => [xScale(d.date), yScale(parseInt(d.nays))] as [number, number])

  //NOTE: the senate has no recorded votes in this dataset

  const voteDatesSenate = data
    .filter(d => d.branch === "Senate")
    .sort((a, b) => compareDates(a.date, b.date))

  console.log(voteDatesSenate)

  const voteDatesHouse = data
    .filter(d => d.branch === "House")
    .sort((a, b) => compareDates(a.date, b.date))

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("height", dimensions.height + 2 * margins)
      .attr("width", dimensions.width + 2 * margins)

    const yeaLineHouse = svg
      .append("g")
      .append("path")
      .attr("d", line(yeaPointsHouse))
      .attr("stroke", "var(--bs-orange)")
      .attr("stroke-width", 4)
      .attr("fill", "transparent")

    const voteDatesDotsHouse = svg
      .append("g")
      .selectAll("circle")
      .data(voteDatesHouse)
      .enter()
      .append("circle")
      .attr("r", 4)
      .attr("cx", d => {
        const s = xScale(d.date)
        console.log(s)
        return s
      })
      .attr("cy", d => yScale(parseInt(d.yeas)))
      .attr("stroke", "var(--bs-orange)")
      .attr("stroke-width", 5)
      .attr("stroke-dasharray", "5 3")
      .attr("fill", "white")

    const nayLineHouse = svg
      .append("g")
      .append("path")
      .attr("d", line(nayPointsHouse))
      .attr("stroke", "var(--bs-blue)")
      .attr("stroke-width", 4)
      .attr("fill", "transparent")
      .attr("transform", `translate(0 ${margins})`)

    const senateVoteDates = svg
      .append("g")
      .selectAll("circle")
      .data(voteDatesSenate)
      .enter()
      .append("circle")
      .attr("r", 4)
      .attr("cx", d => {
        const s = xScale(d.date)
        console.log(s)
        return s
      })
      .attr("cy", yScale(100))
      .attr("stroke", "var(--bs-red)")
      .attr("stroke-width", 5)
      .attr("stroke-dasharray", "5 3")
      .attr("fill", "transparent")

    svg
      .append("g")
      .call(yAxis)
      .attr("font-size", "22")
      .attr("fill", "none")
      .attr("font-size", "16")
      .attr("color", "gray")
      .attr("transform", `translate(${margins} ${margins})`)

    svg
      .append("g")
      .call(xAxis)
      .attr("font-size", "22")
      .attr("fill", "none")
      .attr("font-size", "16")
      .attr("color", "gray")
      .attr("transform", `translate(0 ${dimensions.height})`)
  }, [
    data,
    line,
    nayPointsHouse,
    voteDatesHouse,
    voteDatesSenate,
    xAxis,
    xScale,
    yAxis,
    yScale,
    yeaPointsHouse
  ])

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
