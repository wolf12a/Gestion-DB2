import React, {useEffect, useState} from 'react'
import Input from './Input'
import {useNavigate} from 'react-router-dom'
import Select from './Select';

function Empleado() {
    const navigate = useNavigate();


    const [empleado, setEmpleado] = useState({})
    const [genero, setGenero] = useState([])
    const [tipo, setTipo] = useState([])
    const [titulo, setTitulo] = useState([])


    const handleChange = (e) => {
		setEmpleado({...empleado, [e.target.name]: e.target.value});
	}

    const onSubmit = async (e) => {
		e.preventDefault();
        const response = await fetch("http://localhost:8080/empleado", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(empleado),
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
    const loadTitulos = async () => {
        const response = await fetch("http://localhost:8080/titulo", {
            headers: {"Content-Type": "application/json"},
        });
        const data = await response.json();
        setTitulo(data)
    }
    const loadTipo = async () => {
        const response = await fetch("http://localhost:8080/empleado_tipo", {
            headers: {"Content-Type": "application/json"},
        });
        const data = await response.json();
        setTipo(data)
    }

	const cancel = (e) =>{
		navigate("/")
	}
    const goTipo = (e) =>{
		navigate("/tipo")
	}
	const goGenero = (e) =>{
		navigate("/genero")
	}
	const goTitulo = (e) =>{
		navigate("/titulo")
	}

    useEffect(()=>{
        loadGeneros()
        loadTipo()
        loadTitulos()
    }, [])

    return (
        <div className='main'>
            <h2>Fomulario Empleado</h2>
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
                    tipo="date"
                    label="Fecha contratación"
                    nombre="contratacion"
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
                    datos={titulo}
                    nombre={"titulo"}
                    label={"Titulo obtenido"}
                    handle={handleChange}
                    go={goTitulo}
                />
                <Select 
                    datos={tipo}
                    nombre={"tipo"}
                    label={"Tipo de empleado"}
                    handle={handleChange}
                    go={goTipo}
                />
                <Select 
                    datos={genero}
                    nombre={"genero"}
                    label={"Género"}
                    handle={handleChange}
                    go={goGenero}
                />
                <Input
                    tipo="date"
                    label="Fecha de nacimiento"
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

export default Empleado
