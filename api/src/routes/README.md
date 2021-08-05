## Detalle de rutas y funcionalidad

### `/users`

- `  POST /users`    :  creación de usuario en la DB.
  - Ej. body: 
    ```
    {
        "user_id_A0": "105592403739955785044" || null,
        "user_name": "Martín",
        "user_email": "martin@mail.com",
        "user_img_profile": "http:",
        "biography": "FSWD",
        "inst_id": ["ea9b3f96-0097-4370-843f-52a02e398e90"],
        "rol_id": 1
    }
    ```
  - Respuesta: 
    ```
    {
        "user_id": "7607f241-b9af-43ba-8bbf-295e04ed9f8d",
        "user_id_A0": "105592403739955785044",
        "user_name": "Martín",
        "user_email": "martin@mail.com",
        "user_img_profile": "http:",
        "user_password": null,
        "institution_id": null,
        "biography": "FSWD",
        "createdAt": "2021-08-05T02:23:24.728Z",
        "updatedAt": "2021-08-05T02:23:24.728Z",
        "rolRolId": null,
        "rol_id": 1,
        "institutions": [
            {
              "inst_id": "90ed7d1e-b27c-432b-a2e2-0470888f657e",
              "inst_name": "Henry",
              "inst_descriptions": "Bootcamp",
              "createdAt": "2021-08-05T02:23:07.303Z",
              "updatedAt": "2021-08-05T02:23:07.303Z"
            }
        ]
        "created": true || false
    }
    ```
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