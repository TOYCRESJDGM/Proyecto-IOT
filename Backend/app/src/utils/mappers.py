

def mapper_data(data):
    print(data)
    return {
        "temperature": data.temperature,
        "rot_z": data.rot_z,
        "rot_y": data.rot_y,
        "rot_x": data.rot_x,
        "ac_z": data.ac_z,
        "ac_y": data.ac_y,
        "ac_x": data.ac_x,
        "creationDate": data.creationDate,
        "node_id": data.idnode,
        "id": data.id
    }

def mapper_node(node):
    return {
        "id": node.id,
        "name": node.name,
        "location": node.location,
        "state": node.state,
        "id_user": node.iduser,
        "creationDate": node.creationDate
    }