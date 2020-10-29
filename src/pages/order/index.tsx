import React, { useEffect, useState } from 'react'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import InputAdornment from '@material-ui/core/InputAdornment'

import { Link } from '@material-ui/core'

import DetailsOutlined from '@material-ui/icons/DetailsOutlined'
import Search from '@material-ui/icons/Search'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch'
      }
    },
    table: {
      minWidth: 650
    }
  })
)

interface Order {
  id: number
  code: string
  customer: string
  name: string
  vat: string
  status: string
  total: number
  itens: Array<{
    id: number
    code: string
    description: string
    unity: string
    quantity: number
    price: number
    total: number
    project?: string
  }>
}

export default function OrderList() {
  const classes = useStyles()

  const [filterStr, setFilterStr] = useState('')

  const ordersList: Order[] = [
    {
      id: 1,
      code: 'PO 001/2020',
      customer: 'C001',
      name: 'Vercel',
      vat: '1111',
      status: 'Open',
      total: 20000,
      itens: [
        {
          id: 0,
          code: 'A001',
          description: 'ola',
          unity: 'UN',
          quantity: 10,
          price: 10,
          total: 100,
          project: 'P001',
          status: 'Open'
        }
      ]
    },
    {
      id: 2,
      code: 'PO 001/2020',
      customer: 'C002',
      name: 'React.js',
      vat: '1111',
      status: 'open',
      total: 10000,
      itens: []
    },
    {
      id: 3,
      code: 'PO 001/2020',
      customer: 'C003',
      name: 'Next.js',
      vat: '1111',
      status: 'close',
      total: 15000,
      itens: []
    }
  ]

  return (
    <Card>
      <Grid container>
        <Grid item xs={6}>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            }
            value={filterStr}
            onChange={event => setFilterStr(event.target.value.toLowerCase())}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell align="left">Order</TableCell>
                  <TableCell align="left">Customer</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Total</TableCell>
                  <TableCell align="right">Status</TableCell>
                  <TableCell align="right"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {ordersList
                  .filter(
                    e =>
                      filterStr.length === 0 ||
                      e.code.toLowerCase().includes(filterStr) ||
                      e.customer.toLowerCase().includes(filterStr) ||
                      e.name.toLowerCase().includes(filterStr)
                  )
                  .map(row => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="left">{row.code}</TableCell>
                      <TableCell align="left">{row.customer}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.total}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                      <TableCell align="right">
                        <Link href={`/order/${row.id}`}>
                          <DetailsOutlined />
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Card>
  )
}
