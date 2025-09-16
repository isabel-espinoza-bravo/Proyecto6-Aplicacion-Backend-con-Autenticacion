# Proyecto Backend: Usuarios y Productos

## Descripción

Esta aplicación backend maneja **autenticación y autorización de usuarios** y permite la gestión de **productos** relacionados con cada usuario. Está construida con **Node.js**, **Express**, **MongoDB** y **Mongoose**.  

La aplicación incluye:

- Modelo de **Usuario**
- Modelo de **Reservas**
- Operaciones **CRUD** sobre productos
- Autenticación mediante **JWT**
- Conexión a **MongoDB Atlas**

---

## Tecnologías utilizadas

- Node.js
- Express.js
- MongoDB / Mongoose
- JWT (JSON Web Tokens)
- dotenv
- cors
- Render.com (despliegue)
- MongoDB Atlas (base de datos)

---

## Endpoints disponibles

### Usuario

| Descripción | Método | Endpoint | Caso de uso |
|------------|--------|----------|-------------|
| Registrar un usuario | POST | /api/user/register | Registro de usuario con nombre, correo y contraseña |
| Iniciar sesión | POST | /api/user/login | Inicio de sesión con correo y contraseña, devuelve JWT |
| Verificar token | GET | /api/user/verifytoken | Mantener sesión activa y validar JWT |
| Actualizar usuario | PUT | /api/user/update | Actualizar nombre, correo o contraseña |

### Reservas

| Descripción | Método | Endpoint | Caso de uso |
|------------|--------|----------|-------------|
| Crear producto | POST | /api/product/create | Agregar un nuevo producto con nombre, descripción y precio |
| Leer todos los productos | GET | /api/product/readall | Ver todos los productos disponibles |
| Leer producto específico | GET | /api/product/readone/:id | Ver detalles de un producto por ID |
| Actualizar producto | PUT | /api/product/update/:id | Modificar detalles de un producto específico |
| Eliminar producto | DELETE | /api/product/delete/:id | Eliminar un producto del catálogo |

---

## Objetivos de aprendizaje

- Comprender y aplicar **autenticación y autorización** en un backend.  
- Practicar **MongoDB y Mongoose** para modelar y relacionar datos.  
- Aplicar operaciones **CRUD** en servicios web.  
- Documentar servicios con **OpenAPI / Swagger**.  
- Desarrollar un backend completo usando **Node.js**, **Express**, **cors** y **dotenv**.  
- Desplegar la aplicación usando **MongoDB Atlas** y **Render.com**.





