import React, { useState } from 'react'
import { useRouter } from 'next/router'
import useSWR from 'swr'

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { GetStaticProps, GetStaticPaths } from 'next'

import Order from '../../../model/sales/order'
import OrderItem from '../../../model/sales/orderItem'
import { CustomerOptions } from '../../../model/base/customer'

import moment from 'moment'

import Grid from '@material-ui/core/Grid'

import NumberFormat from 'react-number-format'

import Avatar from '@material-ui/core/Avatar'
import Autocomplete from '@material-ui/lab/Autocomplete'

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

import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import TabContext from '@material-ui/lab/TabContext'
import TabList from '@material-ui/lab/TabList'
import TabPanel from '@material-ui/lab/TabPanel'

import { red } from '@material-ui/core/colors'
import IconButton from '@material-ui/core/IconButton'
import AddCircle from '@material-ui/icons/AddCircle'
import { Checkbox } from '@material-ui/core'

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

interface ProductOptions {
  inputValue?: string
  code: string
  description: string
  price: number
}

interface ProjectOptions {
  inputValue?: string
  code: string
  description: string
}

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

export default function CreateOrder({ order }) {
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
  const [open, setOpen] = React.useState(false)
  const [itemCode, setItemCode] = useState('')
  const [itemDescription, setItemDescription] = useState('')
  const [itemProject, setItemProject] = useState('')
  const [itemUnity, setItemUnity] = useState('Un')
  const [itemQuantity, setItemQuantity] = useState(0)
  const [itemPrice, setItemPrice] = useState(0)
  const [itemTotal, setItemTotal] = useState(0)

  const [grossTotal, setGrossTotal] = useState(
    order.items.reduce((sum, current) => sum + current.grossTotal, 0)
  )
  const [vatTotal, setVatTotal] = useState(
    order.items.reduce((sum, current) => sum + current.vatTotal, 0)
  )
  const [total, setTotal] = useState(
    order.items.reduce((sum, current) => sum + current.total, 0)
  )
  const [value, setValue] = React.useState('1')
  // Top 100 films as rated by IMDb users. http://www.imdb.com/chart/top
  const productList: ProductOptions[] = [
    { code: 'A001', description: 'Teste', price: 1000 },
    { code: 'A002', description: 'Teste 2', price: 2000 }
  ]

  const projectList: ProjectOptions[] = [
    { code: 'P001', description: 'Teste' },
    { code: 'P002', description: 'Teste 2' }
  ]

  const customerList: CustomerOptions[] = [
    {
      code: 'C001',
      name: 'Vercel,LDA',
      vat: '411411',
      address: 'Beira'
    },
    {
      code: 'C002',
      name: 'Node.js, SA',
      vat: '411412',
      address: 'Maputo'
    }
  ]

  const peddingItens: OrderItem[] = order.items

  const handleSave = () => {
    // setOpen(true)
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
      <Paper square>
        <TabContext value={value}>
          <AppBar position="static">
            <TabList
              onChange={(event: any, newValue: string | null) => {
                setValue(newValue)
              }}
              aria-label="simple tabs example"
            >
              <Tab label="Document" value="1" />
              <Tab label="Resume" value="2" />
              <Tab label="Pedding" value="3" />
              <Tab label="Approval" value="4" />
              <Tab label="Invoices" value="5" />
              <Tab label="Other's" value="6" />
            </TabList>
          </AppBar>
          <TabPanel value="1">
            <Box>
              <Card>
                <CardHeader
                  avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                      P
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
                          <Autocomplete
                            id="customer_code"
                            options={customerList}
                            getOptionLabel={option => {
                              // Value selected with enter, right from the input
                              if (typeof option === 'string') {
                                return option
                              }
                              // Add "xxx" option created dynamically
                              if (option.inputValue) {
                                return option.inputValue
                              }
                              // Regular option
                              return option.name
                            }}
                            disabled={isSubmitting}
                            value={customer}
                            style={{ width: 300 }}
                            renderOption={option => option.code}
                            renderInput={params => (
                              <TextField
                                {...params}
                                label="Customer"
                                type="text"
                              />
                            )}
                            onChange={(
                              event: any,
                              newValue: CustomerOptions | null
                            ) => {
                              if (newValue!) {
                                setCustomer(newValue.code)
                                setName(newValue.name)
                                setVat(newValue.vat)
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
                            onChange={event => setDocument(event.target.value)}
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
                                <TableCell align="left">Description</TableCell>
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
                                  <TableCell align="left">{row.code}</TableCell>
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
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="Pedding Itens">
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {peddingItens?.map(row => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        <Checkbox
                          color="primary"
                          inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                      </TableCell>
                      <TableCell align="left">{row.code}</TableCell>
                      <TableCell align="left">{row.description}</TableCell>
                      <TableCell align="left">{row.project}</TableCell>
                      <TableCell align="left">{row.unity}</TableCell>
                      <TableCell align="right">{row.quantity}</TableCell>
                      <TableCell align="right">{row.price}</TableCell>
                      <TableCell align="right">{row.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>

          <TabPanel value="4">Item Three</TabPanel>
          <TabPanel value="5">Item Three</TabPanel>
          <TabPanel value="6">Item Three</TabPanel>
        </TabContext>
      </Paper>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Document Item</DialogTitle>
        <DialogContent>
          <DialogContentText>Add new Item.</DialogContentText>

          <Autocomplete
            id="product_code"
            options={productList}
            getOptionLabel={option => {
              // Value selected with enter, right from the input
              if (typeof option === 'string') {
                return option
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue
              }
              // Regular option
              return option.code
            }}
            value={itemCode}
            renderOption={option => option.code}
            renderInput={params => (
              <TextField {...params} label="Code" type="text" fullWidth />
            )}
            onChange={(event: any, newValue: ProductOptions | null) => {
              if (newValue!) {
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

          <Autocomplete
            id="itemProject"
            options={projectList}
            getOptionLabel={option => {
              // Value selected with enter, right from the input
              if (typeof option === 'string') {
                return option
              }
              // Add "xxx" option created dynamically
              if (option.inputValue) {
                return option.inputValue
              }
              // Regular option
              return option.code
            }}
            value={itemProject}
            renderOption={option => option.code}
            renderInput={params => (
              <TextField {...params} label="Project" type="text" fullWidth />
            )}
            onChange={(event: any, newValue: ProjectOptions | null) => {
              if (newValue!) {
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
  const url =
    process.env.NODE_ENV === 'development'
      ? process.env.SERVER_URI
      : process.env.VERCEL_URL

  console.log(process.env.SERVER_URI)
  const response = await fetch(url + '/api/order/')
  const data = await response.json()

  const paths = data?.map(order => {
    return { params: { id: order.ref['@ref'].id.toString() } }
  })

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps: GetStaticProps = async context => {
  try {
    const { id } = context.params

    const url =
      process.env.NODE_ENV === 'development'
        ? process.env.SERVER_URI
        : process.env.VERCEL_URL

    const response = await fetch(url + `/api/order/${id}`)
    const {
      code,
      customer,
      name,
      vat,
      status,
      total,
      OrderItems
    } = await response.json()

    const order: Order = {
      id: Number.parseInt(id.toString()),
      code,
      customer,
      name,
      vat,
      status,
      total,
      items: [...OrderItems]
    }

    return {
      props: {
        order: order
      },
      revalidate: 10
    }
  } catch (e) {
    return {
      props: {
        order: null
      },
      revalidate: 10
    }
  }
}
