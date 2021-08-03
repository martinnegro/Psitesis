## Detalle de rutas y funcionalidad

### `/users`

- `  POST /users`    :  creación de usuario en la DB.
- `  GET /users/:id` :  request de usuario específico.
- `  GET /users?`    :  bulk request con parámetros.

### `/article`

- `POST   /article`     : creación de post en la DB. 
- `GET    /article?`    : bulk request de artículos con parámetros.
- `GET    /article/:id` : request de artículo específico.
- `PUT    /article/:id` : update de artículo específico.
- `DELETE /article/:id` : delete de artículo específico.