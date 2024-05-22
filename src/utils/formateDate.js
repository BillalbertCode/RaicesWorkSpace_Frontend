// Formate la hora que le llega del aritculo segun su zona horaria
/**
 * @param {object} dateString - objeto para crear una hora segun la region del dispositivo
 */
const formateDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = (now - date) / 1000;
    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;
    const diffInMonths = diffInDays / 30;

    if (diffInSeconds < 60) {
        return 'hace un segundo';
    } else if (diffInMinutes < 60) {
        return `hace ${Math.floor(diffInMinutes)} minutos`;
    } else if (diffInHours < 24) {
        return `hace ${Math.floor(diffInHours)} horas`;
    } else if (diffInDays < 30) {
        const daysAgo = Math.floor(diffInDays);
        return `hace ${daysAgo} días`;
    } else if (diffInMonths < 12) {
        const monthsAgo = Math.floor(diffInMonths);
        return monthsAgo <= 1 ?  `hace ${monthsAgo} mes` :  `hace ${monthsAgo} meses`;

    } else {
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        });
    }
}
export default formateDate;