from datetime import datetime
from typing import Optional
from pydantic import BaseModel


class DataSchema(BaseModel):
    ac_x = int   
    ac_y = int
    ac_z = int
    rot_x = int
    rot_y = int
    rot_z = int
    temperature = int
    idnode = int
    category = str
    creationDate: Optional[datetime]
    ModificationDate: Optional[datetime]

class DataCreate(DataSchema):
    pass


class DataUpdate(DataSchema):
    pass


class Data(DataSchema):
    node_id: int = None

    class Config:
        orm_mode = True