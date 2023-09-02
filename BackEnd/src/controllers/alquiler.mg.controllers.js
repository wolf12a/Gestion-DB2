const res = require('express/lib/response')
const {MongoClient, ObjectId} = require('mongodb')
const client = new MongoClient(process.env.MONGO_URI)
const db = client.db('alquilerVehiculos')
const vehiculo = db.collection('vehiculo')
const cliente = db.collection('cliente')
const alquiler = db.collection('alquiler')
const empleado = db.collection('empleado')

const getVehiculos = async(req, res) => {
    try {
        await client.connect();
        vehiculo.aggregate([{
            $project:{"id":"$_id", "nombre": {"$concat": ["$marca", " ","$modelo", " ","$placa"]}},
        },
        {$sort: {"nombre": 1}}
]).toArray((error, datos) => {
            if(!error)
                res.json(datos)
            })
    } catch (error) {
        throw error
    }
}

const getClientes = async(req, res) => {
    try {
        await client.connect();
        cliente.aggregate([{
            $project:{"id":"$_id", "nombre": {"$concat": [ "$apellidos", " ", "$nombres" ]}},
        },
        {
            $sort: {nombre: 1}
        }
]).toArray((error, datos) => {
            if(!error)
                res.json(datos)
            })
    } catch (error) {
        throw error
    }
}
const getEmpleados = async(req, res) => {
    try {
        await client.connect();
        empleado.aggregate([{
            $project:{"id":"$_id", "nombre": {"$concat": ["$apellidos", " ","$nombres" ]}},
        },
        {$sort: {"nombre": 1}}
]).toArray((error, datos) => {
            if(!error)
                res.json(datos)
            })
    } catch (error) {
        throw error
    }
}

const TG_impide_alquilar = async(id) =>{
    let num_fallas;
    let maximo = 2;
    alquiler.aggregate(
        [
                {
                    $match:  { 
                    "penalizacion": { $gt: 0 }, 
                    "alquiler_terminado": "true",
                    "id_cliente": ObjectId(id)
                    }
                },
                {
                    $group: {
                    _id: "$id_cliente",
                    fallas: { $count : {}  }
                    }
                }
        ]
    ).toArray((error, datos) => {
        if(!error)
            num_fallas = datos.fallas;
            if(num_fallas>=maximo){
                return true
            }else{
                return false
            }
        })
    }
    const newAlquiler = async (req, res) => {
        const {vehiculo, empleado, cliente, alquiler, seguro, dias, precio, terminado, dateI, dateF, penalizacion, observaciones, total} = req.body
        console.log(req.body)
        try {
            const cl = await client.connect()
            if(TG_impide_alquilar(cliente)){
                res.json ({error: 'HA TENIDO DOS ATRASOS EN ALQUILERES ANTERIORES, POR EL MOMENTO NO PUEDE ALQUILAR NINGÚN VEHICULO'});
            }else{
                alquiler.insertOne({id_vehiculo: ObjectId(vehiculo), id_empleado: ObjectId(empleado), 
                    id_cliente: ObjectId(cliente), dias_alquiler: dias, precio_diario: precio, 
                    alquiler_terminado: terminado, fecha_inicio: dateI, fecha_fin: dateF, penalizacion, 
                    observaciones, seguro, total}, 
                (error, datos)=>{
                    if(datos){
                        res.json({status: 'ok'})
                    }
                })
            }
    } catch (error) {
        throw error
    }finally {
        // await client.close()
    }
}

module.exports = {
    getClientes,
    getEmpleados,
    getVehiculos,
    newAlquiler
}