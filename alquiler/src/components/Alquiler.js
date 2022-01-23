import React, {useState, useEffect} from 'react'
import Input from './Input'
import Select from './Select'
import {useNavigate} from 'react-router-dom'

function Alquiler() {
    const navigate = useNavigate();
    const [cliente, setCliente] = useState([])
    const [empleados, setEmpleados] = useState([])
    const [vehiculo, setVehiculo] = useState([])
    const [seguro, setSeguro] = useState([])
    const [alquiler, setAlquiler] = useState({terminado: false})

    const handleChange = (e) => {
		setAlquiler({...alquiler, [e.target.name]: e.target.value});
    }
    const setTotal = () => {
        setAlquiler({...alquiler, total: alquiler.precio * alquiler.dias})
    }
    const onSubmit = async (e) => {
		e.preventDefault();
        const response = await fetch("http://localhost:8080/alquiler", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(alquiler),
        });
        const res = await response.json();
        if(res.status === "ok"){
            navigate('/')
        }
    }
    const loadClientes = async () => {
        const response = await fetch("http://localhost:8080/cliente", {
            headers: {"Content-Type": "application/json"},
        });
        const data = await response.json();
        setCliente(data)
    }
    const loadEmpleados = async () => {
        const response = await fetch("http://localhost:8080/empleado", {
            headers: {"Content-Type": "application/json"},
        });
        const data = await response.json();
        setEmpleados(data)
    }
    const loadVehiculos = async () => {
        const response = await fetch("http://localhost:8080/vehiculo", {
            headers: {"Content-Type": "application/json"},
        });
        const data = await response.json();
        setVehiculo(data)
    }
    const loadSeguros = async () => {
        const response = await fetch("http://localhost:8080/seguro", {
            headers: {"Content-Type": "application/json"},
        });
        const data = await response.json();
        setSeguro(data)
    }

	const cancel = (e) =>{
		navigate("/")
	}
	const goCliente = (e) =>{
		navigate("/clientes")
	}
	const goEmpleado = (e) =>{
		navigate("/empleados")
	}
	const goVehiculo = (e) =>{
		navigate("/vehiculos")
	}
	const goSeguro = (e) =>{
		navigate("/seguro")
	}


    useEffect((e)=>{
        loadClientes();
        loadEmpleados();
        loadSeguros();
        loadVehiculos();
    },[])

    return (
        <div className='main'>
            <h2>Formulario Alquiler</h2>
            <form onSubmit={onSubmit}>
            <Select
                datos={cliente}
                nombre={"cliente"}
                label={"Cliente"}
                handle={handleChange}
                go={goCliente}
            />
            <Select
                datos={empleados}
                nombre={"empleado"}
                label={"Empleado"}
                handle={handleChange}
                go={goEmpleado}
            />
            <Select
                datos={vehiculo}
                nombre={"vehiculo"}
                label={"Vehiculo"}
                handle={handleChange}
                go={goVehiculo}
            />
            <Select
                datos={seguro}
                nombre={"seguro"}
                label={"Seguro"}
                handle={handleChange}
                go={goSeguro}
            />

            <Input
                tipo="number"
                label="Número de dias de alquiler"
                placeholder="3"
                nombre="dias"
                handle={handleChange}
            />
            <Input
                tipo="number"
                label="Precio por dia"
                placeholder="0"
                nombre="precio"
                handle={handleChange}
            />
            <Input
                tipo="date"
                label={"Fecha alquiler inicio"}
                nombre="dateI"
                handle={handleChange}
            />
            <Input
                tipo="date"
                label={"Fecha alquiler fin"}
                nombre="dateF"
                handle={handleChange}
            />
            <Input
                tipo="text"
                label={"Observaciones"}
                nombre="observaciones"
                handle={handleChange}
            />
           <Input
                tipo="number"
                label={"Total"}
                nombre="total"
                estado={alquiler.dias * alquiler.precio}
            />
            <div className='btn_container'>
                <button className="btn cancel"  onClick={cancel}>Cancelar</button>
                <button className="btn formulario__btn" type="submit" onClick={setTotal}>Enviar</button>
            </div>

            </form>
        </div>
    )
}

export default Alquiler
