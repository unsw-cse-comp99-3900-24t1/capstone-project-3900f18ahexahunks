export function createUser(email, password) {
  return {
    email: email,
    password: password,
  };
}

let dataStore = {
  users: []
};

export function getData() {
  return dataStore;
}

export function setData(newData) {
  dataStore = newData;
}

export function clear() {
  dataStore = { users: [] };
  return dataStore;
}
