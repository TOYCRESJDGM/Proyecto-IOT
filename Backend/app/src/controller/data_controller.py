from typing import List, Any
from sqlalchemy.orm import Session
from src.controller.base_controller import BaseController
import src.models as models
import src.schemas as schemas
from src.utils import Singleton

"""
This class is a CRUD class for the Data table.
"""

class DataCRUD(
    
    BaseController[schemas.Data, schemas.DataCreate, schemas.DataUpdate],
    metaclass=Singleton,
):
    def __init__(self):
        super().__init__(models.Data) 
    
    def filters_data_date(self, db: Session ,start_date: Any, end_date:Any):
        return db.query(self.model_cls).filter(self.model_cls.creationDate >= start_date & self.model_cls.creationDate <= end_date).all()
    
    def filter_data_node(self, db: Session , node_id: Any):
        return db.query(self.model_cls).filter(self.model_cls.idnode == node_id).all()
    
    def filter_data_category(self, db:Session, category: Any):
        return db.query(self.model_cls).filter(self.model_cls.category == category).all()
    
    
# Create a singleton instance of the DataCRUD class
data = DataCRUD()