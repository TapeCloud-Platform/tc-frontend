
TAPECLOUD
PLATFORM
Project Scope Document
Documento de Alcance del Proyecto



TapeCloud  ·  TapeFlix  ·  TapeBeat
Versión 1.0  —  MVP
Junio 2025

1. Resumen Ejecutivo
TapeCloud Platform es un ecosistema digital compuesto por tres sistemas interconectados: TapeCloud, el núcleo de autenticación centralizada (SSO), y dos aplicaciones cliente, TapeFlix y TapeBeat. El proyecto establece una plataforma unificada que permite a un usuario autenticarse una única vez y acceder a los servicios de streaming de contenido audiovisual y musical para los que tenga permisos habilitados.

El alcance de esta primera fase corresponde a un MVP (Producto Mínimo Viable), orientado a validar la arquitectura de autenticación centralizada, la experiencia de portal unificado y las funcionalidades básicas de cada aplicación cliente. Se priorizan consistencia, trazabilidad de sesiones y simplicidad operativa.

Campo
Detalle
Nombre del proyecto
TapeCloud Platform
Tipo de proyecto
Plataforma SSO + Aplicaciones Cliente
Fase
MVP — Versión 1.0
Sistemas involucrados
TapeCloud, TapeFlix, TapeBeat
Modalidad de acceso
Single Sign-On (SSO) centralizado
Audiencia objetivo
Usuarios finales con acceso autorizado; administradores del sistema


2. Objetivo General
Construir una plataforma digital unificada que centralice la autenticación de usuarios en TapeCloud y que permita el acceso controlado a TapeFlix y TapeBeat, garantizando que cada usuario inicie sesión una sola vez, acceda únicamente a las aplicaciones habilitadas para su perfil, y experimente una identidad visual y de sesión coherente en todos los sistemas.
3. Problema que Resuelve la Plataforma
Sin una capa de autenticación centralizada, cada aplicación del ecosistema requeriría su propio sistema de login, gestión de contraseñas, control de sesiones y administración de permisos. Esto genera los siguientes problemas:

Duplicación de credenciales: el usuario necesita cuentas y contraseñas distintas para cada servicio.
Inconsistencia en permisos: los roles y accesos se gestionan de forma aislada, sin visión centralizada.
Sobrecarga administrativa: los administradores deben operar múltiples paneles independientes.
Experiencia fragmentada: el usuario percibe plataformas desconectadas, sin cohesión de marca ni de sesión.
Falta de trazabilidad: las sesiones activas no son visibles ni controlables desde un punto único.

TapeCloud resuelve estos problemas al actuar como eje central de identidad: una cuenta, un login, un panel de control, y acceso fluido a todos los servicios autorizados.

4. Arquitectura General de la Solución
La arquitectura adopta el modelo Hub-and-Spoke: TapeCloud es el hub central de identidad y las aplicaciones cliente son los spokes. Esta decisión se justifica porque maximiza la reutilización de la lógica de autenticación, simplifica la incorporación de nuevas aplicaciones en el futuro, y concentra el control de acceso en un único punto auditable.

4.1 Diagrama conceptual de la arquitectura

[ USUARIO FINAL ]
v  Login unico
+------------------------------+
|       TAPECLOUD (SSO)        |
|  Auth  Roles  Sesiones       |
|  Portal de Aplicaciones      |
+------------------------------+
/  Token SSO          Token SSO  \
[ TAPEFLIX ]                    [ TAPEBEAT ]
Peliculas y Series                 Musica y Albums


4.2 Principios arquitecturales
Autenticación única y centralizada: ninguna aplicación cliente gestiona credenciales propias.
Sesión compartida: una sesión activa en TapeCloud es válida en todas las aplicaciones habilitadas.
Control de acceso por rol: TapeCloud determina qué aplicaciones ve y puede usar cada usuario.
Identidad visual unificada: las tres plataformas comparten paleta de colores, tipografía y lenguaje de marca.
Bajo acoplamiento entre apps cliente: TapeFlix y TapeBeat no se comunican entre sí directamente.

5. TapeCloud — Sistema Central de Autenticación (SSO)
TapeCloud es el sistema núcleo de la plataforma. Toda interacción de usuarios con cualquiera de las aplicaciones cliente comienza y es validada por TapeCloud. Es el único sistema con capacidad de crear, modificar, suspender y eliminar usuarios, y el único que emite tokens de sesión reconocidos por las aplicaciones cliente.

5.1 Responsabilidades de TapeCloud
Gestión de usuarios: alta, baja, modificación y suspensión de cuentas.
Autenticación: validación de credenciales y emisión de sesiones SSO.
Gestión de roles y permisos: definición de qué aplicaciones puede usar cada usuario.
Registro de aplicaciones cliente: alta y configuración de TapeFlix y TapeBeat como sistemas habilitados.
Portal de aplicaciones: interfaz donde el usuario visualiza y accede a sus apps disponibles.
Gestión de sesiones: visualización y revocación de sesiones activas.
Cambio obligatorio de contraseña: flujo forzado en el primer acceso.

5.2 Posición en el ecosistema
TapeCloud no es una aplicación de contenido. Su interfaz pública está restringida al login, al portal de aplicaciones y a la gestión de cuenta personal. Su panel administrativo está reservado exclusivamente para administradores del sistema.
6. TapeFlix — Plataforma de Películas y Series
TapeFlix es una aplicación cliente orientada al consumo y organización de contenido audiovisual: películas y series. No gestiona usuarios propios; delega completamente la autenticación en TapeCloud. Recibe del SSO la identidad del usuario y sus permisos, y construye sobre esa base la experiencia de exploración y organización de contenido.

6.1 Propósito
Proveer una experiencia de catálogo visual donde el usuario pueda explorar, filtrar, marcar y organizar películas y series según su estado de visionado personal (visto / pendiente) y sus favoritos.

6.2 Alcance de TapeFlix en el MVP
Catálogo visual de películas y series.
Buscador por título.
Filtros por género, año de estreno y tipo de contenido (película / serie).
Página de detalle de cada título con información descriptiva.
Marcado de contenido como Favorito.
Marcado de estado: Visto o Pendiente de ver.

6.3 Identidad visual
El diseño está inspirado en la estética de Letterboxd: foco en la imagen de portada, información visual densa, paleta oscura y tipografía clara. Cada tarjeta de contenido privilegia la identidad visual del título por sobre el texto.

7. TapeBeat — Plataforma de Música
TapeBeat es una aplicación cliente orientada a la exploración y organización de contenido musical: álbumes y artistas. Al igual que TapeFlix, no gestiona autenticación propia. Confía en TapeCloud para identificar al usuario y determinar sus permisos de acceso.

7.1 Propósito
Proveer una experiencia de catálogo musical donde el usuario pueda explorar, filtrar, marcar y organizar álbumes y artistas según su estado de escucha personal (escuchado / pendiente) y sus favoritos.

7.2 Alcance de TapeBeat en el MVP
Catálogo visual de álbumes y artistas.
Buscador por título o nombre de artista.
Filtros por género musical y artista.
Página de detalle de cada álbum o artista con información descriptiva.
Marcado de contenido como Favorito.
Marcado de estado: Escuchado o Pendiente de escuchar.

7.3 Identidad visual
El diseño está inspirado en aplicaciones modernas de descubrimiento musical: cuadrículas de portadas de álbumes, paleta oscura con acentos vibrantes, y énfasis en la identidad visual del artista. La experiencia visual prioriza el artwork musical.

8. Flujo Completo de Autenticación SSO
El siguiente flujo describe paso a paso la experiencia de autenticación, desde el primer acceso del usuario hasta su ingreso a una aplicación cliente, incluyendo el caso especial del cambio obligatorio de contraseña.

8.1 Flujo de primer acceso (alta de usuario)

Paso
Actor
Acción
1
Administrador
Crea el usuario en el panel de TapeCloud, asigna rol y permisos de aplicaciones.
2
Sistema (TapeCloud)
Genera credenciales temporales y las comunica al usuario.
3
Usuario
Accede a la URL de TapeCloud e ingresa sus credenciales temporales.
4
Sistema (TapeCloud)
Detecta primer acceso → redirige al flujo de cambio obligatorio de contraseña.
5
Usuario
Define una nueva contraseña que cumple los requisitos mínimos de seguridad.
6
Sistema (TapeCloud)
Valida y guarda la nueva contraseña. Inicia sesión SSO activa.
7
Sistema (TapeCloud)
Muestra el Portal de Aplicaciones con los sistemas habilitados para el usuario.


8.2 Flujo de acceso regular (sesión nueva)

Paso
Actor
Acción
1
Usuario
Accede a TapeCloud (o a cualquier aplicación cliente que redirija al SSO).
2
Usuario
Ingresa email y contraseña en el login de TapeCloud.
3
Sistema (TapeCloud)
Valida credenciales. Si son correctas, genera token de sesión SSO.
4
Sistema (TapeCloud)
Redirige al Portal de Aplicaciones mostrando solo las apps habilitadas.
5
Usuario
Selecciona TapeFlix o TapeBeat desde el portal.
6
Sistema (app cliente)
Verifica el token SSO con TapeCloud. Si es válido, permite el acceso sin nuevo login.


8.3 Flujo de cierre de sesión
El usuario puede cerrar sesión desde cualquier aplicación cliente o desde TapeCloud.
El cierre de sesión en TapeCloud invalida el token SSO en todas las aplicaciones activas.
El cierre de sesión desde una aplicación cliente solo cierra esa sesión local; la sesión SSO sigue activa hasta que el usuario la cierre desde TapeCloud o expire por inactividad.

9. Roles de Usuario y Permisos
El MVP contempla tres roles principales, todos gestionados exclusivamente desde TapeCloud. Los roles determinan qué acciones puede realizar cada usuario dentro del ecosistema.

Rol
Descripción
Acceso apps cliente
Panel Admin TC
Administrador
Gestiona usuarios, roles, permisos, sistemas y sesiones en TapeCloud.
Según permisos propios asignados.
Sí — acceso completo.
Usuario estándar
Consume contenido en las apps cliente a las que tiene acceso.
Sí — solo las apps habilitadas por el admin.
No.
Usuario suspendido
Cuenta desactivada temporalmente. No puede autenticarse.
No — acceso bloqueado.
No.


9.1 Granularidad de permisos por aplicación
En el MVP, el permiso de acceso a una aplicación es binario: el usuario tiene acceso total a TapeFlix, acceso total a TapeBeat, ambas, o ninguna. No se implementan permisos granulares dentro de cada aplicación cliente en esta fase.

10. Alcance Funcional de Cada Sistema

10.1 TapeCloud

Módulo
Funcionalidades incluidas en MVP
Autenticación
Login con email y contraseña. Cambio obligatorio en primer acceso. Cierre de sesión.
Gestión de usuarios
Crear, editar, suspender y eliminar usuarios. Asignar contraseña inicial.
Roles y permisos
Asignar rol (admin / estándar) y habilitar/deshabilitar acceso a cada app cliente.
Portal de aplicaciones
Vista personalizada con las apps disponibles para el usuario autenticado.
Gestión de sesiones
Ver sesiones activas del usuario. Revocar sesiones desde el panel admin.
Registro de sistemas
Alta y configuración de TapeFlix y TapeBeat como aplicaciones cliente del SSO.
Perfil de usuario
Ver y editar datos básicos de cuenta. Cambiar contraseña.


10.2 TapeFlix

Módulo
Funcionalidades incluidas en MVP
Home / Catálogo
Grilla visual de títulos disponibles. Acceso rápido a categorías destacadas.
Buscador
Búsqueda por título. Resultados en tiempo real o al confirmar.
Filtros
Filtrar por género, año de estreno y tipo (película / serie).
Detalle de título
Vista completa con portada, sinopsis, año, género, duración y elenco principal.
Favoritos
Marcar y desmarcar títulos como favorito. Lista personal de favoritos.
Estado de visionado
Marcar título como Visto o Pendiente. Lista personal de cada estado.


10.3 TapeBeat

Módulo
Funcionalidades incluidas en MVP
Home / Catálogo
Grilla visual de álbumes y artistas. Acceso rápido a categorías destacadas.
Buscador
Búsqueda por nombre de álbum o artista. Resultados en tiempo real o al confirmar.
Filtros
Filtrar por género musical y artista.
Detalle
Vista de álbum: portada, artista, año, género, tracklist. Vista de artista: discografía.
Favoritos
Marcar y desmarcar álbumes/artistas como favorito. Lista personal de favoritos.
Estado de escucha
Marcar álbum como Escuchado o Pendiente de escuchar. Lista personal de cada estado.


11. Alcance Fuera del Proyecto (Out of Scope)
Los siguientes elementos quedan explícitamente excluidos del MVP. Su exclusión responde a la necesidad de mantener el alcance controlado y minimizar la complejidad en la fase inicial.

11.1 Funcionalidades sociales
Seguimiento de otros usuarios (followers / following).
Mensajería o comunicación entre usuarios.
Puntuaciones o ratings comunitarios.
Feeds de actividad social.

11.2 Inteligencia y personalización avanzada
Motor de recomendaciones basado en historial o comportamiento.
Algoritmos de descubrimiento de contenido.
Sugerencias personalizadas de usuarios similares.

11.3 Reproducción y contenido multimedia
Reproducción de video o audio en streaming dentro de las aplicaciones.
Gestión de archivos multimedia o almacenamiento de contenido.
Subtítulos, calidad de video o configuración de reproducción.

11.4 Integraciones externas
Inicio de sesión con proveedores externos (Google, Facebook, Apple, etc.).
Integración con plataformas de terceros (Spotify, Netflix, TMDB, MusicBrainz).
APIs públicas expuestas a desarrolladores externos.

11.5 Funcionalidades administrativas avanzadas
Reportes y analíticas de uso de plataforma.
Gestión de planes o suscripciones de pago.
Configuración de políticas de contraseña avanzadas (MFA, SSO con SAML/OAuth externo).
Sistema de notificaciones por email o push.

11.6 Aplicaciones adicionales
Cualquier aplicación cliente adicional más allá de TapeFlix y TapeBeat.
Versión móvil nativa (iOS / Android) de cualquier sistema.

12. MVP Detallado
El MVP se define como el conjunto mínimo de funcionalidades que validan el modelo de negocio central: autenticación centralizada con acceso diferenciado a aplicaciones de contenido. Cada entregable está justificado por su carácter esencial para la operación del ecosistema.

12.1 Criterios de inclusión en el MVP
La funcionalidad es necesaria para que el flujo de autenticación SSO opere de extremo a extremo.
La funcionalidad es necesaria para que un usuario pueda explorar y organizar contenido en las apps cliente.
La ausencia de la funcionalidad bloquea el uso básico del sistema.

12.2 Entregables del MVP por sistema

TapeCloud
Login minimalista funcional con validación de credenciales.
Flujo de cambio obligatorio de contraseña en primer acceso.
Panel administrativo con gestión de usuarios, roles y permisos.
Portal de aplicaciones post-login con acceso a sistemas habilitados.
Registro y configuración de TapeFlix y TapeBeat como clientes SSO.
Gestión básica de sesiones activas.

TapeFlix
Integración con TapeCloud SSO (acceso solo con token válido).
Home con catálogo visual de películas y series.
Buscador por título.
Filtros por género, año y tipo de contenido.
Página de detalle de cada título.
Sistema de favoritos personal.
Sistema de estados: Visto / Pendiente.

TapeBeat
Integración con TapeCloud SSO (acceso solo con token válido).
Home con catálogo visual de álbumes y artistas.
Buscador por nombre de álbum o artista.
Filtros por género musical y artista.
Página de detalle de álbum y artista.
Sistema de favoritos personal.
Sistema de estados: Escuchado / Pendiente.

12.3 Condición de éxito del MVP
El MVP se considera exitoso cuando un usuario puede: (1) recibir sus credenciales de un administrador, (2) cambiar su contraseña en el primer acceso, (3) ver el portal de aplicaciones con sus sistemas habilitados, y (4) ingresar a TapeFlix y/o TapeBeat, explorar el catálogo, buscar contenido, marcarlo como favorito y asignarle un estado, todo sin necesidad de un segundo login.

13. Diseño de Interfaz Propuesto
El diseño sigue un sistema de diseño unificado: paleta oscura como base, tipografía sans-serif Verdana, y acentos de color diferenciado por sistema. La identidad visual comparte ADN entre las tres plataformas, pero cada una tiene su propio color de acento que refuerza su identidad.

TapeCloud
TapeFlix
TapeBeat
Acento: #E94560 (rojo carmín)
Acento: #E50914 (rojo Netflix)
Acento: #004A7B (azul oscuro profundo)
Base: #1A1A2E (navy oscuro)
Base: #1A1A1A (gris extremadamente oscuro)
Base: #1A1A1A (gris extremadamente oscuro)


13.1 TapeCloud — Diseño de interfaces

Login
Pantalla centrada, fondo oscuro (#1A1A2E), logotipo TapeCloud en la parte superior.
Formulario minimalista: campo email, campo contraseña, botón de acceso.
Mensaje de error inline (debajo del campo correspondiente), sin modales.
Sin opciones de registro público — el acceso es únicamente por invitación del administrador.
Enlace de recuperación de contraseña visible pero no prominente.

Cambio obligatorio de contraseña
Pantalla dedicada que reemplaza al portal tras el primer login exitoso.
Indicador claro de que se trata de un paso obligatorio antes de continuar.
Campos: nueva contraseña y confirmación. Indicador visual de fortaleza de contraseña.
Sin opción de omitir o postponer este paso.

Panel administrativo
Barra lateral de navegación con secciones: Usuarios, Roles, Sistemas, Sesiones.
Vista de tabla para listados (usuarios, sesiones activas, sistemas registrados).
Formularios en panel lateral o modal para creación y edición de registros.
Acciones rápidas inline: suspender, activar, revocar sesión.
Cabecera fija con nombre del administrador y acceso a cerrar sesión.

Portal de aplicaciones
Vista post-login para todos los usuarios autenticados.
Grilla de tarjetas: una por cada aplicación habilitada para el usuario.
Cada tarjeta muestra: logo de la aplicación, nombre y descripción breve.
Tarjetas de apps no habilitadas: no se muestran (no se muestran como deshabilitadas — directamente ocultas).
Acceso a perfil de usuario desde el portal (cambiar contraseña, datos básicos).

13.2 TapeFlix — Diseño de interfaces

Home / Catálogo
Barra superior fija: logotipo TapeFlix, buscador central, acceso a perfil y volver al portal.
Secciones horizontales de scroll: 'Recién agregados', 'Películas', 'Series'.
Tarjetas de contenido: imagen de portada dominante, título superpuesto en degradado inferior.
Hover sobre tarjeta: muestra botones rápidos de favorito y estado.
Paleta oscura (#1A1A1A), texto blanco, acento rojo (#E50914).

Buscador
Campo de búsqueda en la barra superior, expandible al hacer clic.
Resultados mostrados en grilla debajo del campo, reemplazando el home.
Cada resultado muestra portada, título, año y tipo.
Mensaje explícito cuando no hay resultados ('No se encontraron títulos para...')

Filtros
Panel de filtros desplegable desde el home o la vista de catálogo.
Filtros disponibles: Género (multiselección), Año (rango o listado), Tipo (Película / Serie).
Los filtros se aplican en tiempo real sobre el catálogo visible.
Botón de limpiar filtros visible cuando hay alguno activo.

Página de detalle
Imagen de portada grande en la mitad superior (banner tipo hero).
Información: título, año, género, duración, sinopsis, elenco principal.
Botones de acción prominentes: Marcar favorito, Marcar como Visto, Marcar como Pendiente.
Estado actual del usuario visible de forma inmediata (ícono + texto).

Favoritos y listas personales
Sección accesible desde el perfil o menú principal: Mis Favoritos, Visto, Pendiente.
Grilla de portadas con las mismas tarjetas del catálogo.
Opción de quitar de la lista directamente desde la grilla.

13.3 TapeBeat — Diseño de interfaces

Home / Catálogo
Barra superior fija: logotipo TapeBeat, buscador central, acceso a perfil y volver al portal.
Secciones de scroll: 'Álbumes destacados', 'Artistas', 'Géneros'.
Tarjetas cuadradas de álbum: artwork dominante, nombre del álbum y artista debajo.
Tarjetas de artista: foto circular o cuadrada con nombre superpuesto.
Paleta oscura (#1A1A1A), texto blanco, acento azul (#1DB954).

Buscador
Mismo comportamiento que TapeFlix: campo en barra superior, resultados en grilla.
Resultados distinguen entre álbumes y artistas con etiqueta visual.
Mensaje explícito cuando no hay resultados.

Filtros
Panel de filtros: Género musical (multiselección), Artista (búsqueda incremental dentro del filtro).
Filtros aplicados en tiempo real sobre el catálogo.
Botón de limpiar filtros visible cuando hay alguno activo.

Página de detalle — Álbum
Artwork del álbum en la mitad superior.
Información: nombre, artista, año, género, tracklist (lista de canciones sin reproductor).
Botones de acción: Marcar favorito, Marcar como Escuchado, Marcar como Pendiente.

Página de detalle — Artista
Imagen del artista en banner superior.
Información: nombre, género principal, descripción breve.
Discografía: grilla de álbumes del artista, cada uno linkeable a su página de detalle.
Botón de favorito del artista.

Favoritos y listas personales
Secciones: Mis Favoritos (álbumes y artistas), Escuchado, Pendiente.
Grilla de artworks con la misma estética del catálogo.
Opción de quitar de la lista directamente desde la grilla.
