import React, { useState } from "react"
import { Button, Modal, Table } from "react-bootstrap"
import BillHistoryTable from "../BillHistoryTable/BillHistoryTable"

const BillHistory = ({ bill, billHistory }) => {
  const [showBillHistory, setShowBillHistory] = useState(false)

  const formatDate = (historydate) => {
    const date = new Date(historydate)
    return date.getDay()+ "." + date.getMonth()+ "." + date.getFullYear()
  }

  console.log(billHistory.map(h => `${h.Action} [${h.Branch} ${formatDate(h.Date)}] `))
  const handleShowBillHistory = () => setShowBillHistory(true)
  const handleCloseBillHistory = () => setShowBillHistory(false)
  return (
    <>
      <Button variant="primary" className="m-1" onClick={handleShowBillHistory}>
        History
      </Button>
      <Modal show={showBillHistory} onHide={handleCloseBillHistory} size="lg">
        <Modal.Header closeButton onClick={handleCloseBillHistory}>
          <Modal.Title>
            {bill ? bill.BillNumber + " - " + bill.Title : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BillHistoryTable billHistory={billHistory} />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default BillHistory
