import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'

import useSWR from 'swr'

import { fade, createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import AppBar from '@material-ui/core/AppBar'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'

import { InputBase, Link, Toolbar, Typography } from '@material-ui/core'

import DetailsOutlined from '@material-ui/icons/DetailsOutlined'

// Icons
import AddCircle from '@material-ui/icons/AddCircle'
import Search from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import orderService from '../../service/sales/orderService'

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
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block'
      }
    },
    grow: {
      flexGrow: 1
    },
    menuButton: {
      marginRight: theme.spacing(2)
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25)
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto'
      }
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputRoot: {
      color: 'inherit'
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch'
      }
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex'
      }
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none'
      }
    }
  })
)

export default function OrderList({ allOrders }) {
  const router = useRouter()

  if (router.isFallback) {
    return <p>Carregando...</p>
  }

  const classes = useStyles()

  const [filterStr, setFilterStr] = useState('')

  const handleNewOrder = () => {
    router.push('/order/create')
  }

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 className="font-semibold text-base text-gray-800">
            Pedding Order's
          </h3>
          <div className={classes.searchIcon}>
            <Search />
          </div>
          <div className={classes.search}>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={filterStr}
              onChange={event => setFilterStr(event.target.value.toLowerCase())}
            />
          </div>
        </div>
        <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
          <IconButton
            aria-label="Create New Order"
            onClick={handleNewOrder}
            color="inherit"
          >
            <AddCircle />
          </IconButton>
        </div>
      </div>

      <div className="rounded-t mb-0 px-4 py-3 bg-transparent">
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">#</TableCell>
                  <TableCell align="left">Order</TableCell>
                  <TableCell align="left">Customer</TableCell>
                  <TableCell align="left">Name</TableCell>
                  <TableCell align="left">Total</TableCell>
                  <TableCell align="right">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allOrders
                  ?.filter(
                    e =>
                      filterStr.length === 0 ||
                      e.code?.toLowerCase().includes(filterStr) ||
                      e.customer?.toLowerCase().includes(filterStr) ||
                      e.name?.toLowerCase().includes(filterStr)
                  )
                  .map(row => (
                    <TableRow key={row.id}>
                      <TableCell align="left">
                        <Link href={`/order/${row.id}`}>
                          <DetailsOutlined />
                        </Link>
                      </TableCell>
                      <TableCell align="left">{row.code}</TableCell>
                      <TableCell align="left">{row.customer}</TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left">{row.total}</TableCell>
                      <TableCell align="right">{row.status}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </div>
    </div>
  )
}

export const getStaticProps = async () => {
  const allOrders = await orderService.get_Orders()

  return {
    props: {
      allOrders
    }
  }
}
