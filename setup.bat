@echo off
echo ========================================
echo    Love Coupons - Setup Script
echo ========================================
echo.

cd server

echo Instalando dependencias del backend...
npm install

echo.
echo ========================================
echo    Configuración completada!
echo ========================================
echo.
echo Pasos siguientes:
echo 1. Edita server/.env con tus credenciales de MongoDB Atlas
echo 2. Ejecuta: cd server && npm start
echo 3. Abre index.html en tu navegador
echo.
echo ¡Listo para usar Love Coupons! ❤️
echo.

pause