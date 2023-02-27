import logo from './logo.svg';
import './App.css';
import './styles.css'
import Buttons from './components/Buttons';
import Output from './components/Output';
import { useReducer } from 'react';
import ButtonDigit from './components/ButtonDigit';
import ButtonOperation from './components/ButtonOperation';

const initialState = {};

const reducer = (state, action) => {
  switch (action.type) {
    case 'add-digit':

      if (state.overwrite) {
        return {
          ...state,
          currentOperand: action.payload.digit,
          overwrite: false
        }
      }
      else if (action.payload.digit === '0' && state.currentOperand === '0') {
        return state;
      }

      else if (action.payload.digit === '.' && state.currentOperand == null) {
        return {
          ...state, currentOperand: `${state.currentOperand || ""}${action.payload.digit}`
        };
      }

      else if (action.payload.digit === '.' && state.currentOperand.includes('.')) {
        return state;
      }

      else {
        return {
          ...state, currentOperand: `${state.currentOperand || ""}${action.payload.digit}`
        };
      }



    case 'choose_operation':
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }

      else if (state.previousOperand == null) {
        return {
          ...state,
          operation: action.payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null
        }
      }

      else if (state.currentOperand == null) {
        return {
          ...state,
          operation: action.payload.operation
        }
      }

      else {
        return {
          ...state,
          operation: action.payload.operation,
          previousOperand: evaluate(state),
          currentOperand: null
        }
      }

    case 'clear':
      return {};


    case 'evaluate':
      if (state.currentOperand == null || state.operation == null || state.previousOperand == null) {
        return state;
      }

      else {
        return {
          ...state,
          overwrite: true,
          operation: null,
          previousOperand: null,
          currentOperand: evaluate(state)
        }
      }

    case 'delete-digit':
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null
        }
      }

      else if (state.currentOperand == null) {
        return state;
      }

      else if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null
        }
      }

      else {
        return {
          ...state,
          currentOperand: state.currentOperand.slice(0, -1)
        }
      }


  }


}

function evaluate({ currentOperand, previousOperand, operation }) {
  let result = 0;
  switch (operation) {
    case "+":
      result = Number(previousOperand) + Number(currentOperand);
      console.log(previousOperand)
      console.log(operation)
      console.log(currentOperand)
      break;

    case "-":
      result = Number(previousOperand) - Number(currentOperand);
      console.log(previousOperand)
      console.log(currentOperand)
      break;

    case "*":
      result = Number(previousOperand) * Number(currentOperand);
      console.log(previousOperand)
      console.log(currentOperand)
      break;

    case "/":
      result = Number(previousOperand) / Number(currentOperand);
      console.log(previousOperand)
      console.log(currentOperand)
      break;
  }

  return result;
}

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="calculator-grid">
      <div className='output'>
        <div className='previous-operand'>{previousOperand} {operation}</div>
        <div className='current-operand'>{currentOperand}</div>
      </div>
      <button className='span-two' onClick={() => dispatch({ type: 'clear' })}>AC</button>
      <button onClick={() => dispatch({ type: 'delete-digit' })}>DEL</button>
      <ButtonOperation dispatch={dispatch} operation={'/'} />

      <ButtonDigit dispatch={dispatch} digit={'1'} />
      <ButtonDigit dispatch={dispatch} digit={'2'} />
      <ButtonDigit dispatch={dispatch} digit={'3'} />

      <ButtonOperation dispatch={dispatch} operation={'*'} />

      <ButtonDigit dispatch={dispatch} digit={'4'} />
      <ButtonDigit dispatch={dispatch} digit={'5'} />
      <ButtonDigit dispatch={dispatch} digit={'6'} />

      <ButtonOperation dispatch={dispatch} operation={'+'} />

      <ButtonDigit dispatch={dispatch} digit={'7'} />
      <ButtonDigit dispatch={dispatch} digit={'8'} />
      <ButtonDigit dispatch={dispatch} digit={'9'} />

      <ButtonOperation dispatch={dispatch} operation={'-'} />

      <ButtonDigit dispatch={dispatch} digit={'.'} />
      <ButtonDigit dispatch={dispatch} digit={'0'} />

      <button className='span-two' onClick={() => dispatch({ type: 'evaluate' })}>=</button>
    </div>
  );
}

export default App;
