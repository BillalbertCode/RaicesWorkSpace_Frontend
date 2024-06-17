![Raices WorkSpace](https://th.bing.com/th/id/OIG1.glJIctD5DwA61dYaMCDn?pid=ImgGn)

# Raíces - Plataforma WorkSpace (Frontend)

Bienvenido/a al Frontend de Raíces, una plataforma WorkSpace para compartir tus pensamientos y creaciones con la comunidad. Este Frontend utilizo las API proporcionadas por el backend para la creacion de usuarios, manejar publicaciones, comentarios y más.

## Descripción
Este proyecto es una aplicación frontend que muestra artículos y permite a los usuarios cargarlos y eliminarlos. Los usuarios pueden ver un número limitado de artículos y cargar más a través de la paginación.

## Tecnologias Usadas

- React
- NextJS
- React Bootstrap
- react-hot-toast

## Estructura del proyecto

- components/: Contiene los componentes de React utilizados en la aplicación.
    - articles/: Todos los componentes relacionado a los articles  
        - ArticleCard.js: Componente que muestra la información de un artículo.
        - ArticleConfig.js: Componente que proporciona botones de edición y eliminación de artículos.
        - ArticlesAll.js: Componente que maneja la lista de artículos y la paginación.
        - ArticleForm.js: Componente que controla la creacion de articles

    - Layout/: Contiene los componentes de React que se encargan de la estructura de la aplicación.
        - Header.js: Componente que muestra el título de la aplicación y la navegacion
        - ConexionError.js: Componente que muestra si hubo algun tipo de error
        - LayoutHome.js: Componente que muestra el layout del home

    - User/: Todos los articles relacionados con el usuario
        - ProfileComponente.js: Muestra el profile del usuario
        - ProfileVisitComponente.js: Muestra el profile del usuario
        - Forms/: Los formularios relacionados a los usuario
            - LoginForm.js: Formulario de inicio de sesión
            - RegisterForm.js: Formulario de Creacion de usuarios
    
    - utils/: Componentes de Utilidades adicionales
        - CuadroAnimation.js: Cuadros Animados para el background
        - LoginModal.js: Modal del Login
        - Notifications.js: Todas las notificaciones que tendra el Usuario
        - UserDeleteModa.js: Modal que avisa antes de eliminar el usuario 
- contexts/: Contiene los contextos de React.
    - ArticleContext.js: Control de los articles mostrados
    - UserContext.js: Control de la data de los usuarios

- pages/: Contiene las paginas a ingresar

- styles/: Contiene los estilos globales y modulares de lo componentes

- utils/: Contiene las funciones script como Apis, hooks
    - api/: 
        - fetchDeleteArticle.js
        - fetchDeleteUser.js
        - fetchLogin.js
        - fetchPostArticle.js
        - fetchPostRegister.js
        - fetchPutUser.js
    - hooks/:
        - useValidateFields.js: Verificacion de campos de un formulario
    - formateDate.js: Formato de fecha
    - handleChange.js: actualizacion de estado de un formulario
    - requireAge.js: Edad requerida para ciertos eventos
    - validateFieldText.js: Validacion de campos de texto
    - verifyPassword.js: verificacion de contraseña

Si tienes alguna pregunta o sugerencia, no dudes en abrir un issue o ponerte en contacto a través de BillalberCode@gmail.com.