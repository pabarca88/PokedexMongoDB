# Pokémon API con MongoDB

## Descripción

Este proyecto es una API REST diseñada para gestionar entrenadores y Pokémon. Ofrece funcionalidades completas como creación, actualización, eliminación y listado, además de implementar autenticación y validación de datos. La API utiliza MongoDB como base de datos para almacenar y gestionar información de manera eficiente.


## Características

- **Autenticación segura**: Uso de JSON Web Tokens (JWT) para proteger las rutas y garantizar que solo los usuarios autenticados puedan acceder a las funcionalidades.
- **Gestión de Pokémon**: Operaciones CRUD (Crear, Leer, Actualizar y Eliminar) para administrar Pokémon.
- **Gestión de Entrenadores**: CRUD completo para usuarios que actúan como entrenadores.
- **MongoDB**: Base de datos no relacional utilizada para almacenar datos de entrenadores y Pokémon de manera eficiente y escalable.

## Tecnologías

- **Node.js**: Entorno de ejecución para construir aplicaciones rápidas y escalables.
- **Express.js**: Framework para construir APIs REST de forma ágil y modular.
- **JSON Web Token (JWT)**: Sistema de autenticación basado en tokens.
- **MongoDB**: Base de datos no relacional ideal para manejar grandes volúmenes de datos.
- **mongoose**: ODM (Object Data Modeling) para interactuar con MongoDB de manera sencilla y estructurada.
- **uuid**: Para la generación de identificadores únicos en ciertos recursos.

## Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/pabarca88/PokedexMongoDB.git

2. **Instalar dependencias**

    ```bash
    npm install

3. **Iniciar el servidor**

    ```bash
    node index.js

El servidor estará corriendo en http://localhost:3000.

## Rutas de la API

### Login

`URL: POST /auth/login`

Esta ruta permite que los usuarios inicien sesión proporcionando su nombre de usuario y contraseña.

#### Cuerpo de la solicitud (JSON):
```json
{
  "username": "ash",
  "password": "ash123"
}
```

#### Respuesta exitosa (200 OK):
```json
{
  "token": "jwt_token_aqui"
}
```
#### Respuesta de error (400 Bad Request):

```json
{
    "error": "Credenciales incorrectas"
}
```

### Registro

`URL: POST /auth/register`

Esta ruta permite registrar un nuevo usuario proporcionando un nombre de usuario y una contraseña.

#### Cuerpo de la solicitud (JSON):

```json
{
  "username": "username",
  "password": "password",
  "role": "trainer"
}
```

#### Respuesta exitosa (201 Created):
```json
{
    "message": "Usuario registrado exitosamente",
    "user": {
        "id": id,
        "username": "username",
        "role": "trainer"
    }
}
```

#### Respuesta de error (400 Bad Request):

```json
{
  "message": "El nombre de usuario ya existe"
}
```


### Rutas públicas

- **`GET pokemon/`**: Obtener todos los Pokémon (con paginación).
- **`GET pokemon/:id`**: Obtener un Pokémon por su ID.

### Rutas protegidas (requieren autenticación)

- **`GET pokemon/trainer/mypokemons`**: Obtener los Pokémon del entrenador autenticado.
- **`POST pokemon/`**: Crear un nuevo Pokémon.
- **`PUT pokemon/:id`**: Actualizar un Pokémon por su ID.
- **`DELETE pokemon/:id`**: Eliminar un Pokémon por su ID.

### Middleware de Autenticación

#### `authMiddleware`

Este middleware verifica si el usuario está autenticado. Si no lo está, responde con un error 401.


### Estructura del Proyecto
    
  ```bash
    ├── controllers
    │   └── auth.controller.js
    │   └── pokemon.controller.js
    ├── models
    │   └── user.model.js
    │   └── pokemon.model.js
    ├── repository
    │   └── auth.repository.js
    │   └── pokemon.repository.js
    │   └── db.js
    ├── routes
    │   └── auth.route.js
    │   └── pokemon.route.js
    ├── services
    │   └── auth.service.js
    │   └── pokemon.service.js
    ├── validations
    │   └── pokemon.validation.js
    │── config.js
    ├── index.js
    ├── package.json
    └── README.md
```

## Ejemplo de Solicitudes

### Crear un Pokémon

#### `POST pokemon/`

Este endpoint permite crear un nuevo Pokémon. El cuerpo de la solicitud debe incluir los siguientes campos:

```json
{
    "number": 1,
    "name": "Pikachu",
    "type": "ghost",
    "stats": {
        "hp": 105,
        "attack": 550,
        "defense": 40,
        "speed": 90
    }
}
````

#### Respuesta exitosa:

```json
{
    "data": {
        "number": 1,
        "name": "Pikachu",
        "type": "ghost",
        "stats": {
            "hp": 105,
            "attack": 550,
            "defense": 40,
            "speed": 90
        },
        "trainer": "687a1ec6-79bd-49e8-b6cf-0eca9b2512e2",
        "_id": "675edbf2d1a826d65cce2fc5",
        "createdAt": "2024-12-15T13:38:58.855Z",
        "__v": 0
    }
}
```

### Actualizar un Pokémon

Para realizar esta acción, es necesario incluir un token de autenticación en los encabezados de la solicitud. Este token garantiza que solo usuarios autorizados puedan realizar modificaciones.

#### Agregar el token
El token debe enviarse en el encabezado Authorization de la solicitud en el siguiente formato:

```
Authorization: Bearer <tu-token-aquí>
```

#### `PUT pokemon/:id`

```json
{
    "name": "Golden",
    "type": "water",
    "stats": {
        "hp": 120,
        "attack": 80,
        "defense": 75,
        "speed": 100
    }
}
```

#### Respuesta exitosa

```json
{
    "stats": {
        "hp": 120,
        "attack": 80,
        "defense": 75,
        "speed": 100
    },
    "_id": "675ed554d1a826d65cce2fb5",
    "number": 110,
    "name": "Golden",
    "type": "water",
    "trainer": "687a1ec6-79bd-49e8-b6cf-0eca9b2512e2",
    "createdAt": "2024-12-15T13:10:44.484Z",
    "__v": 0
}
```
