// Formate la hora que le llega del aritculo segun su zona horaria
/**
 * @param {object} dateString - objeto para crear una hora segun la region del dispositivo
 */
const formateDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    })
}

export default formateDate;