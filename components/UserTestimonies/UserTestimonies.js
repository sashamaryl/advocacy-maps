import Link from "next/link"
import React from "react"
import { Container, Table } from "react-bootstrap"
import { useAuth } from "../../components/auth"
import { formatBillId } from "../../components/formatting"
import { useBill, usePublishedTestimonyListing2 } from "../db"
import DeleteTestimony from "../DeleteTestimony/DeleteTestimony"
import EditTestimony from "../EditTestimony/EditTestimony"
import ExpandTestimony from "../ExpandTestimony/ExpandTestimony"

const TestimonyRow = ({ testimony }) => {
  const { result: bill } = useBill(testimony.billId)
  const { user } = useAuth()
  const userIsAuthor = user?.uid == testimony?.authorUid

  if (!bill) {
    return null
  } else {
    return (
      <tr>
        <td>{testimony.position}</td>
        <td>
          <Link href={`/bill?id=${testimony.billId}`}>
            {formatBillId(testimony.billId)}
          </Link>
        </td>
        <td>{testimony.publishedAt.toDate().toLocaleDateString()}</td>
        <td>{testimony.content.substring(0, 100)}...</td>
        <td>
          <div className="d-flex">
            <ExpandTestimony bill={bill.content} testimony={testimony} />
            &nbsp;
            {userIsAuthor && (
              <EditTestimony
                className="ml-2"
                bill={bill.content}
                testimony={testimony}
              />
            )}
            &nbsp;
            {userIsAuthor && (
              <DeleteTestimony bill={bill.content} testimony={testimony} />
            )}
          </div>
        </td>
      </tr>
    )
  }
}

const UserTestimonies = ({ authorId }) => {
  const { items: testimoniesResponse } = usePublishedTestimonyListing2({
    uid: authorId
  })
  const testimonies =
    testimoniesResponse.status == "loading" ||
    testimoniesResponse.status == "error"
      ? []
      : testimoniesResponse.result
  const testimoniesComponent = !testimonies
    ? ""
    : testimonies.map((testimony, index) => {
        return <TestimonyRow testimony={testimony} key={index} />
      })

  return (
    <Container>
      <h1>Testimonies </h1>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>Position</th>
            <th>Bill #</th>
            <th>Date Submitted</th>
            <th>Text</th>
          </tr>
        </thead>
        <tbody>{testimoniesComponent}</tbody>
      </Table>
    </Container>
  )
}

export default UserTestimonies
