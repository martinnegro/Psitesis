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
- `JWKSURI=` 
- `AUDIENCE=` 
- `ALGORITMHS=` 

### Diagrama Directorios
```
Psitesis
├── api
│   ├── auth
│   │   └── index.js
│   ├── index.js
│   ├── package.json
│   ├── package-lock.json
│   ├── src
│   │   ├── app.js
│   │   ├── db.js
│   │   ├── models
│   │   └── routes
│   │       ├── article.js
│   │       ├── index.js
│   │       └── users.js
│   └── tests
│       ├── models
│       └── routes
├── client
│   ├── package.json
│   ├── public
│   │   ├── index.html
│   └── src
│       ├── App.css
│       ├── App.js
│       ├── App.test.js
│       ├── index.css
│       ├── index.js
│       ├── reportWebVitals.js
│       └── setupTests.js
└── README.md
```

### Diagrama Entidad - Relación

[Link al diagrama en lucid.app](https://lucid.app/lucidchart/1aed3959-c122-4137-8eae-430af3b1e528/edit?beaconFlowId=F88BB6EA5F2DAF7E&page=0_0#)
