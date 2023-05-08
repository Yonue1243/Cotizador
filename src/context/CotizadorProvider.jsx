import {  createContext, useState } from "react";
import { obtenerDiferenciaYear, calcularMarca, calcularPlan, formatearDinero } from "../../helpers";

const CotizadorContext = createContext()

const CotizadorProvider = ({children}) =>{

    const [datos, setDatos] = useState({
        marca: '',
        year: '',
        plan: ''
    })
    const [error, setError] = useState('')
    const [resultado, setResultado] = useState(0)
    const [cargando, setCargando] = useState(false)


        const handleChangeDatos = e =>{

            setDatos({
                ...datos,
                [e.target.name]: e.target.value

            })

        }

        const cotizarSeguro = () =>{
            //base
            let resultado = 2000

            //diferencia de años
            const diferencia = obtenerDiferenciaYear(datos.year) 

            // 3%- por cada año
            resultado -= (((diferencia * 3) * resultado) / 100)
            //Europeo 30%
            //Americano 15%
            //Asiatico 5%
            resultado *= calcularMarca(datos.marca) 

            //Básico 20%
            //Completo 50%
            resultado *= calcularPlan(datos.plan)

            resultado = formatearDinero(resultado)
            setCargando(true)

            setTimeout(() => {
            setResultado(resultado)
            setCargando(false)
            }, 2500);
        }


    return(
        <CotizadorContext.Provider  value={{
            datos,
            handleChangeDatos,
            error,
            setError,
            cotizarSeguro,
            resultado,
            cargando
        }}>
            {children}
        </CotizadorContext.Provider>
    )
}


export{
    CotizadorProvider
}

export default CotizadorContext


            // cotizadores: [],
            // cotizador: null,
            // agregarCotizador: (cotizador) => {
            //     const cotizadores = [...this.state.cotizadores, cotizador]
            //     this.setState({cotizadores})
            // },
            // eliminarCotizador: (id) => {
            //     const cotizadores = this.state.cotizadores.filter(cotizador => cotizador.id!== id)
            //     this.setState({cotizadores})
            // },
            // actualizarCotizador: (cotizador) => {
            //     const cotizadores = this.state.cotizadores.map(cotizador => cotizador.id === cotizador.id? cotizador : cotizador)
            //     this.setState({cotizadores})
            // },