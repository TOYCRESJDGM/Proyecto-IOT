from src.controller.base_controller import BaseController
from sqlalchemy.orm import Session
from typing import Any
import src.models as models
import src.schemas as schemas
from src.utils import Singleton


"""
This class is a CRUD class for the Node table.
"""

class NodeCRUD(
    
    BaseController[schemas.Node, schemas.NodeCreate, schemas.NodeUpdate],
    metaclass=Singleton,
):
    def __init__(self):
        super().__init__(models.Node)
    
    def get_by_user_id(self, db: Session ,user_id: Any):
        return db.query(self.model_cls).filter(self.model_cls.iduser == user_id).all()
    

# Create a singleton instance of the NodeCRUD class
node = NodeCRUD()