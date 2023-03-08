import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import DayWeather from './components/DayWeather/DayWeather';

const APIURL = "https://meteo-de-oscar.proxy.beeceptor.com"

function App() {
  const limiteSuperior = 1000 // la compra no puede superar 1000 €
  const [counter, setCounter] = useState(0)
  const [minusClickCounter, setMinusClickCounter] = useState(0)
  const [plusClickCounter, setPlusClickCounter] = useState(0)

  const [valorInput, setValorInput] = useState(0)
  const [precioCompra, setPrecioCompra] = useState(0)
  const [alerta, setAlerta] = useState("")

  const [climaDias, setClimaDias] = useState([])

  // useEffect para cuando el componente cambia su estado
  useEffect(() => {
    if (precioCompra > limiteSuperior) {
      setAlerta("has excedido el valor máximo")
    }
    else {
      setAlerta("")
    }
  }, [precioCompra])

  // useEffect para cuando el componente se inicia
  useEffect(() => {
    axios
      .get(`${APIURL}/todosDias`)
      .then((result) => {
        console.log(result.data)
        setClimaDias(result.data)
      })

  }, [])

  // useEffect para cuando queremos hacer llamadas a una api

  function subtractCounter() {
    setCounter(counter - 1)
    setMinusClickCounter(minusClickCounter + 1)
  }

  function addCounter() {
    setCounter(counter + 1)
    setPlusClickCounter(plusClickCounter + 1)
  }

  return (
    <div className="App">
      <section>
        <h1>Clima de la semana</h1>
        <div>
          {climaDias.length=== 0 ?'Cargando...':climaDias.map(dia=>{
            return (<DayWeather day={dia} key={dia.diaSemana}></DayWeather>)
          })}
        </div>
      </section>

      <section>
        <fieldset>
          <legend>🛒 {precioCompra}</legend>
          <input defaultValue={valorInput} onChange={(e) => setValorInput(e.target.value)} type='number'></input>
          <button onClick={() => setPrecioCompra(precioCompra + Number(valorInput))}>añadir al carrito</button>
        </fieldset>
        <h5 style={{ color: "red" }}>{alerta}</h5>
      </section>

      <h1>El valor del contador es: {counter}</h1>
      <button onClick={subtractCounter}>-</button>
      <button onClick={addCounter}>+</button>

      <h2>Has hecho click {minusClickCounter} veces en el boton de restar</h2>
      <h2>Has hecho click {plusClickCounter} veces en el boton de sumar</h2>
    </div>
  );
}

export default App;
