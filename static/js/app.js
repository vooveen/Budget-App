// UI Controller
var  UIController = (function() {
    // Set selectors to variables
    var domStr = {
        inputType: '.add__type',
        inputDesc: '.add__description',
        inputVal: '.add__value',
        inputBtn: '.add__btn',
        domIncome: '.income__list',
        domExpense: '.expenses__list'
    }
    return {
        getDomStr: function() {
            return domStr;
        },
        // Get data from fields
        getInput: function() {
            return {
                type: document.querySelector(domStr.inputType).value,
                description: document.querySelector(domStr.inputDesc).value,
                value: parseFloat(document.querySelector(domStr.inputVal).value)
            }
        },
        // Add item to the UI
        addListItem: function(obj, type) {
            var html, newHtml, elem;
            if (type === 'inc') {
                elem = domStr.domIncome;
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else if (type === 'exp') {
                elem = domStr.domExpense;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // Replace the values of the html
            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            // Insert the html into the DOM
            document.querySelector(elem).insertAdjacentHTML('beforeend', newHtml);
        },
        // Clear the input fields
        clearFields: function() {
            var fields, fieldsArray;
            // Select description and value fields
            fields = document.querySelectorAll(domStr.inputDesc+', '+domStr.inputVal);
            // Convert the list item to an array
            fieldsArray = Array.prototype.slice.call(fields);
            // Loop through the array and clear the values
            fieldsArray.forEach(function(current, index, array) {
                current.value = "";
            });
            // Set the focus to the description field
            fieldsArray[0].focus();
        }
    };
})();

// Budget Controller
var dataController = (function() {
    // Expense function constructor
    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    // Income function constructor
    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    // Array to store data
    var data = {
        allData: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };
    return {
        addItem: function(type, desc, val) {
            var newItem, ID;
            //Create new ID
            if (data.allData[type].length > 1) {
                ID = data.allData[type][data.allData[type].length - 1].id + 1;
            } else {
                ID = 0;
            }
            // Create new item
            if (type === 'inc') {
                newItem = new Income(ID, desc, val);
            } else if (type === 'exp'){
                newItem = new Income(ID, desc, val);
            }
            // Push the created item to the data structure
            data.allData[type].push(newItem);
            return newItem;
        }
    };
})();

// Controller to link between UI and Budget controllers
var  controller = (function(UICtrl, dataCtrl) {
    var setEventListeners = function() {
        var domStr = UIController.getDomStr();
        // Add button fuctionality
        var addButton = document.querySelector(domStr.inputBtn);
        addButton.addEventListener('click', ctrlAddButton);

        // When taping enter to retrieve data from field
        document.addEventListener('keypress', function(event) {
            if(event.charCode === 13 || event.which === 13 ) {
                ctrlAddButton();
            }
        });
    };
    var ctrlAddButton = function() {
        var inputData, newItem;
        // TODO LIST
        // 1. Get the data from fieds
        inputData = UIController.getInput();
        // 2. Add the data to dataController
        newItem = dataController.addItem(inputData.type, inputData.description, inputData.value);
        // 3. Display data in Incomes or Expenses
        UIController.addListItem(newItem, inputData.type);
        // Clear fields and focus on description field
        UIController.clearFields();
        // 4. Calculate the Budget
        // 5. Update the Budget
    };
    return {
        init: function() {
            setEventListeners();
        }
    };

})(UIController, dataController);

controller.init();