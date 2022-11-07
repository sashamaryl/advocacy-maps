import { Timestamp } from "firebase/firestore"

export type ActionType = "Hearing scheduled"
export type ForumType = "Virtual Hearing" | "Written Testimony Only"

export type DataHearingScheduledType = {
  id: string
  branch: string
  date: string
  type: string
  scheduled_date: string
  time: string
  forum: string
}

export type HearingDatesType = {
  id: string
  date: Date
  scheduled_date: Date
}

export type XYDataType<T> = {
  id: string
  x: T
  y: T | number
}

export type ArrayXYDataType<T> = {
  id: string
  x: T
  y: T | number
}[]

export type Dimension = {
  height: number
  width: number
  margin: number
}

export type SimpleGraphPropsType = {
  data: DataHearingScheduledType[]
  dimensions: Dimension
}
export type ScaleType = {
  x: d3.ScaleLinear<number, number, never> | d3.ScaleTime<number, number, never>
  y: d3.ScaleLinear<number, number, never>
}

export type AxesPropsType = {
  scale: {
    x: d3.ScaleTime<number, number, never> | d3.ScaleLinear<number, number, never>
    y: d3.ScaleLinear<number, number, never>
  }
  dimensions: Dimension
}

export type DrawPointsPropsType = {
  data: ArrayXYDataType<Date>
  scale: ScaleType
  shape: "circle" | "rect"
  attrs?: {
    [name: string]: string
  }
}
export type DrawLinePropsType = {
  data: ArrayXYDataType<Date>
  scale: ScaleType
  attrs?: {
    [name: string]: string
  }
}
