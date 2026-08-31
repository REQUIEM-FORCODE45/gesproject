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
