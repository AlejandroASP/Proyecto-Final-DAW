# Dockerfile para back
FROM node:16-alpine

WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos
COPY . .

# Expone el puerto en el que correrá el servidor
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["node", "server.js"]
