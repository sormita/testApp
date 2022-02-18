const backingStorage = window.sessionStorage;
 const storage = {
    getItem: key => {
      try {
        const value = backingStorage.getItem(key);
        return value != null ? JSON.parse(value) : undefined;
      } catch (err) {
        console.error(err);
      }
    },
    setItem: (key, value) => {
      try {
        backingStorage.setItem(key, JSON.stringify(value));
      } catch (err) {
        console.error(err);
      }
    },
    removeItem: key => {
      try {
        backingStorage.removeItem(key);
      } catch (err) {
        console.error(err);
      }
    }
  };

  export default storage;