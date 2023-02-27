import React from 'react'

const ButtonOperation = (props) => {
    const {operation, dispatch} = props
    return (
        <button onClick={()=> dispatch({type: 'choose_operation', payload: {operation}})}>
            {operation}
        </button>
    )
}

export default ButtonOperation