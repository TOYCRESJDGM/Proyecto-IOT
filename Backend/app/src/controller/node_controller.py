from src.controller.base_controller import BaseController
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
    

# Create a singleton instance of the NodeCRUD class
node = NodeCRUD()