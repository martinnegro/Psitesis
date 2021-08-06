# Psitesis
Aplicación WEB para ayudar a alumnos de psicología a escribir su tesis siguiendo los lineamientos necesarios.

La aplicación se encuentra en formato escritorio y mobile. Los usuarios podrán ingresar al contenido autenticandosé con sus cuentas de Google.

Dentro encontrarán las siguientes secciones:
- Home con una breve descripción y los artículos más leídos del sitio.
- Blog llamado *Guía de Tesis*, donde estarán artículos escritos por colaboradores. Las temáticas son *Investigación* y *Normas APA*, que servirán de apoyo para los alumnos en instancia de tesis.
- Foro, que estará dividido en temas y subtemas donde podrán comunicarse con colaboradores y otros alumnos para compartir dudas y experiencias.
- Colaboradores, que contará con información de contacto y sus artículos relacionados.

#### Links de utilidad
- [Protitipo funcional](https://www.figma.com/file/6kETsk0daI1CHXhZMq6bBc/Prototipo-funcional-Psitesis-(Alta)?node-id=0%3A1).
- [Users Stories](https://miro.com/app/board/o9J_l4Kmvns=/).

### Tecnologías

- React
- Redux
- Autenticación: Auth0
- REST: ExpressJs
- ORM: Sequelize

### Enviroment variables

#### En client:
- `REACT_APP_AUTH0_DOMAIN=`
- `REACT_APP_AUTH0_CLIENT_ID=`
- `REACT_APP_AUTH0_AUDIENCE=`

#### En api:
- `DB_USER=`
- `DB_PASSWORD=`
- `DB_HOST=`
- `DB_NAME=`
- `JWKSURI=` 
- `AUDIENCE=` 
- `AUTH_CLIENT_DOMAIN`
- `AUTH_CLIENT_ID`
- `AUTH_CLIENT_SECRET`

### Diagrama Directorios
```
Psitesis
├── api
│   ├── auth
│   │   └── index.js
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   └── src
│       ├── app.js
│       ├── db.js
│       ├── models
│       │   ├── Article.js
│       │   ├── Category.js
│       │   ├── Institution.js
│       │   ├── Network.js
│       │   ├── Rol.js
│       │   ├── SubCategory.js
│       │   └── User.js
│       └── routes
│           ├── article.js
│           ├── index.js
│           ├── README.md
│           └── users.js
├── client
│   ├── package.json
│   ├── package-lock.json
│   ├── public
│   │   └── index.html
│   └── src
│       ├── App.js
│       ├── assets
│       │   ├── Logo.png
│       │   └── user.jpg
│       ├── components
│       │   ├── Auth0ProviderWithHistory
│       │   │   └── index.js
│       │   ├── Card
│       │   │   └── Card.jsx
│       │   ├── index.js
│       │   ├── Loading
│       │   │   └── index.js
│       │   ├── Login
│       │   │   └── index.js
│       │   ├── LoginButton
│       │   │   └── index.js
│       │   ├── LogoutButton
│       │   │   └── index.js
│       │   ├── Nav
│       │   │   └── Nav.jsx
│       │   └── ProtectedRoute
│       │       └── index.js
│       ├── index.js
│       └── views
│           ├── Home
│           │   └── Home.jsx
│           ├── index.js
│           └── Post
│               └── Post.jsx
└── README.md

```

### Diagrama Entidad - Relación

[Link al diagrama en lucid.app](https://lucid.app/lucidchart/1aed3959-c122-4137-8eae-430af3b1e528/edit?beaconFlowId=F88BB6EA5F2DAF7E&page=0_0#)
