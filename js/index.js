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

// function scrollToBottomAndUp(element) {
//     // element.scrollTop = element.scrollHeight;
//     // element.scrollTop = 0;
//     // element.scrollY
//     console.log('scrolling to bottom' + element.height)
//     element.scrollTo(0,32);
//     element.scrollTo(0,33);
//     console.log('scrolling up ')
// }

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
        // this.daysArray;
        // this.monthsArray;
        // this.yearsArray;
        this.lenghtOfArrays = 7;
        this.daysLimit;
        this.monthsLimit = 12;
        this.yearsLimit = 9999;
        // this.numberOfScrolls = 0;
    }

    init (currentDate) {
        // const currentDate = new Date();
        console.log(currentDate)
        this.currentDay = currentDate.getDate();
        this.currentMonth = currentDate.getMonth();
        this.currentYear = currentDate.getFullYear();
        this.daysLimit = getCorrectNumberOfDays(this.currentMonth, this.currentYear);
        console.log(`initiating with: ${this.currentDay}/${this.currentMonth}/${this.currentYear} and number of days in this month: ${this.daysLimit}`)
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
            // console.log(itemsBefore[i])
        }
        itemsBefore.reverse().pop()

        for (let i = 1; i < 4; i += 1) {
            const nextItem = middleItem + i;
            if (nextItem > limit) {
                itemsAfter[i] = middleItem - limit + i;
                // console.log('bigger than limit')
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

    populateList (currentItem, type, limit, parent) {
        const currentItemsArray = this.createAdjacentItems(currentItem, type, limit);
        // console.log('created' + currentItemsArray)
        currentItemsArray.forEach((item) => {
            this.createDateElement(item, parent);
            // console.log('creating LI')
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
        // console.log(dayListItems)
        let dayListValues = [];
        for (let i = 0; i < dayListItems.length; i += 1) {
            dayListValues.push(this.convertInnerTextToNumber(dayListItems[i].innerText))
        }
        // console.log(dayListValues + ' :limit: ' + this.daysLimit)
        const allSmallerThanLimit = dayListValues.every((number) => {
            return number <= this.daysLimit;
        })
        // console.log('days limit: ' + this.daysLimit)
        // console.log('are smaller: ' + allSmallerThanLimit)
        const desiredOrder = this.createAdjacentItems(this.currentDay, 'day', this.daysLimit);
        // console.log('should be: ' + desiredOrder)
        const arraysHaveTheSameLength = dayListValues.length === desiredOrder.length;
        const arraysHaveTheSameValues = dayListValues.every((value, index) => {
            return value === desiredOrder[index];
        })

        const orderIsCorrect = arraysHaveTheSameLength && arraysHaveTheSameValues;

        // console.log('days limit: ' + this.daysLimit)
        // console.log('order correct: ' + orderIsCorrect)
        const daysArecorrect = allSmallerThanLimit && orderIsCorrect;
        // console.log('all correct: ' + daysArecorrect)
        return daysArecorrect;
    }

    updateDaysArray() {
        // If Wrong current day
        const wrongCurrentDay = this.currentDay > this.daysLimit;
        if (wrongCurrentDay) {
            this.currentDay = this.daysLimit;
        }
        const updatedDays = this.createAdjacentItems(this.currentDay, 'day', this.daysLimit);
        const dayItems = dayList.children;
        // console.log('updating...' + this.daysLimit)
        // console.log(updatedDays)
        for (let i = 0; i < dayItems.length; i += 1) {
            dayItems[i].innerText = updatedDays[i]
            // console.log(dayItems[i])
        }
    }

    updateClassNames(element) {
        // console.log(element)
        const elementsChildren = element.children;
        const classNamesOrder = ['date-three-difference', 'date-two-difference', 'date-one-difference', 'date-current',
            'date-one-difference', 'date-two-difference', 'date-three-difference'];
        // console.log('updating classnames of element')
        classNamesOrder.forEach((classNameToAdd, index) => {
            if (classNameToAdd !== null) {
                elementsChildren[index].className = classNameToAdd;
            }
            // console.log (elementsChildren)
        }) 
    }

    updateAllClassNames (arrayOfElements) {
        allDateTypeLists.forEach((element) => {
            this.updateClassNames(element);
        })
    }

    updateCurrentDateData (element) {
        // console.log(element.children);
        const newCurrent = element.children[3];
        const newCurrentValue = newCurrent.innerText;
        // console.log(newCurrentValue);
        const isADay = element.id === 'dayPicker';
        const isAMonth = element.id === 'monthPicker';
        const isAYear = element.id === 'yearPicker';

        // console.log(this.currentDay, (this.currentMonth), this.currentYear)
        if (isADay) {
            this.currentDay = this.convertInnerTextToNumber(newCurrentValue);
        }
        if (isAMonth) {
            this.currentMonth = this.convertMonthNameToIndex(newCurrentValue);
        }
        if (isAYear) {
            this.currentYear = this.convertInnerTextToNumber(newCurrentValue);
        }
        
        // const daysAreCorrect;
        this.updateDaysLimit(this.currentMonth, this.currentYear);
        // console.log(this.currentDay, this.currentMonth, this.currentYear)
        const daysAreCorrect = this.checkIfDaysAreCorrect();
        // console.log('from update: days are correct: ' + daysAreCorrect)
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
        console.log('SCROLL UP: gonna add up to: ' + element.id);
        // console.log('children: ')
        // console.log(element.children);
        const isADay = element.id === 'dayPicker';
        const isAMonth = element.id === 'monthPicker';
        const isAYear = element.id === 'yearPicker';
        const elementsChildren = element.children;
        const firstChild = elementsChildren[0];
        const lastChild = elementsChildren[this.lenghtOfArrays - 1];
        // console.log('last: ')
        // console.log(lastChild);
        let firstChildsValue;
        let valueToInsertBefore;
        let itemToInsertBefore;
        // CHANGE LIMIT FOR DAYS IN MONTH IF SCROLLING MONTH
        if (isAMonth) {
            firstChildsValue = this.convertMonthNameToIndex(firstChild.innerText);
            if (firstChildsValue === 0) {
                valueToInsertBefore = this.convertNumberToMonthName(this.monthsLimit - 1);
                
            } else {
                valueToInsertBefore = this.convertNumberToMonthName(firstChildsValue - 1)
            }
            // console.log(valueToInsertBefore)
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
        // console.log('first value: ')
        // console.log(firstChildsValue);
        // console.log('new value: ')
        // console.log(itemToInsertBefore);

        firstChild.insertAdjacentElement('beforebegin', itemToInsertBefore);
        element.removeChild(lastChild);
        // this.numberOfScrolls = 2;
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
        console.log('SCROLL DOWN: last: ')
        // console.log(lastChild);
        let lastChildsValue;
        let valueToInsertAfter;
        let itemToInsertAfter;

        if (isAMonth) {
            lastChildsValue = this.convertMonthNameToIndex(lastChild.innerText);
            if (lastChildsValue === this.monthsLimit) { //11?
                valueToInsertAfter = this.convertNumberToMonthName(1);
                
            } else {
                valueToInsertAfter = this.convertNumberToMonthName(lastChildsValue + 1)
            }
            // console.log(valueToInsertAfter)
        } else {
            lastChildsValue = this.convertInnerTextToNumber(lastChild.innerText);
            if (isAYear) {
                // if (lastChildsValue === this.yearsLimit) {
                    valueToInsertAfter = (lastChildsValue + 1) % this.yearsLimit;
                // }
            } else if (isADay) {
                // if (lastChildsValue === this.daysLimit) {
                    valueToInsertAfter = (lastChildsValue + 1) % this.daysLimit;
                // } 
            }

        }

        itemToInsertAfter = this.createDateElement(valueToInsertAfter, null);
        // console.log('new value: ')
        // console.log(valueToInsertAfter);
        // console.log(itemToInsertAfter);

        lastChild.insertAdjacentElement('afterend', itemToInsertAfter);
        element.removeChild(firstChild);
        scrollToMiddle(element);
        this.updateCurrentDateData(element);
        // console.log('last value: ')
        // console.log(lastChildsValue);
    }
}

/*------------------- INITIATE DATE PICKER WITH CURRENT VALUE ------------------------------------- */

const datePickerCreated = new DatePicker().init(new Date())

/*------------------- SCROLL DATES TO THE CURRENT IN THE MIDDLE ------------------------------------- */

scrollThreeToMiddle(allDateTypeLists)

/*------------------- EVENT LISTENERS HANDLERS ------------------------------------- */

function handleMouseMove (event) {
    // if (yearItems.includes(event.target)) {
        console.log("mouse location:", event.clientX, event.clientY)
        console.log(event.target)
    // }
}

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

function handleScrollEvent (scrollGoingUp, element) {
    const scrollUp = scrollGoingUp
    // console.log(datePickerCreated);
    // console.log('scroll going up: ' + scrollUp);
    if (scrollUp) {
        // console.log ('adding dates up')
        datePickerCreated.addItemsToListWhileScrollUp(element);
    } else {
        // console.log ('adding dates down')
        datePickerCreated.addItemsToListWhileScrollDown(element);
    }
}

/*------------------- ADD EVENT LISTENERS  ------------------------------------- */

// allDateTypeLists.forEach(item => item.addEventListener("mouseover", handleMouseMove, false));
let isScrolling = false;
let scrollUp;
let wheelEvent = false;


allDateTypeLists.forEach(item => item.addEventListener("wheel", function(event) {
    // wheelEvent = true;
    console.log('wheel' + event.deltaY)
    console.log(event.target.tagName)
    console.log(event.target.parentNode)
    let scrollTargetElement = event.target;

    if (event.target.tagName === 'LI') {
        scrollTargetElement = event.target.parentNode;
    }
    console.log(scrollTargetElement)
    if (!wheelEvent) {
        setTimeout(function() {
            console.log(scrollTargetElement)
            handleScrollEvent(scrollUp, scrollTargetElement);
            wheelEvent = false;
            console.log('wheel event')
        }, 100)
    }
    wheelEvent = true;
 }))
 
 // allDateTypeLists.forEach(item => item.addEventListener("scroll", function(event) {
 //     scrollUp = isScrollingUp(event);
 //     console.log(scrollUp)
//  }))
 
 
allDateTypeLists.forEach(item => item.addEventListener("scroll", function(event) {
    scrollUp = isScrollingUp(event);
    // let userIsScrolling = datePickerCreated.numberOfScrolls >= 3;
    // console.log('scrollimng')
    // console.log(event.target)
    if (!isScrolling) {
        // console.log('isnt')
        setTimeout(function() {
            //  if (wheelEvent) {
            //  handleScrollEvent(scrollUp, event);
            //  }
                isScrolling = false;
                // console.log(event.target)
                // scrollTargetElement = event.target;
                // console.log(scrollTargetElement)
                // }
                console.log ('scroll event')
        }, 100)
    }
    isScrolling = true;
    // datePickerCreated.numberOfScrolls += 1;
    // console.log(initiatingScrolls, userIsScrolling)
}))

/*
allDateTypeLists.forEach(item => item.addEventListener("wheel", function(event) {
   wheelEvent = true;
   console.log('wheel' + wheelEvent)
   setTimeout(function() {
       wheelEvent = false;
       console.log('wheel event')
   }, 200)
}))

// allDateTypeLists.forEach(item => item.addEventListener("scroll", function(event) {
//     scrollUp = isScrollingUp(event);
//     console.log(scrollUp)
// }))


allDateTypeLists.forEach(item => item.addEventListener("scroll", function(event) {
    const scrollUp = isScrollingUp(event);
    // let userIsScrolling = datePickerCreated.numberOfScrolls >= 3;
    console.log('scrollimng')
    
    if (!isScrolling) {
        // console.log('isnt')
        setTimeout(function() {
                if (wheelEvent) {
                handleScrollEvent(scrollUp, event);
                }
                isScrolling = false;
                // }
                console.log ('handling scroll event')
        }, 100)
    }
    isScrolling = true;
    // datePickerCreated.numberOfScrolls += 1;
    // console.log(initiatingScrolls, userIsScrolling)
}))
*/
