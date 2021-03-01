import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import useSWR from 'swr'

import { Customer, CustomerOptions } from '../../model/base/customer'
import { Product, ProductOptions } from '../../model/base/product'
import { Project, ProjectOptions } from '../../model/base/project'
import { get_Customers } from '../../service/base/customerService'
import { get_Products } from '../../service/base/productService'
import { get_Projects } from '../../service/base/projectService'

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

import { red } from '@material-ui/core/colors'
import { AppBarHeader } from '../../components/AppBarHeader/AppBarHeader'

import {
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  Link,
  Toolbar,
  Typography
} from '@material-ui/core'

import DetailsOutlined from '@material-ui/icons/DetailsOutlined'
import DialogTitle from '@material-ui/core/DialogTitle'
import Autocomplete from '@material-ui/lab/Autocomplete'

import DialogActions from '@material-ui/core/DialogActions'
import CustomerDocument from '../../model/sales/customerDocument'
import Select from 'react-select'

const fetcher = url => fetch(url).then(r => r.json())

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch'
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

type DocumentItemProps = {
  children?: React.ReactNode
  allCustomers: CustomerOptions[]
  open: boolean
  handleClose?: any
  handleSave?: any
}

function NewDocument(props: DocumentItemProps) {
  const { open, handleClose, handleSave, allCustomers } = props

  const [code, setCode] = React.useState('')
  const [customer, setCustomer] = React.useState('')
  const [name, setName] = React.useState('')
  const [total, setTotal] = React.useState(0)

  const handleClickSave = async () => {
    const document: CustomerDocument = {
      id: 0,
      code: code,
      customer: customer,
      total: total,
      status: 'open'
    }

    try {
      const res = await fetch('/api/sales/document/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(document)
      })
      if (res.status === 200) {
        handleSave()
      } else {
        throw new Error(await res.text())
      }
    } catch (e: any) {
      console.error(e)
    }
  }

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">New Document</DialogTitle>
      <DialogContent>
        <DialogContentText>Add new Item.</DialogContentText>

        <TextField
          autoFocus
          margin="dense"
          id="description"
          label="Description"
          type="text"
          value={code}
          onChange={event => setCode(event.target.value)}
          fullWidth
        />

        <Select
          id="customer"
          options={allCustomers}
          value={customer}
          onChange={(event: any, newValue: CustomerOptions | null) => {
            if (!newValue) {
              setCustomer(newValue.code)
            } else {
              setCustomer('')
            }
          }}
        />

        <TextField
          autoFocus
          margin="dense"
          id="total"
          label="Unity"
          type="text"
          value={total}
          onChange={event => setTotal(parseInt(event.target.value))}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleClickSave} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default function InvoiceOrderList(
  allCustomers,
  allProducts,
  allProjects
) {
  const router = useRouter()

  if (router.isFallback) {
    return <p>Carregando...</p>
  }

  const { data, error } = useSWR('/api/sales/document/', fetcher)

  const classes = useStyles()

  const [filterStr, setFilterStr] = useState('')
  const [openNewDocument, setOpenNewDocument] = useState(false)

  const handleClickNewDocument = () => {
    setOpenNewDocument(true)
  }

  const handleClose = () => {
    setOpenNewDocument(false)
  }

  const handleSave = () => {
    setOpenNewDocument(false)
  }

  return (
    <>
      <Card>
        <AppBarHeader
          title="PO List"
          handleNew={handleClickNewDocument}
        ></AppBarHeader>

        <Grid container>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">#</TableCell>
                    <TableCell align="left">Document</TableCell>
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

      <NewDocument
        open={openNewDocument}
        handleClose={handleClose}
        handleSave={handleSave}
        allCustomers={allCustomers}
      />
    </>
  )
}

export const getStaticProps = async () => {
  const customers: Customer[] = await get_Customers()

  const allCustomers = customers.map(customer => {
    const c: CustomerOptions = {
      ...customer
    }
    return c
  })

  const products = await get_Products()

  const allProducts = products.map(product => {
    const p: ProductOptions = {
      ...product
    }
    return p
  })

  const projects = await get_Projects()

  const allProjects = projects.map(project => {
    const p: ProjectOptions = {
      ...project
    }
    return p
  })

  return {
    props: {
      allCustomers,
      allProducts,
      allProjects
    }
  }
}
