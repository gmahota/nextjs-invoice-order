import React, { useState } from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

// Material UI
import Box from '@material-ui/core/Box'

import Collapse from '@material-ui/core/Collapse'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'

// Invoice
import Invoice from '../../model/sales/invoice'
import InvoiceItem from '../../model/sales/invoiceItem'

// Icons
import ThumbUpIcon from '@material-ui/icons/ThumbUp'
import ThumbDownAltIcon from '@material-ui/icons/ThumbDownAlt'

import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown'
import IconButton from '@material-ui/core/IconButton'

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
    }
  })
)

type OrderItemProps = {
  children?: React.ReactNode
  row: Invoice
  handleClickApproveAllRowVarients?: any
  handleClickDeclineAllRowVarients?: any
  handleClickApproveAll?: any
  handleClickDeclineAll?: any
}

export const InvoiceRow = function InvoiceRow(props: OrderItemProps) {
  const {
    row,
    handleClickApproveAllRowVarients,
    handleClickDeclineAllRowVarients,
    handleClickApproveAll,
    handleClickDeclineAll
  } = props

  const [openLine, setOpenLine] = React.useState(false)
  const classes = useStyles()

  // const totalPedding: number = get_RowTotalPedding(order, row.id - 1)
  // const totalApproval: number = get_RowTotalApproval(order, row.id - 1)
  // const totalInvoice: number = get_RowTotalInvoice(order, row.id - 1)

  return (
    <React.Fragment>
      <TableRow key={row.id} className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpenLine(!openLine)}
          >
            {openLine ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row.code}</TableCell>
        <TableCell align="left">{row.customer}</TableCell>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="left">{row.total}</TableCell>
        <TableCell align="right">{row.status}</TableCell>

        {/* <TableCell align="right">{totalPedding}</TableCell>
        <TableCell align="right">{totalApproval}</TableCell>
        <TableCell align="right">{totalInvoice}</TableCell> */}

        <TableCell align="right">
          <IconButton aria-label="Add Line To Invoice" color="inherit">
            <ThumbDownAltIcon />
          </IconButton>
          <IconButton aria-label="Add Line To Invoice" color="inherit">
            <ThumbUpIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
