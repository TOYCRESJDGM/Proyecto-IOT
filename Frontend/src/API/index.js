export const getOrders = () => {
  return fetch("https://dummyjson.com/carts/1").then((res) => res.json());
};
export const getRevenue = () => {
  return fetch("https://dummyjson.com/carts").then((res) => res.json());
};

export const getCustomers = () => {
  return fetch("https://dummyjson.com/users").then((res) => res.json());
};
export const getComments = () => {
  return fetch("https://dummyjson.com/comments").then((res) => res.json());
};



//Node
export const getAllNode = (id) => {
  return fetch(`http://localhost:5000/node`).then((res) => res.json());
};

export const postDataNode = (data) => {
  return fetch("http://localhost:5000/node/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json());
};

export const putDataNode = (id, data) => {
  return fetch(`http://localhost:5000/node/select/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json());
};


//Data
export const getDataNode = (id) => {
  return fetch(`http://localhost:5000/data/node/${id}`).then((res) => res.json());
};

export const getDataCategory = (category) => {
  return fetch(`http://localhost:5000/data/${category}`).then((res) => res.json());
};

export const getData = () => {
  return fetch("http://localhost:5000/data").then((res) => res.json());
};


//User
export const getUsers = () => {
  return fetch("http://localhost:5000/user").then((res) => res.json());
};

export const AuthUser = (data) => {
  return fetch(`http://localhost:5000/user/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json());
};

export const CreateUser = (data) => {
  return fetch(`http://localhost:5000/user/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json());
};
