from os import path, makedirs
from os.path import exists, dirname
from errno import EEXIST

def SafeOpen(filename, mode='r', buffering=-1, encoding=None, errors=None, newline=None, closefd=True, opener=None):
    if not exists(dirname(filename)):
        try:
            makedirs(dirname(filename))
        except OSError as err:
            if err.errno != EEXIST: raise
    return open(filename, mode, buffering, encoding, errors, newline, closefd, opener)