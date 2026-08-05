# Constantes Universales del Modelo
M_CRIT = 0.2
M_REGEN = 0.8
A_EXPANSION = 1.0 # Factor constante de expansión a

def eq_estado_celda(masa, energia):
    """ Ecuación 1 y 2 y 3: Estado de la celda """
    if masa < M_CRIT:
        return "colapsada" # Ecuación de colapso
    elif masa > M_REGEN:
        return "regenerando" # Ecuación de regeneración
    elif masa == 0 and energia == 0:
        return "inactiva"
    else:
        return "activa"

def eq_transporte(masa_celda, masa_meteorito):
    """ Ecuación 4: Transporte de materia (Δmasa_celda = masa_meteorito) """
    return masa_celda + masa_meteorito

def eq_interaccion(masa, masa_vecinos, energia_vecinos):
    """ Ecuación 6: I = f(masa_vecinos, energia_vecinos) """
    if not masa_vecinos:
        return masa
    influencia = sum(masa_vecinos) / len(masa_vecinos)
    return masa + (influencia * 0.05) # Pequeño diferencial de flujo gravitatorio

def eq_expansion_cubica(n_t):
    """ Ecuación 5a: E(t) = n(t) * a """
    return n_t * A_EXPANSION

def eq_expansion_hexagonal(n_t):
    """ Ecuación 5b: E_hex(t) = 6a * n(t) """
    return 6 * A_EXPANSION * n_t

def eq_vibracion(ejes=3):
    """ Ecuación 7: V = {X,Y,Z} o {1,2,3,4,5,6} """
    import random
    if ejes == 3:
        return random.choice(['X', 'Y', 'Z'])
    else:
        return random.choice([1, 2, 3, 4, 5, 6])
