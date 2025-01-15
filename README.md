## Instalación

Instala las dependencias:
   ```bash
   npm install
   ```

## Rutas Disponibles

| Método | Ruta               | Descripción                          |
|---------|--------------------|--------------------------------------|
| `GET`   | `/canciones`       | Obtiene todas las canciones         |
| `POST`  | `/canciones`       | Agrega una nueva canción             |
| `PUT`   | `/canciones/:id`   | Edita una canción existente por ID   |
| `DELETE`| `/canciones/:id`   | Elimina una canción por ID           |

## Ejemplos de Uso

### Agregar una canción (POST)
```bash
POST http://localhost:3000/canciones \
{
  "id": 1,
  "titulo": "Imagine",
  "artista": "John Lennon",
  "tono": "C"
}
```

### Obtener todas las canciones (GET)
```bash
GET http://localhost:3000/canciones
```

### Editar una canción (PUT)
```bash
PUT http://localhost:3000/canciones/1 \
{
  "titulo": "Imagine (Remastered)",
  "artista": "John Lennon",
  "tono": "G"
}
```

### Eliminar una canción (DELETE)
```bash
DELETE http://localhost:3000/canciones/1
```

