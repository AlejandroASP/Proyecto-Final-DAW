# Dockerfile para front
FROM node:16-alpine

WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de los archivos
COPY . .

# Construye la aplicación
RUN npm run build

# Sirve la aplicación estática con un servidor simple
RUN npm install -g serve
CMD ["serve", "-s", "dist", "-l", "3000"]

EXPOSE 3000
