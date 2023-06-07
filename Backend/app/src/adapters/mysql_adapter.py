"""
Adapter for mysql
"""

from sqlalchemy import create_engine, event
from datetime import datetime, timedelta
import mysql.connector
from sqlalchemy.orm import (
    sessionmaker,
)  # create a session factory to connect to the database
from src.utils.settings import (
    ENVIRONMENT, 
    DB_NAME,
    DB_HOST,
    DB_USER_NAME,
    DB_PASSWORD
)

from functools import wraps
from .orm_base import OrmBaseModel

SQLALCHEMY_DATABASE_URL = "mysql://"+DB_USER_NAME+":"+DB_PASSWORD+"@"+DB_HOST+":"+str(3306)+"/"+ DB_NAME
print(f"SQLALCHEMY_DATABASE_URL: {SQLALCHEMY_DATABASE_URL}")
engine = create_engine(SQLALCHEMY_DATABASE_URL)


def on_connect(dbapi_con, con_record):
    print(f"connection established to database {dbapi_con}")

event.listen(engine, "connect", on_connect)

# connect factory to the database
SessionMaker = sessionmaker(
    autocommit=False, autoflush=False, bind=engine, expire_on_commit=False
)

def create_session(func):
    """
    Create a database session
    :param func:
    :return:
    """

    @wraps(func)
    def wrapper(*args, **kwargs):
        session = SessionMaker()
        try:
            result = func(*args, session=session, **kwargs)
            session.commit()
            return result
        except:
            session.rollback()
            raise
        finally:
            session.close()

    return wrapper


def create_db():
    """
    Create all tables in the database
    :return:
    """
    OrmBaseModel.metadata.create_all(bind=engine)


def drop_db():
    """
    Drop all tables in the database
    :return:
    """
    OrmBaseModel.metadata.drop_all(bind=engine)


class DBConnection:
    def __init__(self):
        self.db = SessionMaker()

    def __enter__(self):
        return self.db

    def __exit__(self, exc_type, exc_value, traceback):
        self.db.close()


async def get_db():
    with DBConnection() as db:
        yield db


def get_db_session():
    """
    Get the database session.
    :return:
    """
    try:
        db = SessionMaker()
        yield db
    finally:
        db.close()


# Función que se ejecutará en segundo plano
def background_task():
    
    # Crear la conexión a la base de datos MySQL
    connection = mysql.connector.connect(
        host='localhost',
        user=DB_USER_NAME,
        password=DB_PASSWORD,
        database=DB_NAME
    )

    # Crear un cursor para ejecutar consultas
    cursor = connection.cursor()

    # Calcular el límite de tiempo hace 5 minutos
    limit_time = datetime.now() - timedelta(minutes=1)

    # Formatear limit_time en el formato adecuado para MySQL
    formatted_limit_time = limit_time.strftime('%Y-%m-%d %H:%M:%S')

    category = 'caida'

    # Construir la consulta SQL con parámetros seguros
    query = 'SELECT d.id as id, d.idnode as node, d.creationDate as date, us.userName as name, us.phone as phone '\
            'FROM data d '\
            'LEFT JOIN node nd ON d.idnode = nd.id '\
            'INNER JOIN user us ON nd.iduser = us.id '\
            'WHERE d.category = %s AND d.creationDate >= %s'
        
    # Ejecutar la consulta SELECT para obtener los IDs de los nodos
    cursor.execute(query, (category, formatted_limit_time))

    # Obtener los resultados de la consulta
    results = cursor.fetchall()

    cursor.close()
    connection.close()

    return results
