enum UserActivity {
    LOGIN = "Inicio de Sesión",
    REGISTER = "Registro de Cuenta",
    LOGOUT = "Cierre de Sesión",
    UPDATE = "Actualización del usuario", 
    UPDATE_PASSWORD = "Actualización de contraseña"
}

enum WebAccountActivity {
    CREATE = "Creación Cuenta Web",
    UPDATE = "Actualización de Cuenta Web",
    DELETE = "Eliminación de Cuenta Web",
    DELETE_ALL = "Eliminación de todas las Cuentas Web",
}

export {
    UserActivity,
    WebAccountActivity
}