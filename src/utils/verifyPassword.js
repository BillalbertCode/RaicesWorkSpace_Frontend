// Funcion para validar que la contraseña sera segura
/**
 * 
 * @param {String} password   
 */
export const verifyPassword = (password) => {

    const passwordRegex = new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,128}$"
    );

    if (!passwordRegex.test(password)) {
        let errorMessage = 'La contraseña debe contener al menos: ';
        if (password.length < 8) {
            errorMessage += '8 caracteres. ';
        }
        if (!/[a-z]/.test(password)) {
            errorMessage += 'una letra minúscula. ';
        }
        if (!/[A-Z]/.test(password)) {
            errorMessage += 'una letra mayúscula. ';
        }
        if (!/[0-9]/.test(password)) {
            errorMessage += 'un número. ';
        }
        if (!/[!@#$%^&*]/.test(password)) {
            errorMessage += 'uno de estos caracteres !@#$%^&*. ';
        }
        return {
            valid: false,
            message: errorMessage,
        };
    }

    return { valid: true };
}