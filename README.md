# Vortex

El proyecto Vortex es una aplicación web que permite a los usuarios comprar juegos. 

Los usuarios podrán registrarse, comprar y editar su perfil.

## Instalación

Para instalar el proyecto será necesario tener instalado
- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/).

Primero, se deberá clonar el repositorio en la carpeta deseada. Una vez clonado, instalar las dependencias del proyecto con el siguiente comando: 

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

Para poder hacer uso de la base de datos será necesario tener instalado
- [MySQL](https://www.mysql.com/).
Una vez instalado, se deberá importar los archivos necesarios para la creación de la base de datos. 

Ya hay un usuario en la base de datos para poder acceder:

```Usuario
Usuario: Vortex_Admin
Contraseña: Vortex_7788
```

## Estructura del proyecto

El proyecto está dividido en dos partes fundamentales: Frontend y Backend.

### Frontend

La parte de frontend del proyecto está desarrollada con
- [React](https://es.reactjs.org/).
La estructura de la carpeta es la siguiente:

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

La parte de backend del proyecto está desarrollada con
- [Node.js](https://nodejs.org/)
La estructura de la carpeta es la siguiente:

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

En la aplicación se podrán diferenciar dos tipos de usuarios: administradora y usuarios normales.
Los administradores tendrán acceso a una serie de funcionalidades que los usuarios normales no tendrán.

### Administradora

- Deshabilitar usuarios.
- Habilitar usuarios.
- Crear y eliminar clases.

### Usuarios normales

- Ver los productos disponibles.
- Registrarse.
- Añadir productos al carrito.
- Editar su perfil.

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








