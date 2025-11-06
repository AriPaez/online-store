# Usar una imagen base de Node.js
FROM node:18

# Establecer el directorio de trabajo
WORKDIR /app

# Copiar los archivos necesarios
COPY package*.json ./
COPY . .

# Instalar dependencias
RUN npm install

# Construir la aplicación
RUN npm run build

# Exponer el puerto 4050
EXPOSE 4050

# Comando por defecto
CMD ["npm", "start"]
