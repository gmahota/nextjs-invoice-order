import React, { useState } from 'react'
import NumberFormat from 'react-number-format'

interface NumberFormatCustomProps {
  inputRef: (instance: NumberFormat | null) => void
  onChange: (event: { target: { name: string; value: string } }) => void
  name: string
}
export const NumberFormatCustom = function NumberFormatCustom(
  props: NumberFormatCustomProps
) {
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
