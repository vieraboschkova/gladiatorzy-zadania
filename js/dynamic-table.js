const tableData = [
{
  "_id": "5e9df382fc302216f08b46b1",
  "name": "Ivy Mitchell",
  "age": 40,
  "gender": "female",
  // "genderBUG": "female",
  // "bug":"bug",
  "company": "TALAE",
  "email": "ivymitchell@talae.com",
  "phone": "+1 (838) 597-2008",
  "tags": [
    "cupidatat",
    "et",
    "ad",
    "incididunt",
    "velit",
    "sint",
    "non"
  ]
},
{
  "_id": "5e9df38220c8ca67ea7903ae",
  "name": "Francine Fleming",
  "age": 31,
  "gender": "female",
  "company": "ZEDALIS",
  "email": "francinefleming@zedalis.com",
  "phone": "+1 (857) 548-3417",

  "tags": [
    "culpa",
    "elit",
    "aute",
    "officia",
    "reprehenderit",
    "nulla",
    "aute"
  ],

},
{
  "_id": "5e9df38249740035c46a0e8e",
  "name": "Buckley Harper",
  "age": 33,
  "gender": "male",
  "company": "MARKETOID",
  "email": "buckleyharper@marketoid.com",
  "phone": "+1 (931) 478-3483",
  "tags": [
    "Lorem",
    "commodo",
    "quis",
    "eu",
    "labore",
    "exercitation",
    "in"
  ]
},
{
  "_id": "5e9df382b76d365bb162751c",
  "name": "Pollard Farley",
  "age": 23,
  "gender": "male",
  "company": "UNCORP",
  "email": "pollardfarley@uncorp.com",
  "phone": "+1 (969) 592-2232",
  "tags": [
    "commodo",
    "culpa",
    "eiusmod",
    "minim",
    "ipsum",
    "minim",
    "proident"
  ]
},
{
  "_id": "5e9df3820b489f341a421aa7",
  "name": "Esperanza Gates",
  "age": 32,
  "gender": "female",
  "company": "OVERFORK",
  "email": "esperanzagates@overfork.com",
  "phone": "+1 (928) 540-3318",
  "tags": [
    "sit",
    "qui",
    "labore",
    "ea",
    "veniam",
    "non",
    "dolor"
  ]
},
{
  "_id": "5e9df3826ce9a9c66e5fbece",
  "name": "Mccarthy Brooks",
  "age": 23,
  "gender": "male",
  "company": "CODAX",
  "email": "mccarthybrooks@codax.com",
  "phone": "+1 (886) 592-3578",
  "tags": [
    "eiusmod",
    "aliqua",
    "tempor",
    "nostrud",
    "anim",
    "tempor",
    "occaecat"
  ]
},
{
  "_id": "5e9df382ec22953b82005d4b",
  "name": "Beverley Kramer",
  "age": 40,
  "gender": "female",
  "company": "ZYPLE",
  "email": "beverleykramer@zyple.com",
  "phone": "+1 (873) 440-2676",
  "tags": [
    "aliquip",
    "ipsum",
    "sint",
    "enim",
    "adipisicing",
    "et",
    "nostrud"
  ]
},
{
  "_id": "5e9df38208f097558c905bff",
  "name": "Wyatt Pace",
  "age": 25,
  "gender": "male",
  "company": "RUBADUB",
  "email": "wyattpace@rubadub.com",
  "phone": "+1 (932) 592-2306",
  "tags": [
    "minim",
    "elit",
    "magna",
    "aliquip",
    "qui",
    "voluptate",
    "aute"
  ]
},
{
  "_id": "5e9df3820a02091cc1a39663",
  "name": "Hood Browning",
  "age": 22,
  "gender": "male",
  "company": "BIOSPAN",
  "email": "hoodbrowning@biospan.com",
  "phone": "+1 (835) 565-2597",
  "tags": [
    "voluptate",
    "dolore",
    "qui",
    "sunt",
    "ea",
    "aute",
    "veniam"
  ]
},
{
  "_id": "5e9df3823dc9e1a5ba14a100",
  "name": "Jaime Alvarez",
  "age": 34,
  "gender": "female",
  "company": "ISOLOGICA",
  "email": "jaimealvarez@isologica.com",
  "phone": "+1 (974) 498-3471",
  "tags": [
    "laboris",
    "ut",
    "et",
    "excepteur",
    "aliqua",
    "consequat",
    "labore"
  ]
}
]

/****************** CREATE TABLE CLASS ************** */

class CustomTable {
  constructor(data){
      this.data = data;
      this.root = document.querySelector('.dynamic-table');
      this.tableRoot;
  }

  init() {
    const headersEqual = this.checkIfHeadersAreTheSame(this.data);
    if (!headersEqual) {
      this.handleError();
      throw new Error('All headers must be the same');
    }
    this.tableRoot = this.generateTableContainer();
    this.generateTableData(this.tableRoot, this.data);
    this.generateTableHead(this.tableRoot, headersEqual);
    return this;
  }

  handleError (){
    let errorMessage = this.createNewElement('p', this.root, 'error-message', 'Check Your Data!');
  }

  checkIfHeadersAreTheSame(data) {
    let areTheSame = true;
    let numberOfHeaders;
    let headersArray;
    let valueToReturn;
  
    data.forEach((element, index) => {
      let currentNumberOfHeaders = Object.keys(data[index]).length;
      let currentHeadersArray = Object.keys(data[index]);
  
      // ASSIGN VALUES TO CHECK;
      if (!numberOfHeaders) {
        numberOfHeaders = currentNumberOfHeaders;
      }
      if (!headersArray) {
        headersArray = currentHeadersArray;
      } 
      if (currentNumberOfHeaders !== numberOfHeaders) {
        areTheSame = false;
      }
  
      for (let i = 0; i < currentNumberOfHeaders; i += 1) {
        if (currentHeadersArray[i] !== headersArray[i]) {
          areTheSame = false;
        }
      }
    })

    // return array if true, or false otherwise
    if (areTheSame === true) {
      valueToReturn = headersArray;
    } else { valueToReturn = areTheSame; }

    return valueToReturn;
  }

  createNewElement (tagName, parent, className, text) {
    const newElement = document.createElement(tagName);
    if (className) {
      newElement.classList.add(className);
    }
    if (parent) {
        parent.append(newElement);
    }
    if (text) {
      newElement.innerText = text;
    }
    return newElement;
  }

  generateTableContainer() {
    return this.createNewElement('table', this.root, 'table-container')
  }

  generateTableHead(tableElementToFill, arrayOfHeaders) {
    let thead = tableElementToFill.createTHead();
    let row = thead.insertRow();
    for (let header of arrayOfHeaders) {
      //CANT use insertCell for th!!
      let headerToAdd = this.createNewElement('th', row, 'table-header', header)
    }
  }
  
  generateTableData(tableElementToFill, dataObject) {
    for (let element of dataObject) {
      let row = tableElementToFill.insertRow();
      for (let key in element) {
        let cell = row.insertCell();
        let text = document.createTextNode(element[key]);
        cell.appendChild(text);
      }
    }
  }
}

/****************** INITIATE TABLE WITH GIVEN DATA ***************************** */
  
const generatedTable = new CustomTable(tableData).init();
