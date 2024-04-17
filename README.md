# Rincón Canino

El proyecto Rincón Canino es una aplicación web que permite a los usuarios reservar clases y estancias para sus mascotas. 

La administradora de la aplicación podrá gestionar las clases, los usuarios y las mascotas. Por otro lado, los usuarios podrán reservar clases y estancias para sus mascotas, además de poder ver las fotos de sus mascotas.

## Instalación

Para instalar el proyecto será necesario tener instalado [Node.js](https://nodejs.org/) y [npm](https://www.npmjs.com/).

Primero, se deberá clonar el repositorio en la carpeta deseada. Una vez clonado, se deberá instalar las dependencias del proyecto con el siguiente comando: 

```bash
npm install
```

## Uso

Para ejecutar la parte de frontend del proyecto en modo desarrollo, se deberá ejecutar el siguiente comando estando dentro de la carpeta Frontend:

```bash
npm run dev
```

Por otro lado, para ejecutar la parte de backend del proyecto en modo desarrollo, se deberá ejecutar el siguiente comando estando dentro de la carpeta Backend:

```bash
node app.js
```

>> De momento, cada parte del proyecto se ejecuta por separado. En un futuro, se unificarán en un solo comando. 

>> Cada vez que se haga un cambio en el backend, se deberá reiniciar el servidor.

## Configuraciones necesarias

Para que el proyecto funcione correctamente, será necesario crear un archivo .env en la carpeta Backend con las siguientes variables de entorno:

```bash
MYSQL_PASSWORD=CambiarPorContraseña
```

Además, en el fichero /Backend/server/db.js se deberá cambiar el usuario y la contraseña de la base de datos por los que se tengan en el sistema.

```javascript
const sequelize = new Sequelize('nombre_schema', 'nombre_usuario', process.env.MYSQL_PASSWORD, {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql',
});
```

Para poder hacer uso de la base de datos será necesario tener instalado [MySQL](https://www.mysql.com/). Una vez instalado, se deberá importar los archivos necesarios para la creación de la base de datos. 

Además se tendrá que añadir un usuario en la base de datos con el siguiente comando:

```sql
CREATE USER 'nombre_usuario'@'%' IDENTIFIED BY 'contraseña';
GRANT ALL PRIVILEGES ON *.* TO 'nombre_usuario'@'%';
FLUSH PRIVILEGES;
```

Esto hará que se pueda acceder a la base de datos desde cualquier dirección IP.

## Estructura del proyecto

El proyecto está dividido en dos partes fundamentales: Frontend y Backend.

### Frontend

La parte de frontend del proyecto está desarrollada con [React](https://es.reactjs.org/). La estructura de la carpeta es la siguiente:

```bash
Frontend
├── public
├── src
│   ├── components
│   ├── pages
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── tailwind.config.js
```

### Backend

La parte de backend del proyecto está desarrollada con [Node.js](https://nodejs.org/) y [Express](https://expressjs.com/). La estructura de la carpeta es la siguiente:

```bash
Backend
├── models
├── server
│   ├── routes
│   ├── db.js
├── .gitignore
├── app.js
├── package.json
├── package-lock.json
```

## Tecnologías utilizadas

- [React](https://es.reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [MySQL](https://www.mysql.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Heroicons](https://heroicons.com/)
- [Sequelize](https://sequelize.org/)
- [React Suite](https://rsuitejs.com/)
- [Vite](https://vitejs.dev/)

### Recomendados

- [Visual Studio Code](https://code.visualstudio.com/)
- [MySQL Workbench](https://www.mysql.com/products/workbench/)
- [Postman](https://www.postman.com/)
- [Git](https://git-scm.com/)
- [Prettier](https://prettier.io/)
- [ESLint](https://eslint.org/)

## Frontend

En la aplicación se podrán diferenciar dos tipos de usuarios: administradora y usuarios normales. Los administradores tendrán acceso a una serie de funcionalidades que los usuarios normales no tendrán.

### Administradora

- Deshabilitar usuarios.
- Habilitar usuarios.
- Crear y eliminar clases.
- Añadir imágenes asociadas a las mascotas.

### Usuarios normales

- Ver las clases disponibles.
- Registrar a su mascota.
- Reservar una clase y/o estancias.
- Ver las clases y estancias reservadas.
- Ver las fotos de su mascota.

Por otro lado, ambos tipos de usuarios podrán ver la información sobre los futuros eventos relacionados con el propio usuario.

### Páginas

- Perfil de usuario. --> Se diferencia entre administradora y usuario normal.
- Inicio de sesión.
- Registro de usuario.
- Fotos de la mascota.
- Calendario. --> Fuente: https://jquense.github.io/react-big-calendar/examples/?path=/story/about-big-calendar--page
- Página no encontrada.

>> Las páginas de contacto están creadas sin embargo están sin uso ya que la clienta no las requiere de momento.

## Backend

El backend del proyecto está desarrollado con Node.js y Express. Se ha utilizado Sequelize como ORM para la base de datos MySQL. 

### Base de datos

La base de datos está compuesta por las siguientes tablas:

- cliente
- mascota
- clase
- estancia
- admin
- fotos

La estructura de cada tabla se puede observar en los ficheros del directorio /Backend/models.

## Tests

De momento, no se han realizado tests para el proyecto. En un futuro, se realizarán tests para comprobar el correcto funcionamiento del proyecto.








