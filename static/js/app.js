var UIController, dataController, controller;
// UI Controller
UIController = (function() {
    var domStr;
    // Set selectors to variables
    domStr = {
        inputType: '.add__type',
        inputDesc: '.add__description',
        inputVal: '.add__value',
        inputBtn: '.add__btn',
        domIncome: '.income__list',
        domExpense: '.expenses__list',
        budgetField: '.budget__value',
        incomesField: '.budget__income--value',
        expensesField: '.budget__expenses--value',
        percentageField: '.budget__expenses--percentage'
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
        },
        displayBudget: function(obj) {
            document.querySelector(domStr.budgetField).textContent = obj.budget + 'DA';
            document.querySelector(domStr.incomesField).textContent = obj.totalinc + 'DA';
            document.querySelector(domStr.expensesField).textContent = obj.totalexp + 'DA';
            if(obj.perc > 0) {
                document.querySelector(domStr.percentageField).textContent = obj.perc + '%';
            } else {
                document.querySelector(domStr.percentageField).textContent = '--';
            }
        }
    };
})();

// Budget Controller
dataController = (function() {
    var Expense, Income, data, calculateTotale;
    // Expense function constructor
    Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    // Income function constructor
    Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    // Calculate totale incomes and expenses
    calculateTotale = function(type){
        var sum = 0;
        data.allData[type].forEach(function(cur) {
            sum += cur.value;
        });
        data.totals[type] = sum;
    };
    // Array to store data
    data = {
        allData: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        },
        budget: 0,
        percentage: -1
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
        },
        calculateBudget: function() {
            // Calculate totale incomes and expenses
            calculateTotale('inc');
            calculateTotale('exp');
            // Calculate the budget : incomes - expenses
            data.budget = data.totals.inc - data.totals.exp;
            // Calculate percentage of incomes we spent
            if(data.totals.inc > 0) {
                data.percentage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percentage = -1;
            }
        },
        getBudget: function(){
            return {
                budget: data.budget,
                totalinc: data.totals.inc,
                totalexp: data.totals.exp,
                perc: data.percentage
            }
        }
    };
})();

// Controller to link between UI and Budget controllers
controller = (function(UICtrl, dataCtrl) {
    var setEventListeners, updateBudget, ctrlAddButton;
    setEventListeners = function() {
        var domStr, addButton;
        domStr = UIController.getDomStr();
        // Add button fuctionality
        addButton = document.querySelector(domStr.inputBtn);
        addButton.addEventListener('click', ctrlAddButton);

        // When taping enter to retrieve data from field
        document.addEventListener('keypress', function(event) {
            if(event.charCode === 13 || event.which === 13 ) {
                ctrlAddButton();
            }
        });
    };
    updateBudget = function() {
        // 1. Calculate the Budget
        dataController.calculateBudget();
        // 2. Return the Budget
        var budget = dataController.getBudget();
        // 3. Update the Budget on the UI
        UIController.displayBudget(budget);
    };
    ctrlAddButton = function() {
        var inputData, newItem, input;
        input = UIController.getInput();
        // Verify if the description and value fields are not empty and the value field is not equal to 0
        if (input.description !== "" && !isNaN(input.value) && input.value !==0) {
        // TODO LIST
        // 1. Get the data from fieds
        inputData = UIController.getInput();
        // 2. Add the data to dataController
        newItem = dataController.addItem(inputData.type, inputData.description, inputData.value);
        // 3. Display data in Incomes or Expenses
        UIController.addListItem(newItem, inputData.type);
        // 4. Clear fields and focus on description field
        UIController.clearFields();
        // 5. Calculate and update the budget
        updateBudget();
        }
    };
    return {
        init: function() {
            UIController.displayBudget({
                budget: 0,
                totalinc: 0,
                totalexp: 0,
                perc: -1
            });
            setEventListeners();
        }
    };

})(UIController, dataController);

controller.init();