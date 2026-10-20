@echo off
title TITAN-LAB — SUBIDA A GITHUB (ACTUALIZACION v75)
echo ===========================================================================
echo 🚀 Sincronizando TITAN Interactive Cosmos Lab con GitHub
echo    Repositorio: https://github.com/cyberenigma-lgtm/TITAN-Interactive-Cosmos-Lab.git
echo ===========================================================================
echo.

cd /d "%~dp0"

echo [GIT] Verificando estado del commit v75...
git log -1 --oneline

echo.
echo [GIT] Subiendo actualizacion completa a la rama main en GitHub...
git push origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===========================================================================
    echo ✅ SUBIDA COMPLETADA EXITOSAMENTE
    echo    Visita: https://github.com/cyberenigma-lgtm/TITAN-Interactive-Cosmos-Lab
    echo ===========================================================================
) else (
    echo.
    echo ===========================================================================
    echo ⚠️ ATENCION: Git requiere autorizacion de credenciales.
    echo    Si es necesario, introduzca su token de GitHub o autorice en el navegador.
    echo ===========================================================================
)

echo.
pause
