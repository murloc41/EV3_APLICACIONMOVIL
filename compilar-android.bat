@REM Script para compilar y testear en Android Studio - Windows
@REM Uso: Guarda como "compilar-android.bat" en G:\Esculappmed
@REM Luego: compilar-android.bat

@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

echo.
echo ╔═══════════════════════════════════════════════════════════╗
echo ║  🚀 COMPILAR Y ABRIR EN ANDROID STUDIO                    ║
echo ║     Esculappmed - Evaluación EV3                          ║
echo ╚═══════════════════════════════════════════════════════════╝
echo.

cd /d G:\Esculappmed

echo [1/4] 📦 Compilando app...
echo.
call npm run build
if %ERRORLEVEL% neq 0 (
    echo.
    echo ❌ Error en compilación. Verifica que npm está instalado.
    pause
    exit /b 1
)

echo.
echo [2/4] 🔄 Copiando archivos a Android...
echo.
call npx cap copy android
if %ERRORLEVEL% neq 0 (
    echo.
    echo ❌ Error al copiar. Verifica que Capacitor está instalado.
    pause
    exit /b 1
)

echo.
echo [3/4] ⚙️  Sincronizando con Android...
echo.
call npx cap sync android
if %ERRORLEVEL% neq 0 (
    echo.
    echo ❌ Error al sincronizar.
    pause
    exit /b 1
)

echo.
echo [4/4] 🔓 Abriendo Android Studio...
echo.
call npx cap open android
if %ERRORLEVEL% neq 0 (
    echo.
    echo ❌ Error al abrir Android Studio. ¿Está instalado?
    pause
    exit /b 1
)

echo.
echo ✅ ¡Listo! Android Studio se está abriendo...
echo.
echo 📋 PRÓXIMOS PASOS EN ANDROID STUDIO:
echo.
echo   1. Espera a que se abra Android Studio
echo   2. Click en "Device Manager" (esquina superior derecha)
echo   3. Si no tienes emulador:
echo      - Click "Create device"
echo      - Selecciona "Pixel 5"
echo      - Selecciona "Android 13 (Tiramisu)"
echo      - Click "Create"
echo   4. Haz click en botón ▶️ (verde) para iniciar emulador
echo   5. Espera 1-2 minutos
echo   6. Click en Run (botón ▶️ grande)
echo   7. Selecciona el emulador
echo   8. ¡Listo!
echo.
echo 🧪 TESTS:
echo   - Crear paciente "TEST ANDROID"
echo   - Cerrar app completamente
echo   - Reabrir app
echo   - ¿Aparece "TEST ANDROID"? SI = ✅ FUNCIONA
echo.
pause
