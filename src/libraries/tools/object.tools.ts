/**
 * Get the value of a field in an object.
 * @param {T} o Object that will be consulted.
 * @param {K} propertyName Field that will be consulted.
 * @returns {any} The value of the field in the object.
 */
function getProperty<T, K extends keyof T>(o: T, propertyName: K): T[K] {
  return o[propertyName];
}

/**
   * Update a object modifying one property.
   * @param {T} o Object that will be updated.
   * @param {K} propertyName Field that will be updated.
   * @param {any} value Value that will be set in the object.
   */
function setProperty<T, K extends keyof T>(o: T, propertyName: K, value: any) {
  o[propertyName] = value;
}

/**
   * Transform the type of an object to other type of object in order to use the object of
   * type T as an object of type K
   * @param object Object that wants to be used as the other type.
   * @returns Returns the object with a different type.
   */
const transformObjectType = <T, K>(object: T): K => {
  return (object as unknown) as K;
};

/**
   * Get the value of a object in a path
   * @param obj Object that will be looked
   * @param basePath Path that will be looked in obj
   * @returns The value in the path.
   */
const getValueWithDotNotation = (obj: any, basePath = '') => {
  if (!basePath) return obj;
  const path = basePath.split('.');
  for (let i = 0; i < path.length; i += 1) obj = obj[path[i]];
  return obj;
};

/**
   * Looks if the object passed as parameter is a plain object
   * @param o Object that wants to be looked if its a plain object
   * @returns true if is a plain object, false in other case
   */
export const isPlainObject = (o: any) => Boolean(
  o
        && o.constructor
        && o.constructor.prototype
        // eslint-disable-next-line no-prototype-builtins
        && o.constructor.prototype.hasOwnProperty('isPrototypeOf'),
);

/**
   * Remove the keys from the path of the object
   * @param object Object that be modified.
   * @param basePath Base path from what the data will be removed.
   * @param keys Keys that will be removed from the object.
   * @returns The object updated.
   */
const removeKeys = (object: any, keys: string[], basePath = '') => {
  const objectFormatted = getValueWithDotNotation(object, basePath);

  if (!objectFormatted || !isPlainObject(objectFormatted)) return object;

  Object.entries(objectFormatted).forEach(([ key, value ]) => {
    if (keys.includes(key)) {
      delete objectFormatted[key];
    }
  }, {});
  return objectFormatted;
};

/**
   * Modify the original object adding the default values if they don't come in the original
   * @param original Object to be modified.
   * @param defaultValues Object containing the default values.
   */
const deepSetDefaultValues = (original: any, defaultValues: any) => {
  Object.entries(defaultValues).forEach(([ key, value ]) => {
    if (!original[key]) original[key] = value;
    if (isPlainObject(value)) deepSetDefaultValues(original[key], value);
  });
};

/**
   * Remove the null values from an object. Returns the initial object if is not a plain object.
   * @param obj Object that will be modified.
   * @returns A new object with the nulls removed.
   */
const removeEmptyValues = (obj: any, valuesToRemove: (string| number| null | undefined)[] = [ null ]) => {
  const newObj: any = {};

  if (!isPlainObject(obj)) return obj;

  const remove = (object: any) => Object.keys(object).forEach((key: string) => {
    if (object[key] && isPlainObject(object[key])) {
      newObj[key] = removeEmptyValues(object[key], valuesToRemove);
    } else if (!valuesToRemove.includes(object[key])) {
      newObj[key] = object[key];
    }
  });

  remove(obj);

  return newObj;
};

/**
   * Find the paths of the keys in the object.
   * @param obj Object that will be searched in.
   * @param desiredKeys Keys that will be searched in the obj.
   * @param path Actual path.
   * @param results Paths found.
   * @returns The results.
   */
function findKeysDeep(
  obj: Record<string, any>,
  desiredKeys: string[],
  path: string[] = [],
  results: Record<string, string> = {},
) {
  const keys = Object.keys(obj);
  keys.forEach((key) => {
    const currentPath = path.concat([ key ]);

    if (isPlainObject(obj[key])) {
      findKeysDeep(obj[key], desiredKeys, currentPath, results);
    } else if (desiredKeys.includes(key)) {
      results[currentPath.join('.')] = obj[key];
    }
  });
  return results;
}

const addDefaultValue = (object: any, defaultValue: any) => {
  return new Proxy(object, {
    get: (target, prop) => {
      return !target[prop] ? defaultValue : target[prop];
    },
  });
};

/**
   * Function to return a value if a parse string operation fails.
   * @param object The object to parse.
   * @param defaultValue - The default value to returns if the parse operation fails.
   */
const secureParse = <T extends string, U>(object: T, defaultValue: U) => {
  try {
    return JSON.parse(object);
  } catch (error) {
    return defaultValue;
  }
};

const isEmptyObject = (obj: any) => Object.getOwnPropertyNames(obj).length === 0
    && Object.getOwnPropertySymbols(obj).length === 0
    && Object.getPrototypeOf(obj) === Object.prototype;

const parserJson = (obj: any) => JSON.parse(JSON.stringify(obj));

const objectTools = {
  setProperty,
  getProperty,
  transformObjectType,
  removeKeys,
  getValueWithDotNotation,
  isPlainObject,
  deepSetDefaultValues,
  removeEmptyValues,
  findKeysDeep,
  addDefaultValue,
  secureParse,
  isEmptyObject,
  parserJson,
};

export default objectTools;
