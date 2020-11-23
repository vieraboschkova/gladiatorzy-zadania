const filteringWith = require('./index');
const arrayOfObjects = require('./testObject')

test('checks if filter is long enough', () => {
  expect(filteringWith(arrayOfObjects, 'a')).toStrictEqual([]);
});

test('checks if filter is long enough', () => {
  expect(filteringWith(arrayOfObjects, '')).toStrictEqual([]);
});

test('checks if filter is long enough', () => {
  expect(filteringWith(arrayOfObjects, 12)).toStrictEqual([]);
});

test('checks if search works in the first level', () => {
  expect(filteringWith(arrayOfObjects, 26)).toStrictEqual([{
    "_id": "5e985a0737e2306e9aef6ecd",
    "age": 26,
    "eyeColor": "blue",
    "name": "Mcguire Mercado",
    "gender": "male",
    "company": "LINGOAGE",
    "email": "mcguiremercado@lingoage.com",
    "phone": "+1 (963) 450-2194",
    "tags": [
      "cupidatat",
      "occaecat",
      "amet",
      "qui",
      "elit",
      "esse",
      "deserunt"
    ],
    "friends": [
      {
        "id": 0,
        "name": "Loraine Harper"
      },
      {
        "id": 1,
        "name": "Luann Randall"
      },
      {
        "id": 2,
        "name": "Obrien Rich"
      },
      {
        "id": 3,
        "name": "Noble Wilkerson"
      }
    ]
  }]);
});