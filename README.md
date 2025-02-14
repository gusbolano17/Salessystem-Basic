# SalesSystem Basic - MERN Stack

## Descripción
Este es un sistema básico de gestión de ventas desarrollado con el stack MERN (MongoDB, Express.js, React, Node.js). Permite administrar clientes, productos y registrar ventas de manera eficiente.

## Características
- **Autenticación de usuarios** (login y registro con JWT)
- **Gestión de clientes** (crear, editar, eliminar y listar clientes)
- **Gestión de productos** (crear, editar, eliminar y listar productos. WIP)
- **Registro de ventas** (asociadas a clientes y productos. WIP)
- **Dashboard** con métricas básicas de ventas(WIP)
- **Interfaz amigable y responsiva con Material UI**

## Tecnologías Utilizadas
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)

- **Frontend:** React + Vite + MUI (Material UI)
- **Backend:** Node.js + Express.js
- **Base de Datos:** MongoDB con Mongoose
- **Autenticación:** JSON Web Token (JWT)


## Instalación y Configuración

### 1. Clonar el repositorio
```sh
git clone https://github.com/gusbolano17/Salessystem-Basic.git
cd sistema-ventas-mern
```

### 2. Configurar el Backend
```sh
cd backend
npm install
```
Crear un archivo `.env` en la carpeta `backend` con las siguientes variables:
```
MONGO_URI=mongodb://localhost:27017/ventasDB
JWT_SECRET=tu_clave_secreta
```
Ejecutar el servidor:
```sh
npm start
```

### 3. Configurar el Frontend
```sh
cd ../frontend
npm install
```
Ejecutar la aplicación:
```sh
npm run dev
```
---
Desarrollado por gusbolano17
