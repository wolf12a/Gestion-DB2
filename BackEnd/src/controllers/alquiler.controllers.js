const pool = require('../db')


const cliente = async (req, res) => {
    const {ciudad, genero, auspiciante, nombres, apellidos, cedula, fecha, sangre, telefono, direccion, correo} = req.body
    const client = await pool.connect()
    try {
        await client.query(`INSERT INTO CLIENTE 
        (ID_CIUDAD, ID_GENERO, ID_CREDITICIO, NOMBRES_CLIENTE, APELLIDOS_CLIENTE, CEDULA_CLIENTE, FECHA_NACIMIENTO_CLIENTE, 
        TIPO_DE_SANGRE, TELEFONO_CLIENTE, DIRECCION_CLIENTE, EMAIL_CLIENTE) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`, 
        [ciudad, genero, auspiciante, nombres, apellidos, cedula, fecha, sangre, telefono, direccion, correo])
        res.json({status: "ok"})
    } catch (error) {
    throw error
    } finally {
        client.release()
    }
}


const empleado = async (req, res) => {
    const {titulo, tipo, genero, nombres, apellidos, cedula, fecha, fecha_contratacion, telefono} = req.body
    const client = await pool.connect()
    try {
        await client.query('INSERT INTO EMPLEADO (ID_TITULO, ID_TIPO_DE_EMPLEADO, ID_GENERO, CEDULA_EMPLEADO, NOMBRES_EMPLEADO, APELLIDOS_EMPLEADO, FECHA_NACIMIENTO_EMPLEADO, FECHA_CONTRATACION_EMPLEADO, TELEFONO_EMPLEADO) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)', 
        [titulo, tipo, genero, cedula, nombres, apellidos, fecha, fecha_contratacion, telefono])
        await client.query('COMMIT')
        res.json({status: "ok"})
    } catch (error) {
    await client.query('ROLLBACK')
    throw error
    } finally {
        client.release()
    }
}

const alquiler = async (req, res) => {
    const {vehiculo, empleado, cliente, alquiler, seguro, dias, precio, terminado, dateI, dateF, penalizacion, observaciones, total} = req.body
    const client = await pool.connect()
    if(terminado){
        try {
            await client.query('BEGIN') 
            await client.query('UPDATE VEHICULO SET OCUPADO = FALSE WHERE ID_VEHICULO = $1 ', [vehiculo])
            await client.query('UPDATE ALQUILER SET ALQUILER_TERMINADO = $1 WHERE ID_ALQUILER = $2 ', [terminado, alquiler])
            await client.query('UPDATE ALQUILER SET PENALIZACION_VALOR = $1 WHERE ID_ALQUILER = $2', [penalizacion, alquiler])
            await client.query('UPDATE ALQUILER SET OBSERVACIONES_VEHICULO = $1 WHERE ID_ALQUILER = $2', [observaciones, alquiler])
            await client.query('UPDATE ALQUILER SET TOTAL_ALQUILER = TOTAL_ALQUILER + PENALIZACION_VALOR * DIAS_ALQUILER WHERE ID_ALQUILER = $1', [alquiler])
            await client.query('COMMIT')
            res.json({status: "ok"})
        } catch (error) {
        await client.query('ROLLBACK')
        throw error
        } finally {
            client.release()
        }
    }else{
        try {
            await client.query('BEGIN')
            await client.query('UPDATE VEHICULO SET OCUPADO = TRUE WHERE ID_VEHICULO = $1 ', [vehiculo])
            await client.query(`INSERT INTO ALQUILER 
            (ID_VEHICULO, ID_EMPLEADO, ID_CLIENTE, ID_SEGURO, DIAS_ALQUILER, PRECIO_DIARIO, ALQUILER_TERMINADO, 
                FECHA_INICIO_ALQUILER, FECHA_FIN_ALQUILER, PENALIZACION_VALOR, OBSERVACIONES_VEHICULO, TOTAL_ALQUILER) 
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`, 
            [vehiculo, empleado, cliente, seguro, dias, precio, terminado, dateI, dateF, 0, observaciones, total])
            await client.query('COMMIT')
            res.json({status: "ok"})
        } catch (error) {
        await client.query('ROLLBACK')
        throw error
        } finally {
            client.release()
        }
    }
}

const mantenimiento = async (req, res) => {
    const {vehiculo, empleado, lugar, precio, date,  observaciones} = req.body
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        await client.query('INSERT INTO MANTENIMIENTO (ID_LUGAR_MANTENIMIENTO, ID_VEHICULO, ID_EMPLEADO, FECHA_MANTENIMIENTO, COSTO_MANTENIMIENTO, OBSERVACIONES_MANTENIMIENTO) VALUES ($1, $2, $3, $4, $5, $6)', 
        [  lugar, vehiculo, empleado, date, precio, observaciones])
        await client.query('COMMIT')
        res.json({status: "ok"})
    } catch (error) {
    await client.query('ROLLBACK')
    throw error
    } finally {
        client.release()
    }
}
const vehiculo = async(req, res) => {
    const {marca, modelo, puertas, maletero, placa, color} = req.body
    const client = await pool.connect()
    try {
        await client.query('INSERT INTO VEHICULO (ID_MARCA, ID_MODELO, NUMERO_DE_PUERTAS_VEHICULO, CAPACIDAD_MALETERO_VEHICULO, PLACA_VEHICULO, COLOR_VEHICULO) VALUES ($1, $2, $3, $4, $5, $6)', 
        [marca, modelo, puertas, maletero, placa, color])
        res.json({status: "ok"})
    } catch (error) {
    await client.query('ROLLBACK')
    throw error
    } finally {
        client.release()
    }
}
const revision = async (req, res) => {
    const {fecha, observacion} = req.body

    try {
        await pool.query('INSERT INTO revision_vehiculo (fecha_revision, observaciones_revision) VALUES ($1, $2)', [fecha, observacion])
        res.json({status: "ok"})
    } catch (error) {
        res.status(404).send(error)
    }
}
const crediticio = async (req, res) => {
    const {auspiciante} = req.body
    try {
        await pool.query('INSERT INTO auspiciante_crediticio (nombre_auspiciante) VALUES ($1)', [auspiciante])
        res.json({status: "ok"})
    } catch (error) {
        res.status(404).send(error)
    }
}
const titulo = async (req, res) => {
    const {nombre} = req.body
    try {
        await pool.query('INSERT INTO TITULO (NOMBRE_TITULO) VALUES ($1)', [nombre])
        res.json({status: "ok"})
    } catch (error) {
        res.status(404).send(error)
    }
}
const genero = async (req, res) => {
    const {nombre} = req.body
    try {
        await pool.query('INSERT INTO GENERO (TIPO_GENERO) VALUES ($1)', [nombre])
        res.json({status: "ok"})
    } catch (error) {
        res.status(404).send(error)
    }
}
const ciudad = async (req, res) => {
    const {nombre} = req.body
    try {
        await pool.query('INSERT INTO CIUDAD (NOMBRE_CIUDAD) VALUES ($1)', [nombre])
        res.json({status: "ok"})
    } catch (error) {
        res.status(404).send(error)
    }
}
const marca = async (req, res) => {
    const {nombre} = req.body
    try {
        await pool.query('INSERT INTO MARCA_VEHICULO (NOMBRE_MARCA) VALUES ($1)', [nombre])
        res.json({status: "ok"})
    } catch (error) {
        res.status(404).send(error)
    }
}
const modelo = async (req, res) => {
    const {nombre} = req.body
    try {
        await pool.query('INSERT INTO MODELO_VEHICULO (NOMBRE_MODELO) VALUES ($1)', [nombre])
        res.json({status: "ok"})
    } catch (error) {
        res.status(404).send(error)
    }
}
const auspiciante = async (req, res) => {
    const {nombre} = req.body
    try {
        await pool.query('INSERT INTO AUSPICIANTE_CREDITICIO (NOMBRE_AUSPICIANTE) VALUES ($1)', [nombre])
        res.json({status: "ok"})
    } catch (error) {
        res.status(404).send(error)
    }
}
const seguro = async (req, res) => {
    const {nombre} = req.body
    try {
        await pool.query('INSERT INTO SEGURO (NOMBRE_SEGURO) VALUES ($1)', [nombre])
        res.json({status: "ok"})
    } catch (error) {
        res.status(404).send(error)
    }
}
const tipoEmp = async (req, res) => {
    const {nombre} = req.body
    try {
        await pool.query('INSERT INTO tipo_de_empleado (nombre_tipo_de_empleado) VALUES ($1)', [nombre])
        res.json({status: "ok"})
    } catch (error) {
        res.status(404).send(error)
    }
}

const getCliente = async (req, res) => {
    try {
        const clientes = await pool.query('SELECT id_cliente as id, apellidos_cliente ||\' \'|| nombres_cliente as nombre FROM cliente order by nombre asc')
        res.json(clientes.rows)
    } catch (error) {
        res.status(404).send(error)
    }
}
const getEmpleado = async(req, res) => {
    try {
        const empleados = await pool.query('SELECT id_empleado as id, apellidos_empleado ||\' \'|| nombres_empleado as nombre FROM empleado order by nombre asc')
        res.json(empleados.rows)
    } catch (error) {
        res.status(404).send(error)
    }
}
const getRevision = async(req, res) => {
    try {
        const revisiones = await pool.query('SELECT * FROM revision_vehiculo')
        res.send(revisiones.rows)
    } catch (error) {
        res.status(404).send(error)
    }
}
const getVehiculo = async(req, res) => {
    try {
        const vehiculos = await pool.query('SELECT id_vehiculo as id, nombre_marca || \' \' || nombre_modelo || \' \' || placa_vehiculo as nombre FROM vehiculo inner join marca_vehiculo on vehiculo.id_marca = marca_vehiculo.id_marca inner join modelo_vehiculo on vehiculo.id_modelo = modelo_vehiculo.id_modelo where ocupado = false')
        res.send(vehiculos.rows)
    } catch (error) {
        res.status(404).send(error)
    }
}
const getTitulo = async(req, res) => {
    try {
        const titulos = await pool.query('SELECT id_titulo as id, nombre_titulo as nombre FROM titulo')
        res.send(titulos.rows)
    } catch (error) {
        res.status(404).send(error)
    }
}
const getGenero = async(req, res) => {
    try {
        const generos = await pool.query('SELECT id_genero as id, tipo_genero as nombre FROM genero')
        res.send(generos.rows)
    } catch (error) {
        res.status(404).send(error)
    }
}

const getAlquiler = async(req, res) => {
    try {
        const alquileres = await pool.query(`SELECT id_alquiler as id, vehiculo.id_vehiculo as vehi, nombre_marca || ' ' || nombre_modelo as vehiculo, apellidos_cliente || ' ' || nombres_cliente || ' / ' || placa_vehiculo as nombre, fecha_inicio_alquiler as dateI, fecha_fin_alquiler as dateF, dias_alquiler as dias, precio_diario as precio 
        FROM alquiler
        inner join vehiculo on vehiculo.id_vehiculo = alquiler.id_vehiculo
        inner join cliente on alquiler.id_cliente = cliente.id_cliente
        inner join marca_vehiculo marca on marca.id_marca = vehiculo.id_marca
        inner join modelo_vehiculo modelo on modelo.id_modelo = vehiculo.id_modelo
        where alquiler_terminado = false
        order by nombre asc`)
        res.send(alquileres.rows)
    } catch (error) {
        res.status(404).send(error)
    }
}

const getAusp = async(req, res) => {
    try {
        const auspiciantes = await pool.query('SELECT id_crediticio as id, nombre_auspiciante as nombre FROM auspiciante_crediticio')
        res.send(auspiciantes.rows)
    } catch (error) {
        res.status(404).send(error)
    }
}
const getSeguro = async(req, res) => {
    try {
        const seguros = await pool.query('SELECT id_seguro as id, nombre_seguro as nombre FROM seguro')
        res.send(seguros.rows)
    } catch (error) {
        res.status(404).send(error)
    }
}
const getCiudad = async(req, res) => {
    try {
        const ciudad = await pool.query('SELECT id_ciudad as id, nombre_ciudad as nombre FROM ciudad')
        res.send(ciudad.rows)
    } catch (error) {
        res.status(404).send(error)
    }
}
const getLugar = async(req, res) => {
    try {
        const seguros = await pool.query('SELECT id_lugar_mantenimiento as id, nombre_lugar_mantenimiento as nombre FROM lugar_de_mantenimiento')
        res.send(seguros.rows)
    } catch (error) {
        res.status(404).send(error)
    }
}
const getTipo = async(req, res) => {
    try {
        const tipo = await pool.query('SELECT id_tipo_de_empleado as id, nombre_tipo_de_empleado as nombre FROM tipo_de_empleado')
        res.send(tipo.rows)
    } catch (error) {
        res.status(404).send(error)
    }
}
const getMarca = async(req, res) => {
    try {
        const marca = await pool.query('SELECT id_marca as id, nombre_marca as nombre FROM marca_vehiculo')
        res.send(marca.rows)
    } catch (error) {
        res.status(404).send(error)
    }
}
const getModelo = async(req, res) => {
    try {
        const modelo = await pool.query('SELECT id_modelo as id, nombre_modelo as nombre FROM modelo_vehiculo')
        res.send(modelo.rows)
    } catch (error) {
        res.status(404).send(error)
    }
}



module.exports = {
    cliente,
    empleado,
    alquiler,
    vehiculo,
    revision,
    crediticio,
    mantenimiento,
    titulo,
    tipoEmp,
    getCliente,
    getEmpleado,
    getRevision,
    getVehiculo,
    getMarca,
    getModelo,
    getTitulo,
    getGenero,
    getAlquiler,
    getAusp,
    getSeguro,
    getLugar,
    getCiudad,
    getTipo,
    genero,
    ciudad,
    marca,
    modelo,
    auspiciante,
    seguro
}