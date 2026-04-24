@echo off
echo ========================================
echo Love Coupons - Deployment Script
echo ========================================
echo.

echo Paso 1: Verificando archivos...
if not exist ".gitignore" (
    echo Error: .gitignore no encontrado
    pause
    exit /b 1
)

if not exist "server\server.js" (
    echo Error: server/server.js no encontrado
    pause
    exit /b 1
)

echo Archivos verificados
echo.

echo Paso 2: Recordatorio de configuracion
echo.
echo IMPORTANTE: Antes de continuar...
echo.
echo 1. Crea un repositorio en GitHub
echo 2. Configura MongoDB Atlas y obtén la URI
echo 3. Actualiza API_BASE en js/coupons.js con tu URL de Railway
echo 4. Crea server/.env.example (NO subas .env real)
echo.
echo ¿Ya hiciste esto? Presiona cualquier tecla para continuar...
pause >nul

echo.
echo Paso 3: Preparando Git...
echo.

if not exist ".git" (
    echo Inicializando repositorio Git...
    git init
    git add .
    git commit -m "Initial commit - Love Coupons"
) else (
    echo Repositorio Git ya existe. Agregando cambios...
    git add .
    git commit -m "Update - Love Coupons"
)

echo.
echo Paso 4: Subir a GitHub
echo.
echo Ejecuta estos comandos manualmente:
echo.
echo git remote add origin https://github.com/TU_USUARIO/TU_REPO.git
echo git branch -M main
echo git push -u origin main
echo.
echo Luego:
echo 1. Ve a Railway.app y despliega desde GitHub
echo 2. Configura las variables de entorno en Railway
echo 3. Ve a GitHub Pages en Settings y activa Pages
echo.

echo Listo para desplegar!
echo.
echo Lee DEPLOYMENT.md para instrucciones detalladas.
echo.

pause