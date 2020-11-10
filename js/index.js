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

const monthsNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const dayList = document.getElementById('dayPicker');
const monthList = document.getElementById('monthPicker');
const yearList = document.getElementById('yearPicker');

const pickersArray = [dayList, monthList, yearList];
/*------------------- HANDLING INITIAL SCROLL ------------------------------------- */

function scrollThreeToMiddle(elementsArray) {
    elementsArray.forEach(function (elementItem) {
            // console.log(elementItem)
            elementItem.scrollTo(0,33);
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
        this.lenghtOfArrays = 7;
    }

    init (currentDate) {
        // const currentDate = new Date();
        console.log(currentDate)
        this.currentDay = currentDate.getDate();
        this.currentMonth = currentDate.getMonth();
        this.currentYear = currentDate.getFullYear();
        console.log(`initiating with: ${this.currentDay}/${this.currentMonth}/${this.currentYear}`)
        this.populateAllLists();
        return this;
    }

    createDateElement (item, parent) {
        let newDateElement = document.createElement('li');
        newDateElement.innerHTML = item;
        if (parent) {
            parent.append(newDateElement);
        }
    }

    createAdjacentItems (currentDate, type, limit) {
        const middleItem = currentDate;
        const itemsBefore = [];
        const itemsAfter = [];

        for (let i = 1; i < 4; i += 1) {
            if (middleItem >= 3) {
                itemsBefore[i] = middleItem - i;

            } else {
                itemsBefore[i] = limit - i;
            }
            // console.log(itemsBefore[i])
        }
        itemsBefore.reverse().pop()

        for (let i = 1; i < 4; i += 1) {
            const nextItem = middleItem + i;
            if (nextItem > limit) {
                itemsAfter[i] = middleItem - limit + i;

            } else {
                itemsAfter[i] = middleItem + i;
            }
            // console.log(itemsAfter[i])
        }
        itemsAfter.shift()

        const createdArray = itemsBefore.concat(middleItem, itemsAfter);
        // console.log(createdArray)
        if (type === 'month') {
            const translatedArray = []; 
            createdArray.map((item, index) => {
                // translatedArray[index] = monthsNames[item % limit];
                translatedArray[index] = this.convertNumberToMonthName(item);
            });
            // console.log(translatedArray)
            return translatedArray;
        }

        return createdArray;
    }

    populateList (currentItem, currentItemsArray, type, limit, parent) {
        currentItemsArray = this.createAdjacentItems(currentItem, type, limit);
        // console.log('created' + currentItemsArray)
        currentItemsArray.forEach((item) => {
            this.createDateElement(item, parent);
            // console.log('creating LI')
        })
    }

    populateAllLists () {
        this.populateList(this.currentDay, this.daysArray, 'day', getCorrectNumberOfDays(this.currentMonth, this.currentYear), dayList);
        this.populateList(this.currentMonth, this.monthsArray, 'month', 12, monthList);
        this.populateList(this.currentYear, this.yearsArray, 'year', 9999, yearList)
    }

    // addItemBeforeFirstAndRemoveLast (element) {

    // }

    updateCurrentDate (array) {
        // this.currentDay = 
        // this.currentMonth = 
        // this.currentYear = 
    }

    convertMonthNameToIndex(monthName) {
        return monthsNames.indexOf(monthName);
    }
    
    convertNumberToMonthName(number) {
        return monthsNames[number % 12];
    }

    convertInnerTextToNumber (text) {
        return parseInt(text);
    }

    addItemsToListWhileScrollUp (element) {
        // console.log('gonna add up to: ' + element.id);
        // console.log('children: ')
        // console.log(element.children);
        const isAMonth = element.id === 'monthPicker';
        const elementsChildren = element.children;
        const firstChild = elementsChildren[0];
        const lastChild = elementsChildren[this.lenghtOfArrays - 1];
        // console.log('last: ')
        // console.log(lastChild);
        let firstChildsValue;
        let itemToInsertBefore;
        if (isAMonth) {
            firstChildsValue = this.convertMonthNameToIndex(firstChild.innerText);
            itemToInsertBefore = (firstChildsValue - 1) //INSERT LOGIC!!!

        } else { firstChildsValue = this.convertInnerTextToNumber(firstChild.innerText) }
        // console.log('first value: ')
        // console.log(firstChildsValue);
        element.append
    }

    addItemsToListWhileScrollDown (element) {
        console.log('gonna add down')
        console.log('children: ')
        console.log(element.children);
        const isAMonth = element.id === 'monthPicker';
        console.log(isAMonth)
        const elementsChildren = element.children;
        const lastChild = element.lastChild;
        let lastChildsValue;
        if (isAMonth) {
            lastChildsValue = this.convertMonthNameToIndex(lastChild.innerText)
        } else { lastChildsValue = this.convertInnerTextToNumber(lastChild.innerText) }
        console.log('last value: ')
        console.log(lastChildsValue);
    }
}

/*------------------- INITIATE DATE PICKER WITH CURRENT VALUE ------------------------------------- */

const datePickerCreated = new DatePicker().init(new Date())

/*------------------- SCROLL DATES TO THE CURRENT IN THE MIDDLE ------------------------------------- */

scrollThreeToMiddle(pickersArray)

/*------------------- EVENT LISTENERS HANDLERS ------------------------------------- */

function handleMouseMove (event) {
    // if (yearItems.includes(event.target)) {
        console.log("mouse location:", event.clientX, event.clientY)
        console.log(event.target)
    // }
}
// function createDateElement (item, parent) {
//     let newDateElement = document.createElement('li');
//     newDateElement.innerHTML = item;
//     if (parent) {
//         parent.append(newDateElement);
//     }
// }

// function addItemsToListWhileScrollUp(element) {
//     console.log(element.children)
//     const currentFirstElement = element.children[0];
//     const currentLastElement = element.children[element.children.length - 1];
//     const currentFirstValue = currentFirstElement.innerHTML;
//     // console.log(currentFirstElement, currentFirstValue)
//     createDateElement(currentFirstValue-1, element);
//     element.removeChild(currentLastElement)
//     console.log(element.children)
// }

// function addItemsToListWhileScrollDown(element) {
//     // console.log(element.children)
//     const currentFirstElement = element.children[0];
//     const currentLastElement = element.children[element.children.length - 1];
//     const currentLastValue = currentLastElement.innerText;
//     // console.log(currentLastElement, currentLastValue)
//     const newValueToAddOnTheBottom = parseInt(currentLastValue) + 1;
//     createDateElement(newValueToAddOnTheBottom, element);
//     element.removeChild(currentFirstElement)
//     // console.log(element.children)
// }

let lastScrollValue;
function isScrollingUp (event) {
    const elementsScroll = event.target.scrollTop;
    if (lastScrollValue === undefined) {
        lastScrollValue = elementsScroll;
    }
    if (elementsScroll > lastScrollValue) {
        // console.log('down')
        lastScrollValue = elementsScroll;
        return false;
    }
    if (elementsScroll < lastScrollValue) {
        // console.log('up')
        lastScrollValue = elementsScroll;
        return true;
    }
    // console.log(elementsScroll, lastScrollValue)
}

function handleScrollEvent (scrollGoingUp, event) {
    const scrollUp = scrollGoingUp
    // console.log(datePickerCreated);
    console.log('scroll going up: ' + scrollUp);
    if (scrollUp) {
        console.log ('adding dates up')
        datePickerCreated.addItemsToListWhileScrollUp(event.target);
    } else {
        console.log ('adding dates down')
        datePickerCreated.addItemsToListWhileScrollDown(event.target);
    }
}

/*------------------- ADD EVENT LISTENERS  ------------------------------------- */

// pickersArray.forEach(item => item.addEventListener("mouseover", handleMouseMove, false));
let isScrolling = false;

pickersArray.forEach(item => item.addEventListener("scroll", function(event) {
    const scrollUp = isScrollingUp(event);
    // console.log(scrollUp)
    if (!isScrolling) {
        // console.log('isnt')
        setTimeout(function() {
            handleScrollEvent(scrollUp, event);
            isScrolling = false;
        }, 300)
    }
    isScrolling = true;
    // console.log('is')
}))
