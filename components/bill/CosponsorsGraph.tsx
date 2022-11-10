import * as d3 from "d3"

import sponsors from "../../analysis/data/sponsors-by-bill.json"
import { dimensions } from "analysis/components/GraphUtilities"
import { useEffect, useMemo, useRef } from "react"
import { axisTop } from "d3"

const top = 200
const bottom = 400
const left = 200
const right = 1200


export const CosponsorsGraph = () => {
  const ref = useRef(null)

  const useSponsors = sponsors.filter(s => s.Cosponsors.length > 50)

  const xScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, useSponsors.length])
      .range([left, right])
  }, [useSponsors.length])



  const yScale = useMemo(() => {
    return d3
      .scaleLinear()
      .domain([0, d3.max(useSponsors, d => d.Cosponsors.length)] as [
        number,
        number
      ])
      .range([bottom, top])
  }, [useSponsors])

  const xAxis = useMemo(() => {
    return d3.axisBottom(xScale)
  }, [xScale])

  const yAxis = useMemo(() => {
    return d3.axisLeft(yScale)
  }, [yScale])

  useEffect(() => {
    const svg = d3.select(ref.current)
    svg.attr("height", "100vh").attr("width", "100vw")

    svg
      .append("g")
      .selectAll("rect")
      .data(useSponsors)
      .enter()
      .append("rect")
      .attr("width", d => 20)
      .attr("x", (d, i) => xScale(i))
      .attr("height", d => yScale(d.Cosponsors.length))
      .attr(
        "y",
        d => yScale(d.Cosponsors.length)
      )
      .style("fill", "var(--bs-orange)")
      .style("stroke", "white")

    svg
      .append("g")
      .selectAll("text")
      .data(useSponsors)
      .join("text")
      .text(d => d.Cosponsors.length + ' ' + d.BillNumber)
      .attr("x", (d, i) => xScale(i))
      .attr(
        "y",
        d => yScale(d.Cosponsors.length) - 8
      )

    svg
      .append("g")
      .call(xAxis)
      .attr(
        "transform",
        `translate(0 ${bottom})`
      )
    svg
      .append("g")
      .call(yAxis)
      .attr("transform", `translate(${left} 0)`)
  }, [useSponsors, xAxis, xScale, yAxis, yScale])

  return <svg ref={ref}></svg>
}
