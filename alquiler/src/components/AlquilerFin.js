import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import Select from './Select';

function AlquilerFin() {
    const navigate = useNavigate();
    const [datos, setDatos] = useState([])
    const [alquiler, setAlquiler] = useState({terminado: true})

    const handleChange = (e) => {
		setAlquiler({...alquiler, [e.target.name]: e.target.value});
    }
    const setVehiculo = () => {
        setAlquiler({...alquiler, vehiculo: datos[0].vehi})
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
    const loadAlquiler = async () => {
        const response = await fetch("http://localhost:8080/alquiler", {
            headers: {"Content-Type": "application/json"},
        });
        const data = await response.json();
        setDatos(data)
    }

	const cancel = (e) =>{
		navigate("/")
	}
    const goAlquiler = () => {
        navigate('/alquiler')
    }
    
    useEffect((e)=>{
        loadAlquiler();
    },[])
    
    return (
        <div className='main'>
            <h2>Finalizar Alquiler</h2>
            <form onSubmit={onSubmit}>
            <Select
                datos={datos}
                nombre={"alquiler"}
                label={"Alquiler"}
                handle={handleChange}
                go={goAlquiler}
            />
            {alquiler.alquiler && datos.filter(e=>e.id == alquiler.alquiler).map(e=>{
                return(
            <Input
                readOnly
                tipo="text"
                label="Vehiculo"
                estado={e.vehiculo}
            />
                )
            })}
            {alquiler.alquiler && datos.filter(e=>e.id == alquiler.alquiler).map(e=>{
                return(
            <Input
                readOnly
                tipo="number"
                label="Número de dias de alquiler"
                placeholder="3"
                nombre="dias"
                estado={e.dias}
                // handle={handleChange}
            />
                )
            })}
            {alquiler.alquiler && datos.filter(e=>e.id == alquiler.alquiler).map(e=>{
                return(
            <Input
                readOnly
                tipo="text"
                label="Precio por dia"
                placeholder="0"
                nombre="precio"
                estado={e.precio}
            />
                )
            })}
            {alquiler.alquiler && datos.filter(e=>e.id == alquiler.alquiler).map(e=>{
                return(
            <Input
                readOnly
                tipo="text"
                label={"Fecha alquiler inicio"}
                nombre="dateI"
                estado={e.datei.slice(0,10)}
                // handle={handleChange}
            />
                )
            })}
            {alquiler.alquiler && datos.filter(e=>e.id == alquiler.alquiler).map(e=>{
                return(
            <Input
                readOnly
                tipo="text"
                label={"Fecha alquiler fin"}
                nombre="dateF"
                estado={e.datef.slice(0,10)}
                // handle={handleChange}
            />
                )
            })}
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
            {alquiler.alquiler && datos.filter(e=>e.id == alquiler.alquiler).map(e=>{
                return(
           <Input
                readOnly
                tipo="number"
                label={"Total"}
                nombre="total"
                estado={e.dias * parseInt(e.precio.slice(1)) + alquiler.penalizacion * parseInt(e.precio.slice(1)) }
            />)})
            }
            <div className='btn_container'>
                <button className="btn cancel"  onClick={cancel}>Cancelar</button>
                <button className="btn formulario__btn" type="submit" onClick={setVehiculo}>Enviar</button>
            </div>

            </form>
        </div>
    )
}

export default AlquilerFin
