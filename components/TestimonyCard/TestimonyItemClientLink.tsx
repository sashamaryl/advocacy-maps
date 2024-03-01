
import styled from "styled-components"
import { Col, Row, Stack, Button, Spinner } from "../bootstrap"
import { Internal, maple } from "../links"

import styles from "./ViewTestimony.module.css"
import { usePathname } from "next/navigation"
import { useTranslation } from "react-i18next"
import { Testimony } from "components/db"
import { useRef } from "react"




const FooterButton = styled(Button)`
  margin: 0;
  padding: 0;
  text-decoration: none;
       `



export const TestimonyItemClientLink = ({ testimony }: { testimony: Testimony }) => {
  const { t } = useTranslation("testimony")
  const pathname = usePathname()

  const testimonyId = useRef(testimony.id)


  return (<FooterButton variant="link" className={`p-2 m-2 border border-2 5`}>
    <Internal
      className={styles.link}
      href={maple.testimony({ publishedId: testimonyId.current })}
    > {pathname}
      {/* {maple.testimony({publishedId: testimony.id})} */}
      {t("testimonyItem.moreDetails")}
    </Internal>
  </FooterButton>)
} 