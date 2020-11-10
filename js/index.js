/*-------------------DATE DATA FUNCTIONS------------------------------------- */

function isALeapYear (year) {
    const isDividedByFour = year % 4 === 0;
    const isDevidedByFourHundred = year % 400 === 0;
    const isNotDevidedByHundred = year % 100 !== 0;

    if (isDividedByFour && isNotDevidedByHundred || isDevidedByFourHundred) {
        return true;
    }
}

function getCorrectNumberOfDays(month, year) {
    const isLeapYear = isALeapYear(year);
    switch (month) {
        case 'Apr':
        case 3:
        case 'Jun':
        case 5:
        case 'Sep':
        case 8:
        case 'Nov':
        case 10:
            console.log('thirty');
            return 30;
        case 'Feb':
        case 1:
            if (isLeapYear) {
                console.log('29 leap');
                return 29;
            }
            console.log('28 not leap');
            return 28;
        default:
            console.log('thirty one');
            return 31;
    }
}

const monthsNames = [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const dayList = document.getElementById('dayPicker');
const monthList = document.getElementById('monthPicker');
const yearList = document.getElementById('yearPicker');

/*------------------- HANDLING INITIAL SCROLL ------------------------------------- */

// function scrollToMiddle (element) {
//     const thirdChild = element.children[3]
//     console.log(thirdChild);
//     thirdChild.scrollIntoView({behavior: "smooth", block: "center"})
//     // console.log(thirdChild);
// }

function scrollThreeToMiddle(elementsArray) {
    elementsArray.forEach(function (elementItem) {
            // console.log(elementItem)
            elementItem.scrollTo(0,28);
        });
}

/*------------------- DATE PICKER ------------------------------------- */

class DatePicker {
    constructor(day, month, year) {
        this.currentDay = day;
        this.currentMonth = month;
        this.currentYear = year;
        this.daysArray;
        this.monthsArray;
        this.yearsArray;
    }

    init () {
        const currentDate = new Date();
        console.log(currentDate)
        this.currentDay = currentDate.getDate();
        this.currentMonth = currentDate.getMonth();
        this.currentYear = currentDate.getFullYear();
        console.log(`initiating with: ${this.currentDay}/${this.currentMonth}/${this.currentYear}`)
        // this.populateList(this.currentYear, this.yearsArray, 'year', 9999, yearList) //change to all after all lists prepared
        this.populateAllLists()
    }

    createDateElement (item, parent) {
        let newDateElement = document.createElement('li');
        newDateElement.innerHTML = item;
        parent.append(newDateElement);
    }

    createAdjacentItems (currentDate, type, limit) {
        const middleItem = currentDate;
        const itemsBefore = [];
        const itemsAfter = [];

        for (let i = 1; i < 4; i += 1) {
            if (currentDate >= 3) {
                itemsBefore[i] = currentDate - i;
            }
        }
        itemsBefore.reverse().pop()

        for (let i = 1; i < 4; i += 1) {
            if (currentDate <= limit) {
                itemsAfter[i] = currentDate + i;
            }
        }
        itemsAfter.shift()

        const createdArray = itemsBefore.concat(middleItem, itemsAfter);
        if (type === 'month') {
            const translatedArray = []; 
            createdArray.map((item, index) => {
                translatedArray[index] = monthsNames[item];
            });
            return translatedArray;
        }

        console.log(createdArray)

        switch(type) {
            case 'day':
                console.log('day')
                break;
            case 'month':
                console.log('month')
                
                break;
            case 'year':
                console.log('year')
                break;
            default:
                console.log('default' + currentDateType)
        }
        return createdArray;
    }

    populateList (currentItem, currentItemsArray, type, limit, parent) {
        currentItemsArray = this.createAdjacentItems(currentItem, type, limit);
        console.log('created' + currentItemsArray)
        currentItemsArray.forEach((item) => {
            this.createDateElement(item, parent);
            console.log('creating LI')
        })
    }

    populateAllLists () {
        this.populateList(this.currentDay, this.daysArray, 'day', getCorrectNumberOfDays(this.currentMonth, this.currentYear), dayList);
        this.populateList(this.currentMonth, this.monthsArray, 'month', 10, monthList);
        this.populateList(this.currentYear, this.yearsArray, 'year', 9999, yearList)
    }

    // createDaysArray () {
    //     const numberOfDays = getCorrectNumberOfDays(this.month, this.year);
    //     const daysArray = new Array(7);
    //     const isInDaysRange = (number) => number > 0 && number <= numberOfDays;

    //     console.log(daysArray)
    // }

}

new DatePicker().init()


scrollThreeToMiddle([dayList, monthList, yearList])


// moveDatesScrollMiddlePosition(yearList);
// function createDateElement (classNames, innerHTML, parent) {
//     let newDateElement = document.createElement('li');
//     if (classNames) {
//         newDateElement.classList.add(classNames);
//     }
//     if (innerHTML) {
//         newDateElement.innerHTML = innerHTML;
//     }
//     parent.append(newDateElement);
//     // return newDateElement;
// }

// function dateListItemsCreator(parent, childrenArr) {

//     if (childrenArr && parent) {
//         childrenArr.forEach(element => {
//             parent.append(element);
//         })
//     }
// }

// function dateListItem () {
//     let newDateListItem = createDateElement(null,null,'from js');
//     return newDateListItem;
// } 

function handleMouseMove (event) {
    if (event.target === yearList) {
        console.log("mouse location:", event.clientX, event.clientY)
    }
}

document.addEventListener("mouseover", handleMouseMove);