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
            // console.log('thirty');
            return 30;
        case 'Feb':
        case 1:
            if (isLeapYear) {
                // console.log('29 leap');
                return 29;
            }
            // console.log('28 not leap');
            return 28;
        default:
            // console.log('thirty one');
            return 31;
    }
}

const monthsNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const dayList = document.getElementById('dayPicker');
const monthList = document.getElementById('monthPicker');
const yearList = document.getElementById('yearPicker');

const allDateTypeLists = [dayList, monthList, yearList];
/*------------------- HANDLING INITIAL SCROLL ------------------------------------- */

function scrollToMiddle(element) {
    element.scrollTo(0,25);
}

function scrollThreeToMiddle(elementsArray) {
    elementsArray.forEach(function (elementItem) {
            // console.log(elementItem)
            // elementItem.scrollTo(0,33);
            scrollToMiddle(elementItem);
        });
}

/*------------------- DATE PICKER ------------------------------------- */

class DatePicker {
    constructor(day, month, year) {
        this.currentDay = day;
        this.currentMonth = month;
        this.currentYear = year;
        this.lenghtOfArrays = 7;
        this.daysLimit;
        this.monthsLimit = 12;
        this.yearsLimit = 9999;
    }

    init (currentDate) {
        // console.log(currentDate)
        this.currentDay = currentDate.getDate();
        this.currentMonth = currentDate.getMonth();
        this.currentYear = currentDate.getFullYear();
        this.daysLimit = getCorrectNumberOfDays(this.currentMonth, this.currentYear);
        // console.log(`initiating with: ${this.currentDay}/${this.currentMonth}/${this.currentYear} and number of days in this month: ${this.daysLimit}`)
        this.populateAllLists();
        this.updateAllClassNames(allDateTypeLists);
        return this;
    }

    createDateElement (item, parent) {
        let newDateElement = document.createElement('li');
        newDateElement.innerHTML = item;
        if (parent) {
            parent.append(newDateElement);
        }
        return newDateElement;
    }

    createAdjacentItems (currentDate, type, limit) {
        const middleItem = currentDate;
        const itemsBefore = [];
        const itemsAfter = [];

        for (let i = 1; i < 4; i += 1) {
            const previousItem = middleItem - i;
            if (previousItem < 1) {
                itemsBefore[i] = middleItem + limit - i;

            } else {
                itemsBefore[i] = middleItem - i;
            }
        }
        itemsBefore.reverse().pop()

        for (let i = 1; i < 4; i += 1) {
            const nextItem = middleItem + i;
            if (nextItem > limit) {
                itemsAfter[i] = middleItem - limit + i;
            } else {
                itemsAfter[i] = middleItem + i;
            }
        }
        itemsAfter.shift()

        const createdArray = itemsBefore.concat(middleItem, itemsAfter);
        if (type === 'month') {
            const translatedArray = []; 
            createdArray.map((item, index) => {
                translatedArray[index] = this.convertNumberToMonthName(item);
            });
            return translatedArray;
        }

        return createdArray;
    }

    populateList (currentItem, type, limit, parent) {
        const currentItemsArray = this.createAdjacentItems(currentItem, type, limit);
        currentItemsArray.forEach((item) => {
            this.createDateElement(item, parent);
        })
    }

    populateAllLists () {
        this.populateList(this.currentDay, 'day', this.daysLimit, dayList);
        this.populateList(this.currentMonth, 'month', this.monthsLimit, monthList);
        this.populateList(this.currentYear, 'year', this.yearsLimit, yearList)
    }

    updateDaysLimit (newMonth, newYear) {
        this.daysLimit = getCorrectNumberOfDays(newMonth, newYear)
    }

    checkIfDaysAreCorrect() {
        const dayListItems = dayList.children;
        let dayListValues = [];

        for (let i = 0; i < dayListItems.length; i += 1) {
            dayListValues.push(this.convertInnerTextToNumber(dayListItems[i].innerText))
        }

        const allSmallerThanLimit = dayListValues.every((number) => {
            return number <= this.daysLimit;
        })

        const desiredOrder = this.createAdjacentItems(this.currentDay, 'day', this.daysLimit);
        const arraysHaveTheSameLength = dayListValues.length === desiredOrder.length;

        const arraysHaveTheSameValues = dayListValues.every((value, index) => {
            return value === desiredOrder[index];
        })

        const orderIsCorrect = arraysHaveTheSameLength && arraysHaveTheSameValues;
        const daysArecorrect = allSmallerThanLimit && orderIsCorrect;
        return daysArecorrect;
    }

    updateDaysArray() {
        const wrongCurrentDay = this.currentDay > this.daysLimit;

        if (wrongCurrentDay) {
            this.currentDay = this.daysLimit;
        }

        const updatedDays = this.createAdjacentItems(this.currentDay, 'day', this.daysLimit);
        const dayItems = dayList.children;

        for (let i = 0; i < dayItems.length; i += 1) {
            dayItems[i].innerText = updatedDays[i]
        }
    }

    updateClassNames(element) {
        const elementsChildren = element.children;
        const classNamesOrder = ['date-three-difference', 'date-two-difference', 'date-one-difference', 'date-current',
            'date-one-difference', 'date-two-difference', 'date-three-difference'];
        classNamesOrder.forEach((classNameToAdd, index) => {
            if (classNameToAdd !== null) {
                elementsChildren[index].className = classNameToAdd;
            }
        }) 
    }

    updateAllClassNames () {
        allDateTypeLists.forEach((element) => {
            this.updateClassNames(element);
        })
    }

    updateCurrentDateData (element) {
        const newCurrent = element.children[3];
        const newCurrentValue = newCurrent.innerText;
        const isADay = element.id === 'dayPicker';
        const isAMonth = element.id === 'monthPicker';
        const isAYear = element.id === 'yearPicker';

        if (isADay) {
            this.currentDay = this.convertInnerTextToNumber(newCurrentValue);
        }
        if (isAMonth) {
            this.currentMonth = this.convertMonthNameToIndex(newCurrentValue);
        }
        if (isAYear) {
            this.currentYear = this.convertInnerTextToNumber(newCurrentValue);
        }
        
        this.updateDaysLimit(this.currentMonth, this.currentYear);
        const daysAreCorrect = this.checkIfDaysAreCorrect();

        if (!daysAreCorrect) {
            this.updateDaysArray()
        }
        this.updateClassNames(element);
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
        const isADay = element.id === 'dayPicker';
        const isAMonth = element.id === 'monthPicker';
        const isAYear = element.id === 'yearPicker';
        const elementsChildren = element.children;
        const firstChild = elementsChildren[0];
        const lastChild = elementsChildren[this.lenghtOfArrays - 1];
        let firstChildsValue;
        let valueToInsertBefore;
        let itemToInsertBefore;

        if (isAMonth) {
            firstChildsValue = this.convertMonthNameToIndex(firstChild.innerText);
            if (firstChildsValue === 0) {
                valueToInsertBefore = this.convertNumberToMonthName(this.monthsLimit - 1);
                
            } else {
                valueToInsertBefore = this.convertNumberToMonthName(firstChildsValue - 1)
            }
        } else {
            firstChildsValue = this.convertInnerTextToNumber(firstChild.innerText);
            if (firstChildsValue === 1) {
                if (isADay) {
                    valueToInsertBefore = this.daysLimit;
                } else {
                    valueToInsertBefore = this.yearsLimit;
                }
            } else {
                valueToInsertBefore = firstChildsValue - 1;
            }
        }
        
        itemToInsertBefore = this.createDateElement(valueToInsertBefore, null);
        firstChild.insertAdjacentElement('beforebegin', itemToInsertBefore);
        element.removeChild(lastChild);
        scrollToMiddle(element);
        this.updateCurrentDateData(element);
    }

    addItemsToListWhileScrollDown (element) {
        const isADay = element.id === 'dayPicker';
        const isAMonth = element.id === 'monthPicker';
        const isAYear = element.id === 'yearPicker';
        const elementsChildren = element.children;
        const firstChild = elementsChildren[0];
        const lastChild = elementsChildren[this.lenghtOfArrays - 1];
        let lastChildsValue;
        let valueToInsertAfter;
        let itemToInsertAfter;

        if (isAMonth) {
            lastChildsValue = this.convertMonthNameToIndex(lastChild.innerText);
            if (lastChildsValue === this.monthsLimit) {
                valueToInsertAfter = this.convertNumberToMonthName(1);
                
            } else {
                valueToInsertAfter = this.convertNumberToMonthName(lastChildsValue + 1)
            }
        } else {
            lastChildsValue = this.convertInnerTextToNumber(lastChild.innerText);
            if (isAYear) {
                    valueToInsertAfter = (lastChildsValue + 1) % this.yearsLimit;
            } else if (isADay) {
                    valueToInsertAfter = (lastChildsValue + 1) % this.daysLimit;
            }

        }

        itemToInsertAfter = this.createDateElement(valueToInsertAfter, null);
        lastChild.insertAdjacentElement('afterend', itemToInsertAfter);
        element.removeChild(firstChild);
        scrollToMiddle(element);
        this.updateCurrentDateData(element);
    }
}

/*------------------- INITIATE DATE PICKER WITH CURRENT VALUE ------------------------------------- */

const datePickerCreated = new DatePicker().init(new Date())

/*------------------- SCROLL DATES TO THE CURRENT IN THE MIDDLE ------------------------------------- */

scrollThreeToMiddle(allDateTypeLists)

/*------------------- EVENT LISTENERS HANDLERS ------------------------------------- */

function handleMouseOver (event) {
    // if (yearItems.includes(event.target)) {
        console.log("mouse location:", event.clientX, event.clientY)
        console.log(event.target)
    // }
}

// GET SCROLL DIRECTION
let lastScrollValue;
function isScrollingUp (event) {
    const elementsScroll = event.target.scrollTop;
    if (lastScrollValue === undefined) {
        lastScrollValue = elementsScroll;
    }
    if (elementsScroll > lastScrollValue) {
        lastScrollValue = elementsScroll;
        return false;
    }
    if (elementsScroll < lastScrollValue) {
        lastScrollValue = elementsScroll;
        return true;
    }
}

function handleScrollEvent (scrollGoingUp, element) {
    const scrollUp = scrollGoingUp
    if (scrollUp) {
        datePickerCreated.addItemsToListWhileScrollUp(element);
    } else {
        datePickerCreated.addItemsToListWhileScrollDown(element);
    }
}

/*------------------- ADD EVENT LISTENERS  ------------------------------------- */

// allDateTypeLists.forEach(item => item.addEventListener("mouseover", handleMouseMove, false));
let isScrolling = false;
let scrollUp;
let wheelEvent = false;


allDateTypeLists.forEach(item => item.addEventListener("wheel", function(event) {
    let scrollTargetElement = event.target;

    if (event.target.tagName === 'LI') {
        scrollTargetElement = event.target.parentNode;
    }

    if (!wheelEvent) {
        setTimeout(function() {
            handleScrollEvent(scrollUp, scrollTargetElement);
            wheelEvent = false;
        }, 100)
    }
    wheelEvent = true;
 }))
 
allDateTypeLists.forEach(item => item.addEventListener("scroll", function(event) {
    scrollUp = isScrollingUp(event);
    if (!isScrolling) {
        setTimeout(function() {
                isScrolling = false;
        }, 100)
    }
    isScrolling = true;
}))
