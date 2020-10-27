import React from 'react'
import { useRouter } from 'next/router'

import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    minWidth: 275
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
  form: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center'
  }
})

export default function Order({ id }) {
  const classes = useStyles()

  return (
    <form className={classes.form}>
      <label>
        Customer:
        <input type="text" name="customer" />
      </label>
      <label>
        Name
        <input type="text" name="name" />
      </label>
      <label>
        VAT
        <input type="text" name="vat" />
      </label>
      <label>
        Address <input type="TextArea" name="address" />
      </label>
      <label>
        Document <input type="text" name="document" />
      </label>

      <table></table>
      <input type="submit" value="Submit" />
    </form>
  )
}
