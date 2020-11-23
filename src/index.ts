function filterWith(arr: Object[], filter: string | number): Object {
  let foundObjects: Object[] = [];

  const filterLength: number = typeof filter === 'string' ? 
    filter.length 
    : 
    filter.toString().length;
  const filterTooShort = filterLength < 3;

  if (filterTooShort) {
    return [];
  }

  return foundObjects;
}

function checkIfNested(objectToSearch: Object, level: number,  ...rest: any) {
  if (objectToSearch === undefined) return false
  if (rest.length == 0 && obj.hasOwnProperty(level)) return true
  return checkIfNested(objectToSearch[level], ...rest)
}

module.exports = filterWith;