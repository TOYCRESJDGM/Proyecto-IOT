from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class NodeSchema(BaseModel):
    name: str
    location: str
    state: str
    iduser: Optional[int]
    creationDate: Optional[datetime]
    ModificationDate: Optional[datetime]

class NodeCreate(NodeSchema):
    pass


class NodeUpdate(NodeSchema):
    pass


class Node(NodeSchema):
    node_id: int = None

    class Config:
        orm_mode = True