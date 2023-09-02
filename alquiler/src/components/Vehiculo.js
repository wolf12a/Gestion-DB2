import React, { useEffect, useState } from 'react'
import Input from './Input';
import { useNavigate } from 'react-router-dom';
import Select from './Select';
import { Header } from './Header';

function Vehiculo() {
    const navigate = useNavigate();
    const [vehiculo, setVehiculo] = useState({})
    const [marca, setMarca] = useState([])
    const [modelo, setModelo] = useState([])


    const handleChange = (e) => {
        setVehiculo({ ...vehiculo, [e.target.name]: e.target.value });
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8080/vehiculo", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(vehiculo),
        });
        const res = await response.json();
        if (res.status === "ok") {
            navigate('/')
        }
    }
    const loadMarca = async () => {
        const response = await fetch("http://localhost:8080/marca", {
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setMarca(data)
    }
    const loadModelo = async () => {
        const response = await fetch("http://localhost:8080/modelo", {
            headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setModelo(data)
    }

    const cancel = (e) => {
        navigate("/")
    }
    const goMarca = (e) => {
        navigate("/marca")
    }
    const goModelo = (e) => {
        navigate("/modelo")
    }

    useEffect(() => {
        loadMarca()
        loadModelo()
    }, [])

    return (
        <div className='center'>
            <Header></Header>
            <div className='main'>
                <h2>Nuevo Vehiculo</h2>
                <form onSubmit={onSubmit}>
                    <Select
                        datos={marca}
                        nombre={"marca"}
                        label={"Marca"}
                        handle={handleChange}
                        go={goMarca}
                    />
                    <Select
                        datos={modelo}
                        nombre={"modelo"}
                        label={"Modelo"}
                        handle={handleChange}
                        go={goModelo}
                    />
                    <Input
                        tipo="text"
                        label="Número de puertas"
                        placeholder="4"
                        nombre="puertas"
                        handle={handleChange}
                    />
                    <Input
                        tipo="number"
                        label="Capacidad del maletero"
                        placeholder="80"
                        nombre="maletero"
                        handle={handleChange}
                    />
                    <Input
                        tipo="text"
                        label="Placa"
                        placeholder="MAN0000"
                        nombre="placa"
                        handle={handleChange}
                    />
                    <Input
                        tipo="text"
                        label="Color"
                        placeholder="Negro"
                        nombre="color"
                        handle={handleChange}
                    />
                    <div className='btn_container'>
                        <button className="btn cancel" onClick={cancel}>Cancelar</button>
                        <button className="btn formulario__btn" type="submit">Enviar</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Vehiculo
