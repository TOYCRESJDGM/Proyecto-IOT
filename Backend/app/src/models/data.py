from datetime import datetime

from sqlalchemy import Column, Integer, DateTime, ForeignKey

from src.adapters.orm_base import OrmBaseModel
from sqlalchemy import event
from sqlalchemy import DDL

"""
ORM class to interact with the Data table in the database
"""

class Data(OrmBaseModel):
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    ac_x = Column(Integer, nullable=True)   
    ac_y = Column(Integer, nullable=True)
    ac_z = Column(Integer, nullable=True)
    rot_x = Column(Integer, nullable=True)
    rot_y = Column(Integer, nullable=True)
    rot_z = Column(Integer, nullable=True)
    temperature = Column(Integer, nullable=True)
    idnode = Column(Integer, ForeignKey('node.id'), nullable=False)
    creationDate = Column(DateTime(timezone=True), default=datetime.utcnow)
    ModificationDate = Column(DateTime(timezone=True), default=datetime.utcnow)


restart_seq = DDL("ALTER SEQUENCE %(table)s_id_seq RESTART WITH 100;")

event.listen(
    Data.__table__, "after_create", restart_seq.execute_if(dialect="mysql")
)