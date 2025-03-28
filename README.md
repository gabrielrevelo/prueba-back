# Prueba Técnica Backend - Node.js y MongoDB

## Aclaraciones Técnicas

- El código, rutas, colecciones, campos, ..., están escritos en inglés siguiendo las mejores prácticas de desarrollo, esto depende del proyecto y del equipo de desarrollo.
- Se implementa borrado lógico en lugar de físico para mantener la integridad de los datos
- La API utiliza TypeScript para mejor tipado y mantenibilidad

## Configuración del Proyecto

### Prerrequisitos
- Node.js 
- MongoDB
- npm
  
Antes de iniciar el proyecto, asegúrate de tener MongoDB en ejecución y crear la base de datos.

### Variables de Entorno
Crear un archivo `.env` en la raíz del proyecto:
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/prueba-tecnica-conteo
```

### Instalación y ejecución para probar la API
```bash
# Clonar repositorio
git clone https://github.com/gabrielrevelo/prueba-back.git

# Ingresar al directorio
cd prueba-back

# Instalar dependencias
npm install

# Iniciar API para comenzar a probar
npm run dev
```

Despues de esto ya se puede probar la API con Postman o cualquier cliente HTTP.

## Estructura del Proyecto

```bash
.
├── src/
│   ├── config/
│   │   └── database.ts           # Configuración de MongoDB
│   │   └── userRoutes.ts         # Rutas de la API para usuarios
│   ├── controllers/
│   │   ├── docsController.ts     # Controlador para la documentación
│   │   └── userController.ts     # Controlador para usuarios
│   ├── middleware/
│   │   ├── errorHandler.ts       # Manejador global de errores
│   │   └── userValidation.ts     # Validaciones para usuarios
│   ├── models/
│   │   └── User.ts               # Modelo de MongoDB para usuarios
│   ├── routes/
│   │   └── userRoutes.ts         # Rutas de la API para usuarios
│   ├── services/
│   │   └── userService.ts        # Lógica de negocio para usuarios
│   ├── types/
│   │   ├── user.ts               # Interfaces para usuario
│   │   └── response.ts           # Interfaces para respuestas API
│   ├── utils/
│   │   └── responseHandler.ts    # Utilidad para formatear respuestas
│   └── app.ts                    # Punto de entrada de la aplicación
├── .env                          # Variables de entorno
├── .gitignore                    # Archivos ignorados por git
├── package.json                  # Dependencias y scripts
├── tsconfig.json                 # Configuración de TypeScript
└── README.md                     # Documentación del proyecto
```

## Estructura de Datos

### Modelo de Usuario
```typescript
{
  name: string;                   // requerido
  email: string;                  // requerido, único
  age?: number;                   // opcional
  created_at: Date;               // automático, fecha de creación
  deleted_at: Date;               // para borrado lógico
  addresses: [                    // array de direcciones
    {
      street: string;             // requerido
      city: string;               // requerido
      country: string;            // requerido
      postal_code: string;        // requerido
    }
  ]
}
```

## Endpoints API

### Crear Usuario:
- **POST** `/users`
- **Body:**
```typescript

{
  "name": "Juan Pérez",
  "email": "juan@ejemplo.com",
  "age": 30,
  "addresses": [
    {
      "street": "Av. Principal",
      "city": "Lima",
      "country": "Perú",
      "postal_code": "15001"
    },
    ...
  ]
}
```

### Listar Usuarios:
- **GET** `/users`
- **Parámetros Query:** (Si se pasa alguno de estos parámetros, se activa la paginación)
  - `page`: número de página (**Opcional**, si no se especifica es 1)
  - `limit`: resultados por página (**Opcional**, si no se especifica es 10)

### Obtener Usuario por ID:
- **GET** `/users/:id`

### Actualizar Usuario:
- **PUT** `/users/:id`
- **Body:** Similar al de creación (campos opcionales)

### Eliminar Usuario:
- **DELETE** `/users/:id`

### Buscar Usuarios por Ciudad:
- **GET** `/users/search`
- **Parámetros Query:** (Si se pasa alguno de estos parámetros, se activa la paginación)
  - `city`: nombre de la ciudad (**Requerido**) 
  - `page`: número de página (**Opcional**, si no se especifica es 1)
  - `limit`: resultados por página (**Opcional**, si no se especifica es 10)

## Formato de Respuestas

### Respuesta Exitosa
```typescript
{
  "success": true,
  "message": "Success message",
  "data": {},                     // datos solicitados
  "pagination": {                 // endpoints paginados (opcional)
    "total": 100,                 // total de resultados
    "page": 1,                    // página actual
    "limit": 10,                  // resultados por página
    "pages": 10,                  // total de páginas
    "hasNextPage": true,          // si hay página siguiente
    "hasPrevPage": false          // si hay página anterior
  }
}
```

### Respuesta de Error
```typescript
{
  "success": false,
  "error": "Error message"
}
```

## Códigos de Estado

- `200`: Operación exitosa
- `201`: Recurso creado exitosamente
- `400`: Error de validación o solicitud incorrecta
- `404`: Recurso no encontrado
- `409`: Conflicto (ej: email duplicado)
- `500`: Error interno del servidor

## Validaciones

- Email único y formato válido
- Campos requeridos de usuario
- Estructura correcta del array de direcciones
- Formato válido de ID (MongoDB ObjectId)

## Características Adicionales

- Paginación implementada en endpoints de listado
- Variables de entorno configuradas con dotenv
- Manejo de errores centralizado
- TypeScript para mejor tipado
- Borrado lógico para mantener histórico

## Notas de Desarrollo

- Implementa arquitectura en capas (controladores, servicios, modelos)
- Utiliza express-validator para validaciones
- Incluye manejo de errores personalizado
- Documentación inline en el código
