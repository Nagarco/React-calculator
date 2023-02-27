import React from 'react'

const ButtonDigit = (props) => {
    const {digit, dispatch} = props
    return (
        <button onClick={()=> dispatch({type: 'add-digit', payload: {digit}})}>
            {digit}
        </button>
    )
}

export default ButtonDigit