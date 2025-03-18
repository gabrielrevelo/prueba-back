# Prueba Técnica Backend - Node.js y MongoDB

## Aclaracion

- Para mantener coherencia y seguir buenas prácticas, todas las variables, funciones, rutas, atributos, commits y código en general están escritos en **inglés**.  
- Para el borrado, se uso un borrado logico, ya que en la mayoria de los casos, es mejor tener un borrado logico, que un borrado fisico

## Avance

### 1. Configuración del Servidor

- [x] Crear servidor Express en puerto 3000
- [x] Configurar conexión MongoDB usando mongoose (DB: prueba-tecnica-conteo)

### 2. Modelo de Usuario

- [x] Implementar modelo con los siguientes campos:
  - `nombre` (String, requerido)
  - `email` (String, único y requerido)
  - `edad` (Number, opcional)
  - `fecha_creacion` (Date, default: fecha actual)
  - `direcciones` (Array de objetos, con la siguiente estructura):

    ```json
    [
      {
        "calle": "Av. Principal",
        "ciudad": "Lima",
        "pais": "Perú",
        "codigo_postal": "15001"
      }
    ]
    ```

### 3. Endpoints API

- [x] **POST** `/usuarios` - Crear usuario
- [x] **GET** `/usuarios` - Listar usuarios
- [x] **GET** `/usuarios/:id` - Obtener usuario por ID
- [x] **PUT** `/usuarios/:id` - Actualizar usuario
- [x] **DELETE** `/usuarios/:id` - Eliminar usuario
- [ ] **GET** `/usuarios/buscar?ciudad=:ciudad` - Buscar usuarios por ciudad

### 4. Validaciones y Manejo de Errores

- [ ] Validar emails duplicados
- [ ] Validar campos requeridos
- [ ] Validar estructura del array de direcciones

### 5. Características Adicionales (Bonus)

- [ ] Implementar paginación en GET /usuarios
- [x] Configurar variables de entorno con dotenv
