import React, { useState } from 'react'
import OrderItem from './../../model/sales/orderItem'

// Material UI
import Button from '@material-ui/core/Button'

import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import TextField from '@material-ui/core/TextField'
import { NumberFormatCustom } from './../NumberFormat/NumberFormatCustom'

type Props = {
  children?: React.ReactNode
  item?: OrderItem
  open: boolean
  selectedRow?: number
  handleClose?: any
  handlePeddingItemAdd?: any
}

export const DialogPedding = function DialogPedding(props: Props) {
  const { open, item, selectedRow, handlePeddingItemAdd, handleClose } = props

  if (!item) {
    return <></>
  }

  const [itemCode, setItemCode] = useState(item.code)
  const [itemDescription, setItemDescription] = useState(item.description)
  const [itemProject, setItemProject] = useState(item.project)
  const [itemUnity, setItemUnity] = useState('Un')
  const [itemQuantity, setItemQuantity] = useState(item.quantity)
  const [itemPrice, setItemPrice] = useState(item.price)
  const [grossTotal, setGrossTotal] = useState(item.grossTotal)
  const [vatTotal, setVatTotal] = useState(item.vatTotal)
  const [itemTotal, setItemTotal] = useState(item.total)

  function handleAdd() {
    const newItem: OrderItem = {
      id: 0,
      code: itemCode,
      description: itemDescription,
      project: itemProject,
      unity: itemUnity,
      quantity: itemQuantity,
      price: itemPrice,
      vatTotal: vatTotal,
      grossTotal: grossTotal,
      total: itemTotal
    }

    handlePeddingItemAdd(newItem)
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        Pedding Item - Line {selectedRow}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>Select Item To Transform.</DialogContentText>

        <TextField
          label="Product"
          id="product_code"
          value={itemCode}
          fullWidth
          disabled
        />

        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          type="text"
          value={itemDescription}
          onChange={event => setItemDescription(event.target.value)}
          fullWidth
          disabled
        />

        <TextField
          autoFocus
          margin="dense"
          id="itemProject"
          label="Project"
          type="text"
          value={itemProject}
          fullWidth
          disabled
        />

        <TextField
          autoFocus
          margin="dense"
          id="unity"
          label="Unity"
          type="text"
          value={itemUnity}
          onChange={event => setItemUnity(event.target.value)}
          fullWidth
          disabled
        />
        <TextField
          autoFocus
          margin="dense"
          id="quantity"
          label="Quantity"
          value={itemQuantity}
          onChange={event => {
            setItemQuantity(parseInt(event.target.value))
            setItemTotal(parseInt(event.target.value) * itemPrice)
          }}
          InputProps={{
            inputComponent: NumberFormatCustom as any
          }}
          fullWidth
        />
        <TextField
          label="Price"
          value={itemPrice}
          onChange={event => {
            setItemPrice(parseInt(event.target.value))
            setItemTotal(parseInt(event.target.value) * itemQuantity)
          }}
          name="price"
          id="price"
          InputProps={{
            inputComponent: NumberFormatCustom as any
          }}
          fullWidth
        />
        <TextField
          id="total"
          label="Total"
          InputLabelProps={{
            shrink: true
          }}
          value={itemTotal}
          onChange={event => setItemTotal(parseInt(event.target.value))}
          fullWidth
          InputProps={{
            inputComponent: NumberFormatCustom as any
          }}
          disabled
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleAdd} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}
