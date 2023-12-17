import { useResizeObserver } from "@react-aria/utils"
import { useTranslation } from "next-i18next"
import { ImageProps } from "next/image"
import { useRef, useState } from "react"
import { Col, Image, Row } from "react-bootstrap"
import styled from "styled-components"
import { Testimony } from "../db"
import { formatBillId } from "../formatting"
import * as links from "../links"

const handMap = new Map<Testimony["position"], string>()

handMap.set("endorse", "/thumbs-endorse.svg")
handMap.set("neutral", "/thumbs-neutral.svg")
handMap.set("oppose", "/thumbs-oppose.svg")

export const VoteHand = ({
  position,
  className,
  ...props
}: { position: Testimony["position"]; className: string } & Omit<
  ImageProps,
  "src"
>) => {
  const { t } = useTranslation("testimony")

  return (
    <Image
      className={`${className}`}
      alt={t("testimonyCallout.position", { position1: position }) ?? position}
      src={handMap.get(position)}
      {...props}
    />
  )
}

const CalloutBalloon = styled.div`
  margin: 0.5rem;
  color: white;
  inset: 0;
  display: flex;
  align-items: flex-end;
  pointer-events: visible;
`

const Balloon = styled.div`
  width: 100%;
  height: 8rem;
  border-radius: 10px 10px 10px 10px;
  display: flex;
  border-left: 1px solid inherit;
  align-items: flex-start;

  &.endorse {
    background-color: var(--bs-green);
  }

  &.neutral {
    background-color: var(--bs-blue);
  }

  &.oppose {
    background-color: var(--bs-red);
  }
`

export const Callout = ({
  position,
  content,
  billId,
  authorDisplayName
}: {
  content: string
  position: Testimony["position"]
  billId: string
  authorDisplayName: string
}) => {
  const { t } = useTranslation("testimony")

  const textRef = useRef<HTMLDivElement>(null)

  const [clippedLines, setClippedLines] = useState<string>("")

  useResizeObserver({
    ref: textRef,
    onResize: () => {
      setClippedLines(trimContentToElementSize(textRef.current, content))
    }
  })

  return (
    <CalloutBalloon className="" style={{ maxWidth: "540px" }}>
      {/* <div className={`callout-angle ${position}`}></div> */}
      <Balloon className={`${position} px-4 pt-3 pb-2`}>
        <Row className="h-100 d-flex justify-content">
          <Col className="h-100 flex-grow-0  d-flex align-items-center">
            <VoteHand position={position} className={"h-50 w-auto "} />
          </Col>
          <Col className="h-100  text-white d-flex flex-column justify-items-start fs-6 ">
            <Row
              className=" flex-fill"
              style={{ maxHeight: "5rem", overflow: "hidden" }}
            >
              <div className="w-100 h-100" ref={textRef}>
                {clippedLines}
              </div>
            </Row>
            <Row className="mt-auto text-nowrap d-flex align-items-end">
              <Col className="text-right">{`${t(
                "testimonyCallout.bill"
              )} ${formatBillId(billId)}`}</Col>
              <Col>
                <div className=" text-end">{authorDisplayName}</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Balloon>
    </CalloutBalloon>
  )
}

export function trimContentToElementSize(
  el: HTMLDivElement | null,
  content: string
) {
  if (!el) return ""
  const fontSize = parseFloat(getComputedStyle(el).fontSize)
  const lineHeight = parseFloat(getComputedStyle(el).lineHeight)
  const height = parseFloat(getComputedStyle(el).height)
  const width = parseFloat(getComputedStyle(el).width)

  const lines = height / lineHeight
  const lineCharacters = width / (fontSize * 0.9)

  const characters = Math.round(lines * lineCharacters)

  return trimContent(content, characters)
}

export function trimContent(content: string, length: number) {
  if (content.length >= length) {
    let cutLength = length
    while (content[cutLength - 1] !== " " && cutLength > 1) {
      cutLength--
    }
    return content.slice(0, cutLength - 1) + "..."
  }
  return content
}

export default function TestimonyCallout(props: Testimony) {
  const { billId, court } = props

  return (
    <links.Internal
      href={links.maple.bill({ id: billId, court })}
      className="text-decoration-none"
    >
      <Callout {...props}></Callout>
    </links.Internal>
  )
}
