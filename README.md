# tapecloud-portal

Portal principal del ecosistema TapeCloud, desarrollado con React y Vite.

## Responsabilidad

El portal es la entrada común para el usuario. Su función es presentar TapeCloud y permitir el acceso o la navegación hacia las aplicaciones del ecosistema:

- TapeBeat
- TapeFlix

La autenticación y los datos compartidos deben resolverse mediante `tapecloud-auth-core`.

## Estado actual

Contiene una aplicación React funcional de base, con su configuración de Vite, punto de entrada y estilos principales. La integración completa con autenticación y navegación protegida se desarrollará sobre esta base.

## Desarrollo

```powershell
npm install
npm run dev
npm run build
```

La rama de desarrollo es `develop`. `node_modules` y `dist` están excluidos mediante `.gitignore`.
