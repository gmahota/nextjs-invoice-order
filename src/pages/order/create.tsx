import React, { useEffect, useState } from 'react'
import Router, { useRouter } from 'next/router'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import Order from '../../model/sales/order'
import OrderItem from '../../model/sales/orderItem'
import { Customer, CustomerOptions } from '../../model/base/customer'
import { Product, ProductOptions } from '../../model/base/product'
import { Project, ProjectOptions } from '../../model/base/project'
import { get_Customers } from '../../service/base/customerService'
import { get_Products } from '../../service/base/productService'
import { get_Projects } from '../../service/base/projectService'
import orderService from '../../service/sales/orderService'

import Moment from 'react-moment'
import moment from 'moment'

import Grid from '@material-ui/core/Grid'

import MaskedInput from 'react-text-mask'
import NumberFormat from 'react-number-format'

import Avatar from '@material-ui/core/Avatar'
import Box from '@material-ui/core/Box'

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
import Paper from '@material-ui/core/Paper'

import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

import { red } from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'
import AddCircle from '@material-ui/icons/AddCircle'
import Select from 'react-select'

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
interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}

function NumberFormatCustom(props: NumberFormatCustomProps) {
  const { inputRef, onChange, ...other } = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value
          }
        })
      }}
      thousandSeparator
      isNumericString
      // prefix="$"
    />
  )
}

export default function CreateOrder({
  id,
  allCustomers,
  allProducts,
  allProjects
}) {
  const router = useRouter()

  const classes = useStyles()

  const [title, setTitle] = useState('New Customer Order')
  const [date, setDate] = useState(moment().format('LLLL'))

  const [customer, setCustomer] = useState('')
  const [name, setName] = useState('')
  const [vat, setVat] = useState('')
  const [address, setAddress] = useState('')
  const [document, setDocument] = useState('')

  const [items, setItems] = useState<OrderItem[]>([])

  // New Item
  const [open, setOpen] = React.useState(false)
  const [itemCode, setItemCode] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [itemProject, setItemProject] = useState('')
  const [itemUnity, setItemUnity] = useState('Un')
  const [itemQuantity, setItemQuantity] = useState(0)
  const [itemPrice, setItemPrice] = useState(0)
  const [itemTotal, setItemTotal] = useState(0)

  const [grossTotal, setGrossTotal] = useState(0)
  const [vatTotal, setVatTotal] = useState(0)
  const [total, setTotal] = useState(0)
  const [customerList, setCustomerList] = useState<CustomerOptions[]>(
    allCustomers
  )

  const handleSave = async () => {
    // setOpen(true)

    try {
      const order: Order = {
        id: 0,
        code: document,
        customer: customer,
        name: name,
        vat: vat,
        status: 'open',
        total: total,
        items: items
      }
      orderService.create_Order(order)

      Router.push('/order')
    } catch (e) {
      console.log(e)
      alert('Error on create documento' + e)
    }
    // if (res?.status === 200) {
    //   Router.push('/order')
    // } else {
    //   throw new Error((await res?.text()) || 'error')
    // }
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

  const handleCancel = () => {
    router.push('/order')
  }

  const handleItemAdd = async () => {
    const vatT: number =
      Number.parseFloat(itemTotal.toString()) * Number.parseFloat('0.17')
    const tot: number = Number.parseFloat(itemTotal.toString()) + vatT

    const item: OrderItem = {
      id: items.length + 1,
      code: itemCode,
      description: itemDescription,
      project: itemProject,
      unity: itemUnity,
      quantity: itemQuantity,
      price: itemPrice,
      grossTotal: itemTotal,
      vatTotal: vatT,
      total: tot,
      status: 'pedding'
    }

    setGrossTotal(itemTotal)

    setVatTotal(vatT)

    setTotal(tot)

    const list = [...items]

    list.push(item)

    setItems(list)

    setOpen(false)
  }

  const handlerRemoveLine = async (id: number) => {
    const newItems = items.filter(item => item.id !== id)

    setItems(newItems)
  }

  return (
    <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              P
            </Avatar>
          }
          action={
            <IconButton aria-label="add" onClick={handleClickOpen}>
              <AddCircle />
            </IconButton>
          }
          title={title}
          subheader={date}
        />
        <CardContent>
          <form className={classes.root}>
            <div className="grid-rows-3 grid-flow-col">
              <div>
                <div>
                  <Select
                    id="customer_code"
                    options={allCustomers}
                    getOptionLabel={option => option.name}
                    style={{ width: 600 }}
                    onChange={(
                      event: any,
                      newValue: CustomerOptions | null
                    ) => {
                      if (!newValue) {
                        setCustomer(newValue.code)
                        setName(newValue.name || '')
                        setVat(newValue.vatNumber || '')
                        setAddress(newValue.address || '')
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
                  />
                </div>
              </div>

              <div>
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
                    onChange={event => setDocument(event.target.value)}
                  />
                </div>
              </div>

              <div>
                <TableContainer component={Paper}>
                  <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>#</TableCell>
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
                      {items.map(row => (
                        <TableRow key={row.id}>
                          <TableCell component="th" scope="row">
                            {row.id}
                          </TableCell>
                          <TableCell align="left">{row.code}</TableCell>
                          <TableCell align="left">{row.description}</TableCell>
                          <TableCell align="left">{row.project}</TableCell>
                          <TableCell align="left">{row.unity}</TableCell>
                          <TableCell align="right">{row.quantity}</TableCell>
                          <TableCell align="right">{row.price}</TableCell>
                          <TableCell align="right">{row.total}</TableCell>
                          <TableCell align="right">
                            <button
                              className="cursor-pointer text-black opacity-50 md:hidden px-3 py-1 text-xl leading-none bg-transparent rounded border border-solid border-transparent"
                              type="button"
                              onClick={() => handlerRemoveLine(row.id)}
                            >
                              <i className="fas fa-minus-circle"></i>
                            </button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>

              <div className="rounded-lg">
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
              </div>
            </div>
          </form>
        </CardContent>

        <CardActions disableSpacing>
          <Button variant="outlined" color="primary" onClick={handleSave}>
            Save
          </Button>

          <Button variant="outlined" color="primary" onClick={handleCancel}>
            Cancel
          </Button>
        </CardActions>

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
              renderOption={option => option.code}
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
      </Card>
    </div>
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
