import React, { useState } from 'react'
import Router, { useRouter } from 'next/router'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

// Material Ui
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import TextField from '@material-ui/core/TextField'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import TableHead from '@material-ui/core/TableHead'

import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

// Icons
import SaveIcon from '@material-ui/icons/Save'

// Order
import Order from './../../model/sales/order'
import OrderItem from './../../model/sales/orderItem'
import OrderItemVariant from './../../model/sales/orderItemVariant'
import {
  get_PeddingItems,
  set_OrderPeddingStatus
} from '../../service/sales/orderService'

import { red } from '@material-ui/core/colors'
import { RowPedding } from './../OrderRow/RowPedding'
import { DialogPedding } from './../Dialog/DialogPedding'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch'
      },
      '& > *': {
        borderBottom: 'unset'
      }
    },
    bullet: {
      display: 'inline-block',
      margin: '0 2px',
      transform: 'scale(0.8)'
    },
    title: {
      fontSize: 14
    },
    pos: {
      marginBottom: 12
    },
    menuButton: {
      marginRight: 2
    },
    form: {},
    formHeader: {
      display: 'flex',
      flex: '50%',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    formContent: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    table: {
      minWidth: 650
    },
    column: {
      float: 'left',
      width: '50%'
    },
    avatar: {
      backgroundColor: red[500]
    },
    inputArea: {},
    totalArea: {
      borderStyle: 'dashed',
      borderWidth: 1,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      border: 10,
      borderRadius: 10
    }
  })
)

type OrderPeddingProps = {
  children?: React.ReactNode
  order: Order
  id?: string
}
export const OrderPedding = function OrderPedding(props: OrderPeddingProps) {
  const router = useRouter()

  const { order, id } = props

  const classes = useStyles()
  // Pedding
  const [selectedRow, setSelectedRow] = useState(0)
  const [selectedItem, setSelectedItem] = useState<OrderItem>(null)
  const [totalAmount, setTotalAmount] = useState(0)
  const [openDialog, setOpenDialog] = useState(false)

  const peddingItens: OrderItem[] = get_PeddingItems(order)

  const handleCloseAddItem = () => {
    setOpenDialog(false)
  }

  const handlePeddingItemAdd = (item: OrderItem) => {
    if (!order.items[selectedRow - 1].itemVarients) {
      order.items[selectedRow - 1].itemVarients = []
    }

    const itemVarient: OrderItemVariant = {
      id: peddingItens[selectedRow - 1].itemVarients?.length + 1 || 1,
      quantity: item.quantity,
      price: item.price,
      grossTotal: item.grossTotal,
      vatTotal: item.vatTotal,
      total: item.total,
      status: 'approval'
    }

    order.items[selectedRow - 1].itemVarients.push(itemVarient)

    const total: number = order.items[selectedRow - 1].itemVarients.reduce(
      (sum, current) => sum + current.total,
      0
    )

    setTotalAmount(total)

    setOpenDialog(false)
  }

  const handlePeddingSave = async () => {
    set_OrderPeddingStatus(order)

    console.log(order)

    try {
      const res = await fetch(`/api/order/${id}/update`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
      })
      if (res.status === 200) {
        router.reload()
      } else {
        throw new Error(await res.text())
      }
    } catch (e: any) {
      console.error(e)
      // setErrorMessage(e.message)
    }
  }

  const handleClickAddItem = (id: number) => {
    const item = order.items.find(i => i.id === id)

    setSelectedItem(item)

    setSelectedRow(id)

    setOpenDialog(true)
  }

  return (
    <>
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              P
            </Avatar>
          }
          action={
            <IconButton aria-label="add" onClick={handlePeddingSave}>
              <SaveIcon />
            </IconButton>
          }
          title="Pedding Items"
          subheader="Select line Items to Approval"
        />
        <CardContent>
          <Grid item xs={12} className={classes.root}>
            <TextField
              autoFocus
              margin="dense"
              id="peddingTotal"
              label="Total Amount"
              value={totalAmount}
              disabled
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="Pedding Itens">
                <TableHead>
                  <TableRow>
                    <TableCell align="left"></TableCell>
                    <TableCell align="left">Item</TableCell>
                    <TableCell align="left">Description</TableCell>
                    <TableCell align="left">Project</TableCell>
                    <TableCell align="left">UN</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Price</TableCell>
                    <TableCell align="right">Total</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {peddingItens?.map(row => (
                    <RowPedding
                      key={row.id}
                      order={order}
                      row={row}
                      handleClickAddItem={handleClickAddItem}
                    />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </CardContent>
      </Card>
      <DialogPedding
        open={openDialog}
        item={selectedItem}
        selectedRow={selectedRow}
        handleClose={handleCloseAddItem}
        handlePeddingItemAdd={handlePeddingItemAdd}
      />
    </>
  )
}
