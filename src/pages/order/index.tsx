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

const fetcher = url => fetch(url).then(r => r.json())

export default function OrderList() {
  const router = useRouter()

  if (router.isFallback) {
    return <p>Carregando...</p>
  }

  const { data, error } = useSWR('/api/order/', fetcher)

  const classes = useStyles()

  const [filterStr, setFilterStr] = useState('')

  const handleNewOrder = () => {
    router.push('/order/create')
  }

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <Card>
        <AppBar position="static">
          <Toolbar>
            <Typography className={classes.title} variant="h6" noWrap>
              Order List
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <Search />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput
                }}
                inputProps={{ 'aria-label': 'search' }}
                value={filterStr}
                onChange={event =>
                  setFilterStr(event.target.value.toLowerCase())
                }
              />
            </div>
            <div className={classes.grow} />

            <div className={classes.sectionDesktop}>
              <IconButton
                aria-label="Create New Order"
                onClick={handleNewOrder}
                color="inherit"
              >
                <AddCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="Create New Order"
                onClick={handleNewOrder}
                color="inherit"
              >
                <AddCircle />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        <CardHeader></CardHeader>
        <Grid container>
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
                  {data
                    ?.filter(
                      e =>
                        filterStr.length === 0 ||
                        e.code?.toLowerCase().includes(filterStr) ||
                        e.customer?.toLowerCase().includes(filterStr) ||
                        e.name?.toLowerCase().includes(filterStr)
                    )
                    .map(row => (
                      <TableRow key={row.ref['@ref'].id}>
                        <TableCell align="left">
                          <Link href={`/order/${row.ref['@ref'].id}`}>
                            <DetailsOutlined />
                          </Link>
                        </TableCell>
                        <TableCell align="left">{row.data.code}</TableCell>
                        <TableCell align="left">{row.data.customer}</TableCell>
                        <TableCell align="left">{row.data.name}</TableCell>
                        <TableCell align="left">{row.data.total}</TableCell>
                        <TableCell align="right">{row.data.status}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}
