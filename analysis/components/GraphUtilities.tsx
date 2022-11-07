import {
  AxesPropsType,
  Dimension,
  DrawLinePropsType,
  DrawPointsPropsType,
  HearingDatesType,
  XYDataType
} from "../graphtypes"

import * as d3 from "d3"
import { Timestamp } from "functions/src/firebase"
import { useEffect, useRef } from "react"

export const Axis = ({ scale, dimensions }: AxesPropsType) => {
  const ref = useRef(null)
  useEffect(() => {
    const xAxis = d3
      .axisBottom(scale.x)
      .ticks(60, "%Y %b")
      
    xAxis.tickSize(dimensions.margin-dimensions.height)
    
    const yAxis = d3.axisLeft(scale.y).tickSize(dimensions.margin-dimensions.width)

    const g = d3.select(ref.current)

    const xAxisGroup = g.append("g")
      .call(xAxis)
      .attr("fill", "none")
      .attr("font-size", "16")
      .attr("color", "gray")
      .attr("transform", `translate(0 ${dimensions.height})`)

    xAxisGroup.selectAll(".tick text").attr("text-align", "left").attr("transform", "rotate(90)")
    

    const yAxisGroup = g.append("g")
      .call(yAxis)
      .attr("fill", "none")
      .attr("font-size", "16")
      .attr("color", "gray")
      .attr("transform", `translate(${dimensions.margin} 0)`)

  }, [dimensions.height, dimensions.margin, dimensions.width, scale.x, scale.y])


  return <g ref={ref}></g>
}

export const getScale = (data: HearingDatesType[], dimensions: Dimension) => {
  const allDates = data
    .map(d => d["date"])
    .concat(data.map(d => d["scheduled_date"]))

  const xDomain = d3.extent(allDates) as [Date, Date]

  const xScale = d3
    .scaleTime()
    .domain(xDomain)
    .range([dimensions.margin, dimensions.width])

  const yScale = d3
    .scaleLinear()
    .domain([0, data.length])
    .range([dimensions.margin, dimensions.height as number])

  return {
    x: xScale,
    y: yScale
  }
}
export const stringToDate = (date: string) => {
  return new Date(Date.parse(date))
}
export const dimensions: Dimension = {
  height: 600,
  width: 1600,
  margin: 100
}

const setPoints = (
  datum: XYDataType<Date>,
  index: number,
  scale: any
): Iterable<[number, number]> => {
  const typedY = typeof datum.y === "number" ? datum.y : datum.y

  const point1 = [scale.x(datum.x), scale.y(index)]
  const point2 = [scale.x(typedY), scale.y(index)]
  return [point1, point2] as Iterable<[number, number]>
}

export const DrawPath = ({ data, scale, attrs }: DrawLinePropsType) => {
  const ref = useRef(null)

  useEffect(() => {
    const drawLine = d3.line()

    const g = d3.select(ref.current)
    g.selectAll("path")
      .data(data)
      .enter()
      .append("path")
      .attr("d", (d, i) => drawLine(setPoints(d, i, scale)))
      .attr("stroke", "var(--bs-orange)")
      .attr("stroke-width", 10)
  }, [data, scale])

  return <g ref={ref}></g>
}

export const DrawPoints = ({
  data,
  scale,
  shape,
  attrs
}: DrawPointsPropsType) => {
  const ref = useRef(null)

  useEffect(() => {
    const xCoord = shape == "circle" ? "cx" : "x"
    const yCoord = shape == "circle" ? "cy" : "y"

    const points = d3
      .select(ref.current)
      .append("g")
      .selectAll(shape)
      .data(data)
      .enter()
      .append(shape)
      .attr(xCoord, d => scale.x(d.x))
      .attr(yCoord, (d, i) => scale.y(i) + 2)

    if (attrs) {
      for (const e of Object.entries(attrs)) {
        const [k, v] = e
        points.attr(k, v)
      }
    }
    if (shape === "rect") {
      points.attr("transform", `translate(0 -10)`)
    }
  }, [attrs, data, scale, shape])

  return <g ref={ref}></g>
}
