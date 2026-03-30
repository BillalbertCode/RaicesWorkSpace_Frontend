// Datos de prueba para el frontend cuando el backend está apagado
export const MOCK_ARTICLES = [
    {
        _id: "mock-1",
        title: "Arquitectura Resiliente en Next.js",
        content: "Este artículo es una demostración de cómo el frontend puede seguir funcionando incluso cuando los servicios de backend están en mantenimiento o pausados por límites de crédito.",
        createAt: new Date().toISOString(),
        author: {
            _id: "user-demo-1",
            name: "Raices",
            lastName: "Demo",
            username: "raices_admin",
            profileIconUrl: "/images/icons/icono1.jpg"
        }
    },
    {
        _id: "mock-2",
        title: "Optimización de Componentes React",
        content: "Explorando el uso de hooks como useMemo y useCallback para mejorar el rendimiento de aplicaciones a gran escala en producción.",
        createAt: new Date(Date.now() - 86400000).toISOString(), // Hace 1 día
        author: {
            _id: "user-demo-2",
            name: "Ana",
            lastName: "García",
            username: "ana_dev",
            profileIconUrl: "/images/icons/icono5.jpg"
        }
    },
    {
        _id: "mock-3",
        title: "El Futuro del Desarrollo Web",
        content: "Desde Server Components hasta Edge Computing, el panorama del desarrollo web está cambiando rápidamente. ¿Estás preparado para lo que viene?",
        createAt: new Date(Date.now() - 172800000).toISOString(), // Hace 2 días
        author: {
            _id: "user-demo-3",
            name: "Carlos",
            lastName: "Sánchez",
            username: "csanchez",
            profileIconUrl: "/images/icons/icono8.jpg"
        }
    }
];
