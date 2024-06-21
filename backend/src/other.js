import { getData, setData } from './dataStore';

export function clear() {
    let dataStore = getData();
    dataStore = {
      users: [],
    };
    setData(dataStore);
    return {};
}
  