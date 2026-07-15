# 🏦 XBank

Aplicación web desarrollada con React + Vite que simula un banco digital.

## Características

- Registro de usuarios con Firebase Authentication.
- Inicio de sesión.
- Dashboard del usuario.
- Consulta de saldo.
- Transferencias entre usuarios.
- Historial de movimientos.
- Validaciones de transferencias.
- Pruebas unitarias con Vitest.
- Pruebas de componentes con React Testing Library.

---

# Tecnologías

- React 19
- Vite
- Firebase Authentication
- Firestore Database
- Vitest
- React Testing Library
- JavaScript

---

# Instalación

Clonar el proyecto

```bash
git clone <URL_DEL_REPOSITORIO>
```

Entrar al proyecto

```bash
cd xbank
```

Instalar dependencias

```bash
npm install
```

---

# Variables de entorno

Crear un archivo `.env` con las credenciales de Firebase.

Ejemplo:

```env
VITE_FIREBASE_API_KEY=xxxxxxxx
VITE_FIREBASE_AUTH_DOMAIN=xxxxxxxx
VITE_FIREBASE_PROJECT_ID=xxxxxxxx
VITE_FIREBASE_STORAGE_BUCKET=xxxxxxxx
VITE_FIREBASE_MESSAGING_SENDER_ID=xxxxxxxx
VITE_FIREBASE_APP_ID=xxxxxxxx
```

---

# Ejecutar la aplicación

```bash
npm run dev
```

---

# Ejecutar los tests

```bash
npm test
```

---

# Ejecutar cobertura

```bash
npm run coverage
```

---

# Cobertura obtenida

Resultados obtenidos durante el desarrollo:

- Tests: **16 aprobados**
- Cobertura de líneas: **93.93%**
- Cobertura de Utils: **100%**

---

# Refactor realizado

Durante la Evaluación 3 se realizaron las siguientes mejoras:

- Separación del formulario de Login en un componente independiente (`LoginForm`).
- Extracción de las validaciones de transferencia a funciones puras (`validaciones.js`).
- Organización del proyecto en componentes reutilizables.
- Mejora de la estructura para facilitar las pruebas unitarias.

---

# Pruebas implementadas

## Validaciones

- Correo vacío
- Correo inválido
- Monto vacío
- Monto inválido
- Monto decimal
- Monto negativo
- Monto cero
- Saldo insuficiente
- Transferencia al mismo usuario
- Transferencia válida

## Componentes

- LoginForm
- TransferForm
- MovementList

## Mocks

Se utilizaron mocks con Vitest para simular:

- Inicio de sesión
- Registro
- Transferencias

---

# Uso de Inteligencia Artificial

Durante el desarrollo de la Evaluación 3 se utilizó ChatGPT como herramienta de apoyo para:

- refactorización del código;
- generación de pruebas unitarias;
- configuración de Vitest;
- creación de mocks;
- mejora de la estructura del proyecto.

Todo el código fue revisado, probado y adaptado antes de incorporarlo al proyecto.

---

# Autor

Felipe Espinoza

Evaluación 3 — Desarrollo Frontend

INACAP