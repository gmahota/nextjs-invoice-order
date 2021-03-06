import React, { useState } from 'react'
import { useRouter } from 'next/router'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { GetStaticProps, GetStaticPaths } from 'next'

import Order from '../../../model/sales/order'
import OrderItem from '../../../model/sales/orderItem'

import { Customer, CustomerOptions } from '../../../model/base/customer'
import { Product, ProductOptions } from '../../../model/base/product'
import { Project, ProjectOptions } from '../../../model/base/project'
import { get_Customers } from '../../../service/base/customerService'
import { get_Products } from '../../../service/base/productService'
import { get_Projects } from '../../../service/base/projectService'

import moment from 'moment'

import Grid from '@material-ui/core/Grid'

import NumberFormat from 'react-number-format'

import Avatar from '@material-ui/core/Avatar'
import Autocomplete from '@material-ui/lab/Autocomplete'

import Box from '@material-ui/core/Box'

import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'

import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'

import Paper from '@material-ui/core/Paper'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import TabContext from '@material-ui/lab/TabContext'
import TabList from '@material-ui/lab/TabList'
import TabPanel from '@material-ui/lab/TabPanel'

import { red } from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'

import AddCircle from '@material-ui/icons/AddCircle'
import { OrderPedding } from './../../../components/Order/OrderPedding'
import { OrderApproval } from './../../../components/Order/OrderApproval'
import { InvoiceList } from './../../../components/Invoice/InvoiceList'
import orderService from '../../../service/sales/orderService'
import { NumberFormatCustom } from './../../../components/NumberFormat/NumberFormatCustom'
import Select from 'react-select'

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

export default function OrderDetails({
  order,
  allCustomers,
  allProducts,
  allProjects
}) {
  const router = useRouter()

  if (router.isFallback) {
    // your loading indicator
    return <div>loading...</div>
  }

  if (!order) {
    return <div>Carregando...</div>
  }

  const classes = useStyles()

  // Form
  const [id, setId] = useState(router.query.id)
  const [title, setTitle] = useState('Customer Order')
  const [date, setDate] = useState(moment().format('LLLL'))
  const [isSubmitting, setIsSubmitting] = useState(true)

  const [customer, setCustomer] = useState(order.customer)
  const [name, setName] = useState(order.name)
  const [vat, setVat] = useState(order.vat)
  const [address, setAddress] = useState(order.address)
  const [document, setDocument] = useState(order.code)

  const [itens, setItens] = useState<OrderItem[]>([])

  // New Item
  const [open, setOpen] = useState(false)
  const [itemCode, setItemCode] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [itemProject, setItemProject] = useState('')
  const [itemUnity, setItemUnity] = useState('Un')
  const [itemQuantity, setItemQuantity] = useState(0)
  const [itemPrice, setItemPrice] = useState(0)
  const [itemTotal, setItemTotal] = useState(0)

  const [grossTotal, setGrossTotal] = useState(
    order.items?.reduce((sum, current) => sum + current.grossTotal, 0)
  )
  const [vatTotal, setVatTotal] = useState(
    order.items?.reduce((sum, current) => sum + current.vatTotal, 0)
  )
  const [total, setTotal] = useState(
    order.items?.reduce((sum, current) => sum + current.total, 0)
  )
  const [value, setValue] = React.useState('1')

  const handleSave = () => {
    // setOpen(true)
  }

  const handleBack = () => {
    router.push('/order')
  }

  const handleClickOpen = () => {
    setItemCode('')
    setItemDescription('')
    setItemProject('')
    setItemUnity('Un')
    setItemQuantity(0)
    setItemPrice(0)
    setItemTotal(0)

    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleItemAdd = () => {
    const vatT: number =
      Number.parseFloat(itemTotal.toString()) * Number.parseFloat('0.17')
    const tot: number = Number.parseFloat(itemTotal.toString()) + vatT

    const item: OrderItem = {
      id: itens.length + 1,
      code: itemCode,
      description: itemDescription,
      project: itemProject,
      unity: itemUnity,
      quantity: itemQuantity,
      price: itemPrice,
      grossTotal: itemTotal,
      vatTotal: vatT,
      total: tot
    }

    setGrossTotal(itemTotal)

    setVatTotal(vatT)

    setTotal(tot)

    const list = [...itens]

    list.push(item)

    setItens(list)

    setOpen(false)
  }

  return (
    <>
      <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
        <Paper square className={classes.root}>
          <TabContext value={value}>
            <AppBar position="static">
              <TabList
                onChange={(event: any, newValue: string | null) => {
                  setValue(newValue)
                }}
                aria-label="simple tabs example"
              >
                <Tab label="Qoute" value="1" />
                <Tab label="Qoute Resume" value="2" />
                <Tab label="Pending Qoute" value="3" />
                <Tab label="Approval" value="4" />
                <Tab label="GR" value="5" />
                <Tab label="Invoices" value="6" />
                <Tab label="Other's" value="7" />
              </TabList>
            </AppBar>
            <TabPanel value="1">
              <Box>
                <Card>
                  <CardHeader
                    avatar={
                      <Avatar aria-label="recipe" className={classes.avatar}>
                        O
                      </Avatar>
                    }
                    action={
                      <IconButton
                        aria-label="add"
                        onClick={handleClickOpen}
                        disabled={isSubmitting}
                      >
                        <AddCircle />
                      </IconButton>
                    }
                    title={title}
                    subheader={date}
                  />
                  <CardContent>
                    <form className={classes.root}>
                      <Grid container>
                        <Grid item xs={8}>
                          <div>
                            <Select
                              id="customer_code"
                              options={allCustomers}
                              disabled={isSubmitting}
                              value={customer}
                              style={{ width: 300 }}
                              onChange={(
                                event: any,
                                newValue: CustomerOptions | null
                              ) => {
                                if (!newValue) {
                                  setCustomer(newValue.code)
                                  setName(newValue.name)
                                  setVat(newValue.vatNumber)
                                  setAddress(newValue.address)
                                  setDocument('')
                                } else {
                                  setCustomer('')
                                  setName('')
                                  setVat('')
                                  setAddress('')
                                  setDocument('')
                                }
                              }}
                            />

                            <TextField
                              label="Name"
                              type="text"
                              value={name}
                              autoFocus
                              margin="dense"
                              id="name"
                              multiline
                              rowsMax={4}
                              onChange={event => setName(event.target.value)}
                              disabled={isSubmitting}
                            />

                            <TextField
                              label="Nr. VAT"
                              type="text"
                              value={vat}
                              autoFocus
                              margin="dense"
                              id="vat"
                              multiline
                              rowsMax={4}
                              onChange={event => setVat(event.target.value)}
                              disabled={isSubmitting}
                            />
                          </div>
                          <div>
                            <TextField
                              label="Address"
                              type="text"
                              value={address}
                              autoFocus
                              margin="dense"
                              id="address"
                              multiline
                              rowsMax={4}
                              onChange={event => setAddress(event.target.value)}
                              disabled={isSubmitting}
                            />

                            <TextField
                              label="Document"
                              type="text"
                              value={document}
                              autoFocus
                              margin="dense"
                              id="document"
                              multiline
                              rowsMax={4}
                              onChange={event =>
                                setDocument(event.target.value)
                              }
                              disabled={isSubmitting}
                            />
                          </div>
                        </Grid>
                        <Grid item xs={4} className={classes.totalArea}>
                          <TextField
                            autoFocus
                            margin="dense"
                            id="grossTotal"
                            label="Gross Total"
                            value={grossTotal}
                            disabled
                            fullWidth
                          />

                          <TextField
                            autoFocus
                            margin="dense"
                            id="vatTotal"
                            label="Vat Total"
                            value={vatTotal}
                            disabled
                            fullWidth
                          />

                          <TextField
                            autoFocus
                            margin="dense"
                            id="Total"
                            label="Total"
                            value={total}
                            disabled
                            fullWidth
                          />
                        </Grid>

                        <Grid item xs={12}>
                          <TableContainer component={Paper}>
                            <Table
                              className={classes.table}
                              aria-label="simple table"
                            >
                              <TableHead>
                                <TableRow>
                                  <TableCell>#</TableCell>
                                  <TableCell align="left">Item</TableCell>
                                  <TableCell align="left">
                                    Description
                                  </TableCell>
                                  <TableCell align="left">Project</TableCell>
                                  <TableCell align="left">UN</TableCell>
                                  <TableCell align="right">Quantity</TableCell>
                                  <TableCell align="right">Price</TableCell>
                                  <TableCell align="right">Total</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {order.items?.map(row => (
                                  <TableRow key={row.id}>
                                    <TableCell component="th" scope="row">
                                      {row.id}
                                    </TableCell>
                                    <TableCell align="left">
                                      {row.code}
                                    </TableCell>
                                    <TableCell align="left">
                                      {row.description}
                                    </TableCell>
                                    <TableCell align="left">
                                      {row.project}
                                    </TableCell>
                                    <TableCell align="left">
                                      {row.unity}
                                    </TableCell>
                                    <TableCell align="right">
                                      {row.quantity}
                                    </TableCell>
                                    <TableCell align="right">
                                      {row.price}
                                    </TableCell>
                                    <TableCell align="right">
                                      {row.total}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </Grid>
                    </form>
                  </CardContent>

                  <CardActions disableSpacing>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleBack}
                    >
                      Voltar
                    </Button>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={handleSave}
                      disabled={isSubmitting}
                    >
                      Save
                    </Button>
                  </CardActions>
                </Card>
              </Box>
            </TabPanel>
            <TabPanel value="2">Item Three</TabPanel>
            <TabPanel value="3">
              <OrderPedding order={order} id={id.toString()} />
            </TabPanel>

            <TabPanel value="4">
              <OrderApproval order={order} id={id.toString()} />
            </TabPanel>
            <TabPanel value="5"></TabPanel>
            <TabPanel value="6">
              <InvoiceList order={order} id={id.toString()} />
            </TabPanel>
            <TabPanel value="7"></TabPanel>
          </TabContext>
        </Paper>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Document Item</DialogTitle>
        <DialogContent>
          <DialogContentText>Add new Item.</DialogContentText>

          <Select
            id="product_code"
            options={allProducts}
            value={itemCode}
            onChange={(event: any, newValue: ProductOptions | null) => {
              if (!newValue) {
                setItemCode(newValue.code)
                setItemDescription(newValue.description)
                setItemPrice(newValue.price)
              } else {
                setItemCode('')
                setItemDescription('')
                setItemPrice(0)
                setItemQuantity(0)
                setItemTotal(0)
              }
            }}
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
          />

          <Select
            id="itemProject"
            options={allProjects}
            value={itemProject}
            onChange={(event: any, newValue: ProjectOptions | null) => {
              if (!newValue) {
                setItemProject(newValue.code)
              } else {
                setItemProject('')
              }
            }}
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
          <Button onClick={handleItemAdd} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async req => {
  try {
    const url =
      process.env.NODE_ENV === 'development'
        ? process.env.SERVER_URI
        : `https://${process.env.VERCEL_URL}`

    const response = await fetch(url + '/api/order/')
    const data = await response.json()

    const paths = data?.map(order => {
      return { params: { id: order.ref['@ref'].id.toString() } }
    })

    return {
      paths,
      fallback: true
    }
  } catch (e) {
    console.log(e)

    return {
      paths: [],
      fallback: true
    }
  }
}

export const getStaticProps: GetStaticProps = async context => {
  try {
    const { id } = context.params

    const order: Order = await orderService.get_Order(id[0])

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
        order: order,
        allCustomers,
        allProducts,
        allProjects
      },
      revalidate: 10
    }
  } catch (e) {
    console.log(e)

    return {
      props: {
        order: null
      },
      revalidate: 10
    }
  }
}
