type ObjectType<T> = {
  [key: string]: T;
};

const pick = <T>(object: ObjectType<T>, keys: string[]): ObjectType<T> => {
  return keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
      obj[key] = object[key];
    }
    return obj;
  }, {} as ObjectType<T>);
};

export default pick;