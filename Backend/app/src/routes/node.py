from fastapi import Depends, HTTPException
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from sqlalchemy.orm import Session

from src.adapters.mysql_adapter import get_db
import src.controller as controller
import src.schemas as schemas
import src.utils.mappers as mp

router = InferringRouter()



@cbv(router)
class NodeRouter:
    # dependency injection
    db: Session = Depends(get_db)

    @router.get("/")
    def get_nodes(self):
        """
        Get all nodes
        :return:
        """
        response = {}
        
        nodes = controller.node.fetch_all(self.db)
        
        if nodes:
            response = {
                    "type": "success",
                    "message": "data found",
                    "data": list(map(mp.mapper_node, nodes))
            }
        else:
            response = {
                    "type": "error",
                    "message": "data not found",
                    "data": []
            }

        return response

    @router.get("/{id}")
    def get_node(self, id:int):
        """
        Get a single node
        :return:
        """
        node =  controller.node.get(self.db, id)
        if node:
            response = {
                "type": "sucess",
                "message": "data found",
                "data": mp.mapper_node(node)
            }
        else:
            response = {
                "type": "error",
                "message": "data not found",
                "data": []
            }

        return response

    @router.get("user/{id}")
    def get_node(self, id:int):
        """
        Get a single node
        :return:
        """
        node =  controller.node.get_by_user_id(self.db, id)
        if node:
            response = {
                "type": "sucess",
                "message": "data found",
                "data": mp.mapper_node(node)
            }
        else:
            response = {
                "type": "error",
                "message": "data not found",
                "data": []
            }

        return response
    
    @router.post("/create")
    def create_node(self, node:schemas.NodeCreate):
        """
        create a category
        :return:
        """
        try:
            controller.node.create(self.db, entity=node)
            return {
                "type": "sucess",
                "message": "Node create successfull"
            }
        except Exception as e:
            print(str(e))
            raise HTTPException(status_code=400, detail=str(e))

    @router.post("/select/{node_id}")
    def select_node(self, node_id: int, info: schemas.NodeUpdate):
        """
        select a node
        :return:
        """
        controller.node.update(self.db, model_id=node_id, entity=info)
        response = {
            "type": "success",
            "message": "update succesfully",
            "data": []
        }
            
        return response  
    
        