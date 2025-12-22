import pydub
import midiutil

def PassWordGenerator(length: int = 12) -> str:
    """
    Docstring for PassWordGenerator
    Made by JACQUES Lucas

    :param length: Length of the password to generate (default is 12)
    :return: A randomly generated password string
    """
    import random
    import string

    if length < 4:
        raise ValueError("Password length should be at least 4 characters.")

    # Definition des charactère utiliséss
    lowercase = string.ascii_lowercase
    uppercase = string.ascii_uppercase
    digits = string.digits
    punctuation = string.punctuation

    # Creer une liste pour stocker les charactères du mot de passe
    password = [
        random.choice(lowercase),
        random.choice(uppercase),
        random.choice(digits),
        random.choice(punctuation)
    ]

    # Ajouter des charactères aléatoires pour atteindre la longueur souhaitée
    all_characters = lowercase + uppercase + digits + punctuation
    password += random.choices(all_characters, k=length - 4)

    # melanger la liste pour assurer l'aléatoire
    random.shuffle(password)

    # Retourner le mot de passe sous forme de chaîne
    return ''.join(password)

def generator_mandelbrot(xmin, xmax, ymin, ymax, width, height, max_iter):
    """
    Made by JACQUES Lucas
    :param xmin: Minimum x-coordinate
    :param xmax: Maximum x-coordinate
    :param ymin: Minimum y-coordinate
    :param ymax: Maximum y-coordinate
    :param width: Width of the output image
    :param height: Height of the output image
    :param max_iter: Maximum number of iterations
    :return: A 2D list representing the Mandelbrot set
    """
    mandelbrot_set = []
    for y in range(height):
        row = []
        for x in range(width):
            zx = xmin + (x / width) * (xmax - xmin)
            zy = ymin + (y / height) * (ymax - ymin)
            c = complex(zx, zy)
            z = 0.0j
            iteration = 0
            while abs(z) < 2 and iteration < max_iter:
                z = z * z + c
                iteration += 1
            row.append(iteration)
        mandelbrot_set.append(row)
    return mandelbrot_set

def generator_melody(scale: list, length: int) -> list:
    """
    Made by JACQUES Lucas
    :param scale: List of notes in the scale
    :param length: Length of the melody to generate
    :return: A list representing the generated melody
    """
    import random

    melody = []
    for _ in range(length):
        note = random.choice(scale)
        melody.append(note)
    return melody