// UI Controller
var  UIController = (function() {

    // Some Code here

})();

// Budget Controller
var dataController = (function() {

    // Some Code here

})();

// Controller to link between UI and Budget controllers
var  controller = (function(UICtrl, dataCtrl) {
    // Add button fuctionality
    var addButton = document.querySelector('.add__btn');
    addButton.addEventListener('click', function() {
        // TODO LIST
        // 1. Get the data from fieds
        // 2. Add the data to dataController
        // 3. Display data in Incomes or Expenses
        // 4. Calculate the Budget
        // 5. Update the Budget
    });

    // When taping enter to retrieve data from field
    document.addEventListener('keypress', function(event) {
        if(event.charCode === 13 || event.which === 13 ) {
            console.log(event);
            // TODO LIST
            // Same as AddButton todo list
        }
    });
})(UIController, dataController);