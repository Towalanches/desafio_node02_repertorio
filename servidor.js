const express = require('express')
const fs = require('fs')
const app = express()
const PORT = 3000

/* Middleware para manejar JSON */
app.use(express.json())

/* Ruta para obtener todas las canciones */
app.get('/canciones', (req, res) => {
    fs.readFile('repertorio.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo')
        }
        res.json(JSON.parse(data))
    })
})

/* Ruta para agregar una nueva canción */
app.post('/canciones', (req, res) => {
    const nuevaCancion = req.body
    fs.readFile('repertorio.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo')
        }
        let canciones = []
        if (data) {
            canciones = JSON.parse(data)
        }

        // Verificar si el ID ya existe
        const idDuplicado = canciones.some((c) => c.id === nuevaCancion.id)
        if (idDuplicado) {
            return res.status(400).send(`El ID ${nuevaCancion.id} ya existe en el repertorio`)
        }
        canciones.push(nuevaCancion)
        fs.writeFile('repertorio.json', JSON.stringify(canciones, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error al guardar la canción')
            }
            res.send('Canción guardada correctamente')
        })
    })
})

/* Ruta para editar una canción por ID */
app.put('/canciones/:id', (req, res) => {
    const { id } = req.params
    const { titulo, artista, tono } = req.body
    fs.readFile('repertorio.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo')
        }
        let canciones = JSON.parse(data)
        const index = canciones.findIndex((c) => c.id === parseInt(id))
        if (index === -1) {
            return res.status(404).send('Canción no encontrada')
        }
        canciones[index] = { id: parseInt(id), titulo, artista, tono }
        fs.writeFile('repertorio.json', JSON.stringify(canciones, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error al actualizar la canción')
            }
            res.send('Canción actualizada correctamente')
        })
    })
})

/* Ruta para eliminar una canción por ID */
app.delete('/canciones/:id', (req, res) => {
    const { id } = req.params
    fs.readFile('repertorio.json', 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Error al leer el archivo')
        }
        let canciones = JSON.parse(data)
        const index = canciones.findIndex((c) => c.id === parseInt(id))
        if (index === -1) {
            return res.status(404).send('Canción no encontrada')
        }
        canciones.splice(index, 1)
        fs.writeFile('repertorio.json', JSON.stringify(canciones, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Error al eliminar la canción')
            }
            res.send('Canción eliminada correctamente')
        })
    })
})

/* Ruta para devolver la página principal */
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})

/* Iniciar el servidor */
app.listen(PORT, () => {
    console.log(`El servidor se ha encendido de forma correcta en el puerto ${PORT}`)
})
