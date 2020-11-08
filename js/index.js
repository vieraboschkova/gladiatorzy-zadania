const dayList = document.getElementById('dayPicker');
const monthList = document.getElementById('monthPicker');
const yearList = document.getElementById('yearPicker');

/*------------------- FUNCTIONS------------------------------------- */
function createDateElement (classNames, id, innerHTML) {
    let newDateElement = document.createElement('li');
    if (classNames) {
        newDateElement.classList.add(classNames);
    }
    if (id) {
        newDateElement.id = id;
    }
    if (innerHTML) {
        newDateElement.innerHTML = innerHTML;
    }
    return newDateElement;
}

function dateListItemsCreator(parent, childrenArr) {

    if (childrenArr && parent) {
        childrenArr.forEach(element => {
            parent.append(element);
        })
    }
}

function dateListItem () {
    let newDateListItem = createDateElement(null,null,'from js');
    return newDateListItem;
} 

function handleMouseMove (event) {
    if (event.target === dayList) {
        console.log("mouse location:", event.clientX, event.clientY)
        dateListItemsCreator(dayList, [dateListItem(), dateListItem()])
    }
}

document.addEventListener("click", handleMouseMove);