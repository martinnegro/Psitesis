## Detalle de rutas y funcionalidad

### `/users`

- `  POST /users`    :  creación de usuario en la DB.
- `  GET /users/:id` :  request de usuario específico.
- `  GET /users?`    :  bulk request con parámetros.

### `/institutions`

- `POST /institutions`   : creación de instituto.
   - Ej. body: 
    ```
    {
        "name": "string",
        "descriptions": "string"
    }
    ```
    - Respuesta:
    ```
    {
        "inst_id": "c5309940-a26d-48b7-bd8f-832e22b311aa",
        "inst_name": "Henry",
        "inst_descriptions": "Bootcamp",
        "updatedAt": "2021-08-04T20:56:03.082Z",
        "createdAt": "2021-08-04T20:56:03.082Z"
    }
    ```
- `GET /institutions/:id`:
  - Ej: `/institutions/3148ec28-29d5-4882-8b23-1f1932a28cd1`
  - Respuesta: ídem a POST.
### `/article`

- `POST   /article`     : creación de post en la DB. 
- `GET    /article?`    : bulk request de artículos con parámetros.
- `GET    /article/:id` : request de artículo específico.
- `PUT    /article/:id` : update de artículo específico.
- `DELETE /article/:id` : delete de artículo específico.