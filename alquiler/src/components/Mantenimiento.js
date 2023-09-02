import React, { useState, useEffect } from 'react'
import Input from './Input'
import Select from './Select'
import { useNavigate } from 'react-router-dom'
import { Header } from './Header';

function Mantenimiento() {
    const navigate = useNavigate();
    const [lugar, setLugar] = useState([])
    const [empleados, setEmpleados] = useState([])
    const [vehiculo, setVehiculo] = useState([])
    const [alquiler, setAlquiler] = useState({})

    const handleChange = (e) => {
        setAlquiler({ ...alquiler, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(alquiler)
        const response = await fetch("http://localhost:8080/mantenimiento", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(alquiler),
        });
        const res = await response.json();
        if (res.status === "ok") {
            navigate('/')
        }
    }
    const loadLugar = async () => {
        const response = await fetch("http://localhost:8080/lugar", {
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setLugar(data)
    }
    const loadEmpleados = async () => {
        const response = await fetch("http://localhost:8080/empleado", {
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setEmpleados(data)
    }
    const loadVehiculos = async () => {
        const response = await fetch("http://localhost:8080/vehiculo", {
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setVehiculo(data)
    }
    const cancel = (e) => {
        navigate("/")
    }
    const goEmpleado = (e) => {
        navigate("/empleados")
    }
    const goVehiculo = (e) => {
        navigate("/vehiculos")
    }


    useEffect((e) => {
        loadLugar();
        loadEmpleados();
        loadVehiculos();
    }, [])
    return (
        <div className='center'>
            <Header></Header>
            <div className='main'>
                <h2>Mantenimiento de Vehiculo</h2>
                <form onSubmit={onSubmit}>
                    <Select
                        datos={lugar}
                        nombre={"lugar"}
                        label={"Lugar de Mantenimiento"}
                        handle={handleChange}
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
                    <Input
                        tipo="number"
                        label="Costo de mantimiento"
                        placeholder=""
                        nombre="precio"
                        handle={handleChange}
                    />
                    <Input
                        tipo="date"
                        label={"Fecha de mantenimiento"}
                        nombre="date"
                        handle={handleChange}
                    />
                    <Input
                        tipo="text"
                        label={"Observaciones"}
                        nombre="observaciones"
                        handle={handleChange}
                    />
                    <div className='btn_container'>
                        <button className="btn cancel" onClick={cancel}>Cancelar</button>
                        <button className="btn formulario__btn" type="submit" >Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Mantenimiento
