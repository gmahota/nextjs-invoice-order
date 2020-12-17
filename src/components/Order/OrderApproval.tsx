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
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt'

// Order
import Order from './../../model/sales/order'
import OrderItem from './../../model/sales/orderItem'
import OrderItemVariant from './../../model/sales/orderItemVariant'
import {
  get_TotalApprovalItems,
  get_ApprovalItems,
  get_RowTotalPedding,
  get_RowTotalApproval,
  get_RowTotalInvoice
} from '../../service/sales/orderService'

import { red } from '@material-ui/core/colors'

import { RowApproval } from './../OrderRow/RowApproval'

// Icons
import SaveIcon from '@material-ui/icons/Save'

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

type OrderApprovalProps = {
  children?: React.ReactNode
  order: Order
  id?: string
}
export const OrderApproval = function OrderApproval(props: OrderApprovalProps) {
  const router = useRouter()

  const { order, id } = props

  const classes = useStyles()

  // Aproval
  const [approvalTotalAmount, setApprovalTotalAmount] = useState(
    get_TotalApprovalItems(order)
  )

  const approvalItens: OrderItem[] = get_ApprovalItems(order)
  // Approval Functions
  const handleClickApproveAll = () => {}

  const handleClickDeclineAll = () => {}

  const handleSave = async () => {
    console.log('Ola')
  }

  const handleClickApproveAllRowVarients = (rowNumber: number) => {}

  const handleClickDeclineAllRowVarients = (rowNumber: number) => {}

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            A
          </Avatar>
        }
        title="Approval Items"
        subheader="Select line Items to Approval"
      />
      <CardContent>
        <Grid item xs={12} className={classes.root}>
          <TextField
            autoFocus
            margin="dense"
            id="peddingTotal"
            label="Total Amount"
            value={approvalTotalAmount}
            disabled
            fullWidth
          />

          <IconButton
            aria-label="Approve All"
            onClick={() => {
              handleClickApproveAll()
            }}
            color="inherit"
          >
            <ThumbDownAltIcon />
          </IconButton>
          <IconButton
            aria-label="Decline All"
            onClick={() => {
              handleClickDeclineAll()
            }}
            color="inherit"
          >
            <ThumbUpIcon />
          </IconButton>
          <IconButton aria-label="add" onClick={handleSave} color="inherit">
            <SaveIcon />
          </IconButton>
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
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Order</TableCell>
                  <TableCell align="right">Total Pedding</TableCell>
                  <TableCell align="right">Total Approval</TableCell>
                  <TableCell align="right">Total Billed</TableCell>

                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {approvalItens?.map(row => (
                  <RowApproval key={row.id} row={row} order={order} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </CardContent>
    </Card>
  )
}
