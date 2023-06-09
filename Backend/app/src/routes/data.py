from datetime import datetime
from fastapi import Depends, HTTPException
from fastapi_utils.cbv import cbv
from fastapi_utils.inferring_router import InferringRouter
from sqlalchemy.orm import Session

from src.adapters.mysql_adapter import get_db
import src.controller as controller
import src.utils.mappers as mp

router = InferringRouter()


@cbv(router)
class DataRouter:
    # dependency injection
    db: Session = Depends(get_db)

    @router.get("/")
    def get_all_data(self, start_date: datetime = None, end_date: datetime = None):
        """
        Get all data
        :return:
        """
        # if (start_date and not end_date) or (not start_date and end_date):
        #     if not start_date:
        #         start_date =  datetime.now()
        #     if not end_date:
        #         end_date =  datetime.now()
    
        
        
        data = controller.data.fetch_all(self.db)            
        if len(data)>0:
            response = {
                "type": "sucess",
                "message": "data found",
                "data": list(map(mp.mapper_data, data)),
                "total": len(data)
            }
        else:
            response = {
                "type": "error",
                "message": "data not found",
                "data": []

            }
            
        return response  

    @router.get("/node/{node_id}")
    def get_data_node_id(self, node_id:int):
        """
        Get a data for node
        :return:
        """
        data_all =  controller.data.filter_data_node(self.db, node_id)
        data_node = []
        
        if len(data_all)>0:
            for data in data_all:
                data_node.append(mp.mapper_data(data))
            response = {
                "type": "sucess",
                "message": "data found",
                "data": data_node
            }
        else:
            response = {
                "type": "error",
                "message": "data not found",
                "data": []
            }
        
        return response
    
    @router.get("/{category}")
    def get_data_category(self, category:str):
        """
        Get a data from category
        :return:
        """
        data_all =  controller.data.filter_data_category(self.db, category)
        data_node = []
        
        if data_all and len(data_all) > 0:
            for data in data_all:
                data_node.append(mp.mapper_data(data))
            response = {
                "type": "sucess",
                "message": "data found",
                "data": data_node
            }
        else:
            response = {
                "type": "error",
                "message": "data not found",
                "data": []
            }
        
        return response
 