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
        case 'Jun':
        case 'Sep':
        case 'Nov':
            console.log('thirty');
            return 30;
        case 'Feb':
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

function scrollToMiddle (element) {
    const thirdChild = element.children[3]
    // console.log(thirdChild);
    thirdChild.scrollIntoView({behavior: "smooth", block: "center"})
    // console.log(thirdChild);
}

function scrollThreeToMiddle(elementsArray) {
    elementsArray.forEach(function (elementItem) {
            // console.log(elementItem)
            scrollToMiddle(elementItem);
        });
}

/*------------------- DATE PICKER ------------------------------------- */

class DatePicker {
    constructor(day, month, year) {
        this.currentDay = day;
        this.currentMonth = month;
        this.currentYear = year;
        this.daysArray = new Array(7);
        this.monthsArray = new Array(7);
        this.yearsArray = new Array(7);
    }

    init () {
        const currentDate = new Date();
        console.log(currentDate)
        this.currentDay = currentDate.getDate();
        this.currentMonth = currentDate.getMonth();
        this.currentYear = currentDate.getFullYear();
        console.log(`initiating with: ${this.currentDay}/${this.currentMonth}/${this.currentYear}`)
        this.populateList(this.currentYear, yearList) //change to all after all lists prepared
        this.createAdjacentMonthItems ()
    }

    createDateElement (item, parent) {
        let newDateElement = document.createElement('li');
        newDateElement.innerHTML = item;
        parent.append(newDateElement);
    }

    createAdjacentDayItems () {
        
    }

    
    createAdjacentMonthItems () {
        const currentMonthsName = monthsNames[this.currentMonth]
        this.monthsArray[3] = monthsNames[this.currentMonth];

        //get the numbers first, then tranlsate into names
        console.log(this.monthsArray)
        const monthsBefore = [];
        const monthsAfter = [];
        for (let i = 1; i < 4; i += 1) {
            if (this.currentMonth >= 3) {
                monthsBefore[i] = monthsNames[this.currentMonth -i];
            }
        }
        monthsBefore.reverse().pop()

        for (let i = 1; i < 4; i += 1) {
            if (this.currentYear <= 9997) {
                monthsAfter[i] = this.currentYear + i;
            }
        }
        monthsAfter.shift()

        this.monthsArray = monthsBefore.concat(this.currentMonth, monthsAfter);
    }


    createAdjacentYearsItems () {
        this.yearsArray[3] = this.currentYear;
        const yearsBefore = [];
        const yearsAfter = [];

        for (let i = 1; i < 4; i += 1) {
            if (this.currentYear >= 3) {
                yearsBefore[i] = this.currentYear - i;
            }
        }
        yearsBefore.reverse().pop()

        for (let i = 1; i < 4; i += 1) {
            if (this.currentYear <= 9997) {
                yearsAfter[i] = this.currentYear + i;
            }
        }
        yearsAfter.shift()

        this.yearsArray = yearsBefore.concat(this.currentYear, yearsAfter);
        console.log(this.yearsArray)
    }

    populateList (currentItem, parent) {
        this.createAdjacentYearsItems(currentItem);
        this.yearsArray.forEach((item) => {
            this.createDateElement(item, parent);
            console.log('creating LI')
        })
    }

    populateAllLists () {
        this.populateList(this.currentDay, dayList);
        this.populateList(this.currentMonth, monthList);
        this.populateList(this.currentYear, yearList);
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