// korzystając z funkcji .filter stwórz funkcję filterWith(arr, filter) 
// która ma umożliwić przeszukanie arraya z obiektami 
// po wszystkich wartościach obiektu typu string lub number
// także po wartościach arraya w kluczu "tags" oraz po "name" w kluczu "friends"
// tak aby:
// - od 0 do 2 znaków w filtrze zwracało pusty array, 
// - a powyżej 2 ma filtrować po każdej wartości typu string lub number w obiekcie

function filterWith(arr: Array<object>, filter): Object {
  // CHECK IF INPUT ARGUMENTS ARE CORRECT
  const filterIsANumberOrString = typeof filter === 'string' || typeof filter === 'number';
  const givenArrayIsAnArray = Array.isArray(arr);
  const givenArrayIsEmpty = arr.length === 0;
  const givenArrayContainsOnlyObjects = arr.every(checkedObject => {
    if (checkedObject === null || typeof checkedObject === 'function') {
      return false;
    }
    return typeof checkedObject === 'object'
  });
  const filterLength: number = typeof filter === 'string' ? 
    filter.length : filter.toString().length;
  const filterTooShort = filterLength < 3;

  if (!filterIsANumberOrString) {
    throw new TypeError('Change filter parameters to string or number');
  }
  if (!givenArrayIsAnArray) {
    throw new TypeError('Enter a valid array');
  }
  if (givenArrayIsEmpty) {
    throw new TypeError('Array is empty, nothing to filter');
  }
  if (!givenArrayContainsOnlyObjects) {
    throw new TypeError('Array items are invalid');
  }
  if (filterTooShort) {
    return [];
  }
  // INITIATE ARRAY OF FILTERED OBJECTS TO RETURN
  let foundObjects;

  foundObjects = arr.filter((item) => {
    return checkValues(item, filter);
  })

  return foundObjects;
}

// FUNCTION TO GET VALUES FROM OBJECT AND CHECK IF AT LEAST ONE OF THE VALUES CONTAINS THE FILTER PHRASE
function checkValues(searchObject: object, searchPhrase) {
  const isAString = (checkedValue: string): boolean => typeof checkedValue === ('string');
  const isANumber = (checkedValue: number): boolean => typeof checkedValue === ('number');
  const isAnObject = (checkedValue: object): boolean => typeof checkedValue === ('object'); 
  const convertNumberToString = (checkedValue: number): string => checkedValue.toString();
  let hasSearchedPhrase: boolean;
  let allValues = Object.values(searchObject);
  
  hasSearchedPhrase = allValues.some((value) => {
      if (isAString(value)) {
          if (value.includes(searchPhrase)) {
              return true;
          }
      }
      if (isANumber(value)) {
          let numericValueAsAString: string = convertNumberToString(value);
          if (numericValueAsAString.includes(searchPhrase)) {
              return true;
          }
      } 
      if (isAnObject(value)) {
          return checkValues(value, searchPhrase)
      } 
  })

  return hasSearchedPhrase;
}

module.exports = filterWith;
