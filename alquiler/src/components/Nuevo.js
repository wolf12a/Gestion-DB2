import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from './Input';

function Nuevo({nombre}) {
    const [dato, setDato] = useState({})
    const navigate = useNavigate()
    const titulo = async () => {
        const response = await fetch("http://localhost:8080/titulo", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(dato),
        });
        const res = await response.json();
        if(res.status === "ok"){
            navigate('/')
        }
    }
    const genero = async () => {
        const response = await fetch("http://localhost:8080/genero", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(dato),
        });
        const res = await response.json();
        if(res.status === "ok"){
            navigate('/')
        }
    }
    const marca = async () => {
        const response = await fetch("http://localhost:8080/marca", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(dato),
        });
        const res = await response.json();
        if(res.status === "ok"){
            navigate('/')
        }
    }
    const modelo = async () => {
        const response = await fetch("http://localhost:8080/modelo", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(dato),
        });
        const res = await response.json();
        if(res.status === "ok"){
            navigate('/')
        }
    }
    const tipo = async () => {
        const response = await fetch("http://localhost:8080/tipo", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(dato),
        });
        const res = await response.json();
        if(res.status === "ok"){
            navigate('/')
        }
    }
    const auspiciante = async () => {
        const response = await fetch("http://localhost:8080/auspiciante", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(dato),
        });
        const res = await response.json();
        if(res.status === "ok"){
            navigate('/')
        }
    }
    const seguro = async () => {
        const response = await fetch("http://localhost:8080/seguro", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(dato),
        });
        const res = await response.json();
        if(res.status === "ok"){
            navigate('/')
        }
    }
    const ciudad = async () => {
        const response = await fetch("http://localhost:8080/ciudad", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(dato),
        });
        const res = await response.json();
        if(res.status === "ok"){
            navigate('/')
        }
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        switch(e.target.id){
            case 'titulo': titulo();
            break;
            case 'tipo': tipo();
            break;
            case 'genero': genero();
            break;
            case 'marca': marca();
            break;
            case 'modelo': modelo();
            break;
            case 'seguro': seguro();
            break;
            case 'auspiciante': auspiciante();
            break;
            case 'ciudad': ciudad();
            break;
            default: <div/>
        }
    }

    const handleChange = (e) => {
		setDato({...dato, [e.target.name]: e.target.value});
	}

    const cancel = (e) => {
        navigate('/')
    }

    return (
        <div className='main'>
            <form onSubmit={handleSubmit} id={nombre}>
            <h2>{"Agregar " + nombre.charAt(0).toUpperCase() + nombre.slice(1)}</h2>
            <Input
                    tipo="text"
                    label={nombre.charAt(0).toUpperCase() + nombre.slice(1)}
                    nombre="nombre"
                    handle={handleChange}
            />
            <button className="btn cancel"  onClick={cancel}>Cancelar</button>
            <button className="btn formulario__btn" type="submit">Enviar</button>
            </form>
        </div>
    )
}

export default Nuevo
