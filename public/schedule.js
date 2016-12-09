/*
 * This function displays the modal
 */
function displayAddClassModal() {

    var backdropElem = document.getElementById('modal-backdrop');
    var addClassModalElem = document.getElementById('add-note-modal');

    // Show the modal and its backdrop.
    backdropElem.classList.remove('hidden');
    addClassModalElem.classList.remove('hidden');

}

/*
 * This function closes the modal
 */
function closeAddClassModal() {

    var backdropElem = document.getElementById('modal-backdrop');
    var addClassModalElem = document.getElementById('add-note-modal');

    // Hide the modal and its backdrop.
    backdropElem.classList.add('hidden');
    addClassModalElem.classList.add('hidden');

    clearClassInputValues();

}

/*
 * This function clears the values of all input elements in the calss modal.
 */
function clearClassInputValues() {

    var inputElems = document.getElementsByClassName('todo-input-element');
    for (var i = 0; i < inputElems.length; i++) {
        var input = inputElems[i].querySelector('input, textarea');
        input.value = '';
    }

}

/*
 * Small function to get a user's identifier from the current URL.
 */
function getUserIDFromLocation() {
    var pathComponents = window.location.pathname.split('/');
    if (pathComponents[0] !== '' && pathComponents[1] !== 'schedule') {
        return null;
    }
    return pathComponents[2];
}

/*
 * This function uses Handlebars on the client side to generate HTML for a
 * person class and adds that person class HTML into the DOM.
 */
function insertNewClass() {

    var classid = document.getElementById('todo-input-what').value || '';
    var weekday = document.getElementById('todo-input-weekday').value || '';
    var time = document.getElementById('todo-input-time').value || '';
    var details = document.getElementById('todo-input-details').value || '';

    if (classid.trim()) {

        var userID = getUserIDFromLocation();

        if (userID) {
            store_user_class(userID, classid, weekday, time, details, function (err) {
                if (err) {

                    // If we couldn't save the user class, alert the user.
                    alert("Unable to save user's class.  Got this error:\n\n" + err);

                } else {

                    /*
                     * If we successfully saved the user class, generate HTML for the
                     * new class element and add it into the DOM.
                     */
                    var userClassTemplate = Handlebars.templates['simple-schedule'];
                    var userClassHTML = userClassTemplate({
                        classid: classid,
                        weekday: weekday,
                        time: time,
                        details: details
                    });
                    var mainElement = document.querySelector('main');
                    mainElement.insertAdjacentHTML('beforeend', userClassHTML);

                }
            });
        }

        closeAddClassModal();

    } else {

        alert('You must specify a value for the "classID" field.');

    }

}

// Wait until the DOM content is loaded to hook up UI interactions, etc.
window.addEventListener('DOMContentLoaded', function (event) {

    var addClassButton = document.getElementById('add-class-button');
    if (addClassButton) {
        addClassButton.addEventListener('click', displayAddClassModal);
    }

    var modalCloseButton = document.querySelector('#add-note-modal .modal-close-button');
    if (modalCloseButton) {
        modalCloseButton.addEventListener('click', closeAddClassModal);
    }

    var modalCancalButton = document.querySelector('#add-note-modal .modal-cancel-button');
    if (modalCancalButton) {
        modalCancalButton.addEventListener('click', closeAddClassModal);
    }

    var modalAcceptButton = document.querySelector('#add-note-modal .modal-accept-button');
    if (modalAcceptButton) {
        modalAcceptButton.addEventListener('click', insertNewClass);
    }

});