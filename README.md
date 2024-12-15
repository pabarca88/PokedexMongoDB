# Pokémon API

## Descripción

Este proyecto es una API REST para gestionar entrenadores y Pokémon, incluyendo funcionalidades como crear, actualizar, eliminar y buscar Pokémon por tipo, así como la implementación de autenticación y validación de datos.

## Características

- **Autenticación**: Middleware para verificar que el usuario esté autenticado.
- **Gestión de Pokémon**: Crear, actualizar, eliminar y listar Pokémon.
- **Búsqueda**: Buscar Pokémon por tipo.
- **Validación de datos**: Uso de `express-validator` para validar datos de entrada.
- **Paginación**: Implementación de paginación en los endpoints de listado de Pokémon.

## Tecnologías

- **Node.js**: Plataforma para ejecutar el servidor.
- **Express.js**: Framework web para Node.js.
- **express-validator**: Middleware para validar los datos de las solicitudes.
- **JSON Web Token (JWT)**: Para la autenticación de usuarios.

## Instalación

1. **Clonar el repositorio**

   ```bash
   git clone https://github.com/pabarca88/pokedexAPI.git

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
  "password": "password"
}
```

#### Respuesta exitosa (201 Created):
```json
{
    "message": "Usuario registrado exitosamente",
    "user": {
        "id": 4,
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
- **`GET pokemon/search`**: Buscar Pokémon por tipo.

### Rutas protegidas (requieren autenticación)

- **`GET pokemon/trainer/mypokemons`**: Obtener los Pokémon del entrenador autenticado.
- **`POST pokemon/`**: Crear un nuevo Pokémon.
- **`PUT pokemon/:id`**: Actualizar un Pokémon por su ID.
- **`DELETE pokemon/:id`**: Eliminar un Pokémon por su ID.

### Middleware de Autenticación

#### `authMiddleware`

Este middleware verifica si el usuario está autenticado. Si no lo está, responde con un error 401.

### Validación de Datos

#### `createPokemonValidation`

Middleware para validar los datos al crear un Pokémon.

#### `handleValidationErrors`

Middleware para manejar errores de validación.

### Paginación

Para los endpoints que devuelven listas de Pokémon, se ha implementado paginación utilizando los parámetros page y limit.

Ejemplo de solicitud para obtener la primera página de 10 Pokémon:

    GET /?page=1&limit=10

### Estructura del Proyecto
    
  ```bash
    ├── controllers
    │   └── auth.controller.js
    │   └── pokemon.controller.js
    ├── models
    │   └── user.model.js
    │   └── pokemon.model.js
    ├── routes
    │   └── auth.route.js
    │   └── pokemon.route.js
    ├── services
    │   └── auth.service.js
    │   └── pokemon.service.js
    ├── validations
    │   └── pokemon.validation.js
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
  "name": "Pikachu",
  "type": "Electric",
  "level": 25
}
````

#### Respuesta exitosa:

```json
{
  "id": 1,
  "name": "Pikachu",
  "type": "Electric",
  "level": 25,
  "trainerId": 1,
  "createdAt": "2024-12-01T10:00:00Z"
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
  "name": "Pikachu",
  "type": "Electric",
  "level": 35
}
```

#### Respuesta exitosa

```json
{
  "id": 1,
  "name": "Pikachu",
  "type": "Electric",
  "level": 35,
  "trainerId": 1,
  "createdAt": "2024-12-01T10:00:00Z"
}
```

### Buscar Pokémon por tipo

#### `GET pokemon/search?type=Electric:`

#### Respuesta exitosa

```json
[
  {
    "id": 1,
    "name": "Pikachu",
    "type": "Electric",
    "level": 25,
    "trainerId": 1,
    "createdAt": "2024-12-01T10:00:00Z"
  }
]
```
