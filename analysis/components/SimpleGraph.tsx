import * as d3 from "d3"
import { useEffect, useMemo, useRef } from "react"
import repRefData from "../data/reported-referred.json"
import { dimensions } from "./GraphUtilities"

const getIdDigits = (id: string) => {
  const regexec = /([HShs])(\d{1,4})/.exec(id)
  const letter: string | null = regexec && regexec[1]
  const digits: number | null = regexec && +regexec[2]
  return [letter, digits] as [string, number]
}

const SimpleGraph = () => {
  const ref = useRef(null)
  const data = useMemo(() => {
    return repRefData
  }, [])

  const [referrals, reports] = useMemo(() => {
    const reports = data
      .filter(d => d.type === "Reported")
      .map(d => {
        return { ...d, date: new Date(Date.parse(d.date)) }
      })
    const referrals = data
      .filter(d => d.type.includes("Referred"))
      .map(d => {
        return { ...d, date: new Date(Date.parse(d.date)) as Date }
      })
    return [referrals, reports]
  }, [data])

  const [billIdDomain, dateDomain, ids] = useMemo(() => {
    const dateDomain = d3.extent(
      data.map(d => new Date(Date.parse(d.date)))
    ) as [Date, Date]

    const ids = data
      .map(d => getIdDigits(d.id))
      .filter(d => d !== null)
      .sort((a, b) => {
        return b[1] - a[1]
      })

    const billIdDomain = d3.extent(ids.map(id => id[1])) as [number, number]

    return [billIdDomain, dateDomain, ids]
  }, [data])

  const xScale = d3
    .scaleTime()
    .domain(dateDomain.reverse())
    .range([dimensions.width, dimensions.margin])

  const yScale = d3
    .scaleLinear()
    .domain(billIdDomain.reverse())
    .range([dimensions.height as number, dimensions.margin])
    .nice()

  const xAxis = d3.axisBottom(xScale).ticks(40, "%b %Y")

  const yAxis = d3.axisLeft(yScale)

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr("x", 0)
      .attr("y", 0)
      .attr("height", dimensions.height + dimensions.margin)
      .attr("width", dimensions.width + dimensions.margin)

    svg
      .append("g")
      .selectAll("circle")
      .data(reports)
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("cx", (d, i) => xScale(d.date))
      .attr("cy", d => yScale(+d.id.slice(1, d.id.length)))
      .attr("stroke", d =>
        d.branch === "House" ? "var(--bs-orange)" : "var(--bs-blue)"
      )
      .attr("stroke-width", 2)
      .attr("fill", "none")

    svg
      .append("g")
      .selectAll("circle")
      .data(referrals)
      .enter()
      .append("circle")
      .attr("r", 2)
      .attr("cx", (d, i) => xScale(d.date))
      .attr("cy", d => yScale(+d.id.slice(1, d.id.length)))
      .attr("fill", d =>
        d.branch === "House" ? "var(--bs-orange)" : "var(--bs-blue)"
      )

    svg
      .append("g")
      .call(yAxis)
      .attr("fill", "none")
      .attr("font-size", "16")
      .attr("color", "gray")
      .attr("transform", `translate(${dimensions.margin} 0)`)

    svg
      .append("g")
      .call(xAxis)
      .attr("fill", "none")
      .attr("font-size", "16")
      .attr("color", "gray")
      .attr("transform", `translate(0 ${dimensions.height})`)
      .selectAll(".tick text")
      .attr("text-anchor", "start")
      .attr("tranform-origin", "0")
      .attr("transform", "rotate(90) translate(10 -20)")

    const legend = svg.append("g")
    legend
      .append("circle")
      .attr("fill", "var(--bs-orange")
      .attr("r", 4)
      .attr("cx", 130)
      .attr("cy", 130)
    legend
      .append("circle")
      .attr("fill", "var(--bs-blue")
      .attr("r", 4)
      .attr("cx", 130)
      .attr("cy", 150)
    legend
      .append("circle")
      .attr("fill", "var(--bs-gray)")
      .attr("r", 4)
      .attr("cx", 130)
      .attr("cy", 170)
    legend
      .append("circle")
      .attr("stroke", "var(--bs-gray")
      .attr("stroke-width", 2)
      .attr("fill", "none")
      .attr("r", 4)
      .attr("cx", 130)
      .attr("cy", 190)

    legend.append("text").text("House").attr("x", 150).attr("y", 135)
    legend.append("text").text("Senate").attr("x", 150).attr("y", 155)
    legend.append("text").text("Referred").attr("x", 150).attr("y", 175)
    legend.append("text").text("Reported").attr("x", 150).attr("y", 195)

    legend.attr("transform", `translate(800 300)`)
  }, [data, referrals, reports, xAxis, xScale, yAxis, yScale])

  return (
    <svg ref={ref}>
      <rect
        height={dimensions.height + dimensions.margin}
        width={dimensions.width + dimensions.margin}
        x={0}
        y={0}
        style={{ fill: "var(--bs-white)" }}
      />
    </svg>
  )
}

export { SimpleGraph }
