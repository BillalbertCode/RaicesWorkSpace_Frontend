// src/mocks/db.js
// Usuarios de Prueba con IDs coherentes para los perfiles
export const MOCK_USERS = {
    "user-1": {
        _id: "user-1",
        name: "Raices",
        lastName: "Admin",
        username: "raices_oficial",
        profileIconUrl: "/images/icons/icono1.jpg",
        bio: "Administrador de la plataforma RaicesWorkSpace. Gestionando el contenido y la comunidad."
    },
    "user-2": {
        _id: "user-2",
        name: "Ana",
        lastName: "García",
        username: "ana_dev",
        profileIconUrl: "/images/icons/icono5.jpg",
        bio: "Fullstack Developer apasionada por React y Node.js. Siempre aprendiendo algo nuevo."
    },
    "user-3": {
        _id: "user-3",
        name: "Carlos",
        lastName: "Sánchez",
        username: "csanchez",
        profileIconUrl: "/images/icons/icono8.jpg",
        bio: "Explorador de nuevas tecnologías y amante del café. Escribo sobre arquitectura y clean code."
    }
};

// 8 Artículos vinculados a los usuarios anteriores
export const MOCK_ARTICLES = [
    {
        _id: "art-1",
        title: "Arquitectura Resiliente en Next.js",
        content: "Este artículo es una demostración de cómo el frontend puede seguir funcionando incluso cuando los servicios de backend están en mantenimiento o pausados por límites de crédito.",
        createAt: "2024-03-25T10:00:00.000Z",
        author: MOCK_USERS["user-1"]
    },
    {
        _id: "art-2",
        title: "Optimización de Componentes React",
        content: "Explorando el uso de hooks como useMemo y useCallback para mejorar el rendimiento de aplicaciones a gran escala en producción.",
        createAt: "2024-03-24T15:30:00.000Z",
        author: MOCK_USERS["user-2"]
    },
    {
        _id: "art-3",
        title: "El Futuro del Desarrollo Web",
        content: "¿Qué nos depara el 2024? Server Components, Edge Computing y el fin de los frameworks tradicionales. Analizamos las tendencias más calientes.",
        createAt: "2024-03-23T09:00:00.000Z",
        author: MOCK_USERS["user-3"]
    },
    {
        _id: "art-4",
        title: "Mastering CSS Grid",
        content: "Deja de pelear con Flexbox para layouts complejos y empieza a usar Grid como un pro. Trucos avanzados para grids responsivos.",
        createAt: "2024-03-22T12:00:00.000Z",
        author: MOCK_USERS["user-2"]
    },
    {
        _id: "art-5",
        title: "Guía de Seguridad en Node.js",
        content: "Protege tus APIs de ataques comunes como inyección NoSQL, XSS y CSRF. Mejores prácticas para autenticación robusta.",
        createAt: "2024-03-21T18:45:00.000Z",
        author: MOCK_USERS["user-1"]
    },
    {
        _id: "art-6",
        title: "Testing con Jest y RTL",
        content: "Si no testeas tu código, no sabes si funciona. Aprende lo básico de Unit Testing y Integration Testing con React Testing Library.",
        createAt: "2024-03-20T11:20:00.000Z",
        author: MOCK_USERS["user-3"]
    },
    {
        _id: "art-7",
        title: "Desplegando en Vercel",
        content: "La forma más rápida de llevar tus proyectos de Next.js al mundo real. Configuración de CI/CD, variables de entorno y dominios personalizados.",
        createAt: "2024-03-19T14:10:00.000Z",
        author: MOCK_USERS["user-2"]
    },
    {
        _id: "art-8",
        title: "Clean Code en JavaScript",
        content: "Escribe código que tus compañeros (y tu yo del futuro) puedan entender. Naming, funciones pequeñas y principios SOLID.",
        createAt: "2024-03-18T16:55:00.000Z",
        author: MOCK_USERS["user-1"]
    }
];
