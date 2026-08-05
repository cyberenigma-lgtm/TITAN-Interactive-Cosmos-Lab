from ecuaciones import eq_estado_celda

def actualizar_celda(celda):
    """
    La celda solo cambia de estado si la ecuación matemática lo permite.
    """
    nuevo_estado = eq_estado_celda(celda.masa, celda.energia)
    celda.estado = nuevo_estado
