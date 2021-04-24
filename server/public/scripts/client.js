$(document).ready(function () {
   console.log('jQuery sourced.');
    getTodo();
    addClickHandlers();
    $('#infoTodo').on('click', '.completed-task', todoPut);
    $('#infoTodo').on('click', '.remove-task', todoDelete);
});

function addClickHandlers() {
    $('#todoButton').on('click', function() {
        console.log('button has been clicked');
        
        let newTodo = {
            notes: $('#notesIn').val(),
            completed: $('#completedIn').val()
        };
        saveTodo(newTodo);
        $('#notesIn').val('');
        $('#completedIn').val('');
    });
}


// PUT FUNCTION
function todoPut() {
    const id = $(this).data('id')
    $.ajax({
        method: 'PUT',
        url: `/todos/${id}`,
        
    })
    .then(function (response) {
        getTodo();
    })
    .catch(function (error) {
        alert('Error on adding new task', error);
    })
}

// DELETE function
function todoDelete() {
    const id = $(this).data('id')

    $.ajax({
        method: 'DELETE',
        url: `/todo/${id}`
    })
    .then(function (response) {
        getTodo();
    })
    .catch(function (error) {
        alert('Error deleting data!', error);
    })
}


// GET function
function getTodo() {
    $.ajax({
        type: 'GET',
        url: '/todos'
    }).then(function (response) {
        console.log(response);
        todoRender(response);
    }).catch(function(error) {
        console.log('error in GET', error);
    });
}

// POST FUNCTION
function saveTodo(newTodoPost) {
    console.log('in save todo', newTodoPost);
    $.ajax({
        type: 'POST',
        url: '/todos',
        data: newTodoPost
    })
    .then(function (response) {
        console.log(`Response from server`, response);
        getTodo();
    })
    .catch(function (error) {
        console.log(`Error in POST`, error);
        alert('Unable to add new Task');
    });
}


function todoRender(todoArray) {
    $('#infoTodo').empty();
    for (let i = 0; i < todoArray.length; i++) {
        let completed;
        if (todoArray[i].completed) {
            completed = 'No';
        } else {
            completed = 'Yes';
        }
            $('#infoTodo').append(`
                <tr>
                    <td>${todoArray[i].notes}</td>
                    <td>${todoArray[i].completed}</td>
                    <td><button class="completed-task" data-id="${todoArray[i].id}">Completed</button></td>
                    <td><button class="remove-task" data-id="${todoArray[i].id}">Remove Task</button></td>
                </tr>
        `);
    }
}
