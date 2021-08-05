import { Button } from '@material-ui/core'
import React from 'react'

export default function ButtonForm(props) {

    const {text, size ,color, variant, onClick} = props
    return (
        <Button 
        variant={variant}
        size={size}
        color={color}
        onClick={onClick}
        >
            {text}
        </Button>
    )
}
