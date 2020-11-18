import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'

import useSWR from 'swr'

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

const fetcher = url => fetch(url).then(r => r.json())

export default function OrderList() {
  const router = useRouter()

  if (router.isFallback) {
    return <p>Carregando...</p>
  }

  const { data, error } = useSWR('/api/order/', fetcher)

  const classes = useStyles()

  const [filterStr, setFilterStr] = useState('')

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
                {data
                  ?.filter(
                    e =>
                      filterStr.length === 0 ||
                      e.code.toLowerCase().includes(filterStr) ||
                      e.customer.toLowerCase().includes(filterStr) ||
                      e.name.toLowerCase().includes(filterStr)
                  )
                  .map(row => (
                    <TableRow key={row.ref['@ref'].id}>
                      <TableCell component="th" scope="row">
                        {row.data.id}
                      </TableCell>
                      <TableCell align="left">{row.data.code}</TableCell>
                      <TableCell align="left">{row.data.customer}</TableCell>
                      <TableCell align="left">{row.data.name}</TableCell>
                      <TableCell align="left">{row.data.total}</TableCell>
                      <TableCell align="right">{row.data.status}</TableCell>
                      <TableCell align="right">
                        <Link href={`/order/${row.ref['@ref'].id}`}>
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
