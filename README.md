# GesProject

Sistema de gestión basado en VIGTEC - Node.js, Express, MongoDB y EJS

## Stack
- Node.js + Express
- MongoDB + Mongoose
- EJS + express-ejs-layouts
- Passport.js (autenticación)

## Instalación
```bash
npm i
cp .env.example .env  # configurar MONGO_URI y secrets
npm run dev
```

## Variables de entorno (.env)
```
MONGO_URI=mongodb://...
PORT=5000
SESSION_SECRET=...
SESSION_CRYPTO_SECRET=...
```

## Scripts
- `npm start` - producción
- `npm run dev` - desarrollo (nodemon)

## Instalación en Raspberry Pi (con PM2)

### 1. Instalar Node.js con nvm (si no está instalado)

```bash
# Descarga e instala nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash

# en lugar de reiniciar la shell
\. "$HOME/.nvm/nvm.sh"

# Descarga e instala Node.js:
nvm install 24

# Verifica la versión de Node.js:
node -v # Debería mostrar "v24.20.0".

# Verifica versión de npm:
npm -v # Debería mostrar "11.19.0".
```

> Para futuras sesiones, nvm se carga automáticamente. Si `nvm` no se encuentra, ejecuta `\. "$HOME/.nvm/nvm.sh"` o reinicia la terminal.

### 2. Clonar y configurar el proyecto

```bash
git clone <URL_DEL_REPO> gesproject
cd gesproject
npm i
cp .env.example .env
# Editar .env y configurar MONGO_URI, PORT, SESSION_SECRET y SESSION_CRYPTO_SECRET
nano .env
```

### 3. Instalar y usar PM2

```bash
npm i -g pm2
pm2 --version

# Iniciar la app
pm2 start app.js --name gesproject

# Ver logs y estado
pm2 logs gesproject
pm2 list
pm2 monit

# Reiniciar / detener
pm2 restart gesproject
pm2 stop gesproject
```

Opcional con `ecosystem.config.js`:

```js
// ecosystem.config.js
module.exports = {
  apps: [{
    name: "gesproject",
    script: "app.js",
    instances: 1,
    exec_mode: "fork",
    env: {
      NODE_ENV: "production",
      PORT: 5000
    },
    max_memory_restart: "300M"
  }]
};
```
```bash
pm2 start ecosystem.config.js --env production
```

### 4. Autoinicio al reiniciar la Raspberry

```bash
pm2 save
pm2 startup
# Ejecutar el comando que te indique pm2 startup (con sudo) y luego:
pm2 save
```

Verificar tras reiniciar:
```bash
sudo reboot
pm2 list
```

### 5. Actualizar la app

```bash
cd ~/gesproject
git pull
npm i
pm2 restart gesproject
```

### Notas
- El proyecto usa MongoDB Atlas (ver `MONGO_URI` en `.env`), no requiere Mongo local en la Raspberry.
- Si `bcrypt` falla al compilar en ARM: `sudo apt install -y build-essential python3 && npm rebuild`.
- Puerto por defecto `5000` (cambiar en `.env` si es necesario y abrir en firewall `sudo ufw allow 5000`).
