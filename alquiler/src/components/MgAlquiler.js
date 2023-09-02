import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import Select from './Select';
import { Header } from './Header';

function MgAlquiler() {
    const navigate = useNavigate();
    const [cliente, setCliente] = useState([])
    const [empleados, setEmpleados] = useState([])
    const [vehiculo, setVehiculo] = useState([])
    const [finalizado] = useState([{value: true, name: "Si"},
    {value: false, name: "No"}])
    const [alquiler, setAlquiler] = useState({terminado: false})

    const handleChange = (e) => {
		setAlquiler({...alquiler, [e.target.name]: e.target.value});
    }
    const setTotal = () => {
        setAlquiler({...alquiler, total: alquiler.precio * alquiler.dias})
    }

    const onSubmit = async (e) => {
		e.preventDefault();
        const response = await fetch("http://localhost:8080/mg-alquiler", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(alquiler),
        });
        const res = await response.json();
        if(res.status === "ok"){
            navigate('/')
        }else{
            console.log(res.error)
        }
    }

    const loadClientes = async () => {
        const response = await fetch("http://localhost:8080/mg-cliente", {
            headers: {"Content-Type": "application/json"},
        });
        const data = await response.json();
        setCliente(data)
    }

    const loadEmpleados = async () => {
        const response = await fetch("http://localhost:8080/mg-empleado", {
            headers: {"Content-Type": "application/json"},
        });
        const data = await response.json();
        setEmpleados(data)
    }

    const loadVehiculos = async () => {
        const response = await fetch("http://localhost:8080/mg-vehiculo", {
            headers: {"Content-Type": "application/json"},
        });
        const data = await response.json();
        setVehiculo(data)
    }
    const cancel = (e) =>{
		navigate("/")
	}
    useEffect(()=>{
        loadClientes()
        loadEmpleados()
        loadVehiculos()
    },[])
    return (
        <div className='center'>
            <Header></Header>
            <div className='main'>
                <h2>Formulario Alquiler NOSQL</h2>
                <form onSubmit={onSubmit}>
                <Select
                    datos={cliente}
                    nombre={"cliente"}
                    label={"Cliente"}
                    handle={handleChange}
                />
                <Select
                    datos={empleados}
                    nombre={"empleado"}
                    label={"Empleado"}
                    handle={handleChange}
                />
                <Select
                    datos={vehiculo}
                    nombre={"vehiculo"}
                    label={"Vehiculo"}
                    handle={handleChange}
                />
                <Input
                    tipo="text"
                    label="Seguro"
                    placeholder=""
                    nombre="seguro"
                    handle={handleChange}
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
                <div>
                <label htmlFor='finalizado'>Finalizado</label>
                <input
                type="radio"
                value={finalizado[0].value}
                name='terminado'
                onChange={handleChange}
                />{finalizado[0].name}
                <input
                type="radio"
                value={finalizado[1].value}
                name='terminado'
                onChange={handleChange}
                />{finalizado[1].name}
                </div>
                <Input
                    tipo="number"
                    label={"Valor de Penalizacion (si no aplica 0)"}
                    nombre="penalizacion"
                    placeholder={'0'}
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
        </div>
    )
}

export default MgAlquiler
