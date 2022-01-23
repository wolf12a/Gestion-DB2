import React from 'react'

function Select({datos, nombre, label, handle, go }) {
    if (!datos) return null;

    return (
        <div>
        <label htmlFor={nombre}>{label}</label>
        <select name={nombre} id={nombre} onChange={handle}>
            <option value="0">Elige un {nombre}</option>
            {datos &&
            datos.map((el) => (
                <option key={el.id} value={el.id}>
                {el.nombre}
                </option>
            ))}
        </select>
        <button className='mas' type="button" onClick={go}>+</button>
        </div>
    )
}

export default Select
