// UI Controller
var  UIController = (function() {
    // Set selectors to variables
    var domStr = {
        inputType: '.add__type',
        inputDesc: '.add__description',
        inputVal: '.add__value',
        inputBtn: '.add__btn'
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
                value: document.querySelector(domStr.inputVal).value
            }
        }
    };
})();

// Budget Controller
var dataController = (function() {

    // Some Code here

})();

// Controller to link between UI and Budget controllers
var  controller = (function(UICtrl, dataCtrl) {
    var domStr = UIController.getDomStr();
    var ctrlAddButton = function() {
        // TODO LIST
        // 1. Get the data from fieds
        var inputData = UIController.getInput();
        // 2. Add the data to dataController
        // 3. Display data in Incomes or Expenses
        // 4. Calculate the Budget
        // 5. Update the Budget
    };
    // Add button fuctionality
    var addButton = document.querySelector(domStr.inputBtn);
    addButton.addEventListener('click', ctrlAddButton);

    // When taping enter to retrieve data from field
    document.addEventListener('keypress', function(event) {
        if(event.charCode === 13 || event.which === 13 ) {
            ctrlAddButton();
        }
    });
})(UIController, dataController);