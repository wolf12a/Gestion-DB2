import React, {useEffect, useState} from 'react'
import Input from './Input'
import {useNavigate} from 'react-router-dom'
import Select from './Select';

function Cliente() {
    const navigate = useNavigate();
    const [cliente, setCliente] = useState({})
    const [genero, setGenero] = useState([])
    const [auspiciante, setAusp] = useState([])
    const [ciudad, setCity] = useState([])


    const handleChange = (e) => {
		setCliente({...cliente, [e.target.name]: e.target.value});
	}

    const onSubmit = async (e) => {
		e.preventDefault();
        const response = await fetch("http://localhost:8080/cliente", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(cliente),
        });
        const res = await response.json();
        if(res.status === "ok"){
            navigate('/')
        }
    }

    const loadGeneros = async () => {
        const response = await fetch("http://localhost:8080/genero", {
            headers: {"Content-Type": "application/json"},
        });
        const data = await response.json();
        setGenero(data)
    }
    const loadAusp = async () => {
        const response = await fetch("http://localhost:8080/ausp_cred", {
            headers: {"Content-Type": "application/json"},
        });
        const data = await response.json();
        setAusp(data)
    }
    const loadCity = async () => {
        const response = await fetch("http://localhost:8080/ciudad", {
            headers: {"Content-Type": "application/json"},
        });
        const data = await response.json();
        setCity(data)
    }
	const cancel = (e) =>{
		navigate("/")
	}
	const goCiudad = (e) =>{
		navigate("/ciudad")
	}
	const goGenero = (e) =>{
		navigate("/genero")
	}
	const goAusp = (e) =>{
		navigate("/auspiciante")
	}

    useEffect(()=>{
        loadGeneros()
        loadAusp()
        loadCity()
    }, [])

    return (
        <div className='main'>
            <h2>Formulario Cliente</h2>  
            <form onSubmit={onSubmit}>
                <Input
                    tipo="text"
                    label="Nombre"
                    placeholder="Pedro"
                    nombre="nombre"
                    handle={handleChange}
                />
                <Input
                    tipo="text"
                    label="Apellido"
                    placeholder="Sanchez"
                    nombre="apellido"
                    handle={handleChange}
                />
                <Input
                    tipo="text"
                    label="Cédula"
                    placeholder="1305421365"
                    nombre="cedula"
                    handle={handleChange}
                />
                <Input
                    tipo="text"
                    label="Correo Eléctronico"
                    placeholder="alguien@example.com"
                    nombre="email"
                    handle={handleChange}
                />
                <Input
                    tipo="text"
                    label="Teléfono"
                    placeholder="0987465897"
                    nombre="telefono"
                    handle={handleChange}
                />
                <Select 
                    datos={ciudad}
                    nombre={"ciudad"}
                    label={"Ciudad"}
                    handle={handleChange}
                    go={goCiudad}
                />
                <Input
                    tipo="text"
                    label="Dirección"
                    placeholder="Calle 13 y Av.15"
                    nombre="direccion"
                    handle={handleChange}
                />
                <Select 
                    datos={genero}
                    nombre={"genero"}
                    label={"Género"}
                    handle={handleChange}
                    go={goGenero}
                />
                <Select 
                    datos={auspiciante}
                    nombre={"auspiciante"}
                    label={"Auspiciante Crediticio"}
                    handle={handleChange}
                    go={goAusp}
                />
                <Input
                    tipo="text"
                    label="Tipo de sangre"
                    placeholder="B+"
                    nombre="sangre"
                    handle={handleChange}
                />
                <Input
                    tipo="date"
                    label="Fecha de nacimiento"
                    placeholder="01/01/1999"
                    nombre="fecha"
                    handle={handleChange}
                />
                <div className='btn_container'>
                <button className="btn cancel"  onClick={cancel}>Cancelar</button>
                <button className="btn formulario__btn" type="submit">Enviar</button>
                </div>
            </form>
        </div>
    )
}

export default Cliente
