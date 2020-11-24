const arrayForTesting: Object[] = [
  {
    "_id": "5e985a07feddae7617ac44f6",
    "tags": [
      "labore",
      "elit",
    ],
    "friends": [
      {
        "name": "Sheppard Jensen"
      }
    ]
  },
  {
    "_id": "5e985a0709dfa1e6fd93c6ad",
    "tags": [
      "nisi",
      "veniam",
    ],
    "friends": [
      {
        "name": "Bruce Barton"
      },
      {
        "name": "Juliet Schmidt"
      },
      {
        "id": 2447,
        "name": "Horton Haley"
      },
      {
        "id": 3777,
        "name": "Herminia Witt"
      }
    ]
  },
  {
    "_id": "5e985a0737e2306e9aef6ecd",
    "age": 26777,
    "tags": [
      "cupidatat",
      "occaecat",
    ],
    "friends": [
      {
        "id": 5770,
        "name": "Loraine Harper"
      },
      {
        "id": 1858,
        "name": "Luann Randall"
      },
    ]
  },
  {
    "_id": "5e985a07148cfba58c860ec2",
    "age": 26444,
    "phone": "+1 (867) 417-3497",
    "tags": [
      "laborum",
      "aliquip",
    ],
    "friends": [
      {
        "name": "Blair Hill"
      },
      {
        "id": 17575,
        "name": "Ebony Jimenez"
      }
    ]
  },
  {
    "_id": "5e985a074984f9f08ccaaa4c",
    "age": 25,
    "email": "barlowferguson@toyletry.com",
    "phone": "+1 (837) 484-2231",
    "tags": [
      "est",
      "dolor",
    ],
    "friends": [
      {
        "id": 575750,
        "name": "Delacruz Acevedo"
      },
      {
        "id": 1,
        "name": "Gloria Tanner"
      },
    ]
  }
]
const filteringWith = require('./index');

test('checks if filter is long enough', () => {
  expect(filteringWith(arrayForTesting, 'a')).toStrictEqual([]);
});

test('checks if filter is long enough', () => {
  expect(filteringWith(arrayForTesting, '')).toStrictEqual([]);
});

test('checks if filter is long enough', () => {
  expect(filteringWith(arrayForTesting, 12)).toStrictEqual([]);
});

test('checks if filter is of type string or number', () => {
  expect(()=> {
    filteringWith(arrayForTesting, [12])}).toThrow(TypeError);
});

test('checks if array is of type array', () => {
  expect(()=> {
    filteringWith({a: undefined}, 123)}).toThrow(TypeError);
});

test('checks if array is not empty', () => {
  expect(()=> {
    filteringWith([], 123)}).toThrow(TypeError);
});

test('checks if array contains only valid objects', () => {
  expect(()=> {
    filteringWith([{a: undefined}, null], 123)}).toThrow(TypeError);
});

test('checks if search works with numerical filter', () => {
  expect(filteringWith(arrayForTesting, 575)).toStrictEqual([
    {
      "_id": "5e985a07148cfba58c860ec2",
      "age": 26444,
      "phone": "+1 (867) 417-3497",
      "tags": [
        "laborum",
        "aliquip",
      ],
      "friends": [
        {
          "name": "Blair Hill"
        },
        {
          "id": 17575,
          "name": "Ebony Jimenez"
        }
      ]
    },
    {
      "_id": "5e985a074984f9f08ccaaa4c",
      "age": 25,
      "email": "barlowferguson@toyletry.com",
      "phone": "+1 (837) 484-2231",
      "tags": [
        "est",
        "dolor",
      ],
      "friends": [
        {
          "id": 575750,
          "name": "Delacruz Acevedo"
        },
        {
          "id": 1,
          "name": "Gloria Tanner"
        },
      ]
    }
  ])
});


test('checks if search works with string filter', () => {
  expect(filteringWith(arrayForTesting, 'eppa')).toStrictEqual([
    {
      "_id": "5e985a07feddae7617ac44f6",
      "tags": [
        "labore",
        "elit",
      ],
      "friends": [
        {
          "name": "Sheppard Jensen"
        }
      ]
    }
  ])
})

test('checks if search works only with values, not keys', () => {
  expect(filteringWith(arrayForTesting, 'end')).toStrictEqual([])
})