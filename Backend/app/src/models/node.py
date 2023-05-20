from datetime import datetime

from sqlalchemy import Column, Integer, String, DateTime, ForeignKey

from src.adapters.orm_base import OrmBaseModel
from sqlalchemy import event
from sqlalchemy import DDL

"""
ORM class to interact with the node table in the database
"""


class Node(OrmBaseModel):
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    location = Column(String(255), nullable=False)
    state = Column(String(255), nullable=False)
    iduser = Column(Integer, ForeignKey('user.id'), nullable=True)
    creationDate = Column(DateTime(timezone=True), default=datetime.utcnow)
    ModificationDate = Column(DateTime(timezone=True), default=datetime.utcnow)


restart_seq = DDL("ALTER SEQUENCE %(table)s_id_seq RESTART WITH 100;")

event.listen(
    Node.__table__, "after_create", restart_seq.execute_if(dialect="mysql")
)