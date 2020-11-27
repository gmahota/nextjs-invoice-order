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

// Order
import Order from '../../model/sales/order'
import OrderItem from '../../model/sales/orderItem'
import OrderItemVariant from './../../model/sales/orderItemVariant'

// Icons
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
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
  order: Order
  row: OrderItem
  handleClickAddItem?: any
}
export const RowPedding = function RowPedding(props: OrderItemProps) {
  const { row, order, handleClickAddItem } = props
  const [openLine, setOpenLine] = React.useState(false)
  const classes = useStyles()

  const itemVariants: OrderItemVariant[] = order.items[row.id - 1]?.itemVarients

  const handleClickRemoveItem = (id: number) => {}

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
        <TableCell align="left">{row.description}</TableCell>
        <TableCell align="left">{row.project}</TableCell>
        <TableCell align="left">{row.unity}</TableCell>
        <TableCell align="right">{row.quantity}</TableCell>
        <TableCell align="right">{row.price}</TableCell>
        <TableCell align="right">{row.total}</TableCell>
        <TableCell align="right">
          <IconButton
            aria-label="Add Line To Invoice"
            onClick={() => {
              handleClickAddItem(row.id)
            }}
            color="inherit"
          >
            <ArrowForwardIosIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={openLine} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Project</TableCell>
                    <TableCell>Un</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell align="right">Amount</TableCell>
                    <TableCell align="right">Total Price (MT)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {itemVariants?.map(item => (
                    <TableRow key={item.id}>
                      <TableCell align="left">{row.code}</TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="left">{row.project}</TableCell>
                      <TableCell align="left">{row.unity}</TableCell>
                      <TableCell align="right">{item.quantity}</TableCell>
                      <TableCell align="right">{item.price}</TableCell>
                      <TableCell align="right">{item.total}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          aria-label="Remove Item"
                          onClick={() => {
                            handleClickRemoveItem(row.id)
                          }}
                          color="inherit"
                        >
                          <ArrowBackIosIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )
}
