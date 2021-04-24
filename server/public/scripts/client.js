$(document).ready(function () {
   console.log('jQuery sourced.');
    getTodo();
    addClickHandlers();
    // $('#todoButton').on('click', handleSubmit);
    $('#infoTodo').on('click', '.completed-task', updateTodoHandler);
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

// Adding in sumbit button
// function handleSubmit() {
//     console.log('Submit button has been pressed');
//     let newTodo = {};
//     newTodo.notes = $('#notesIn').val();
//     newTodo.completed = $('#completedIn').val();
//     saveTodo(newTodo);
// }

// PUT FUNCTION
function todoPut(todoId) {
    $.ajax({
        method: 'PUT',
        url: `/todos/${todoId}`,
        data: {
            status: 'On todo List'
        }
    })
    .then(function (response) {
        getTodo();
    })
    .catch(function (error) {
        alert('Error on adding new task', error);
    })
}

function updateTodoHandler() {
    todoPut($(this).data("id"))
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
        let newTodo = todoArray[i];
        if (newTodo.completed == 'No') {
            $('#infoTodo').append(`
                <tr>
                    <td>${newTodo.notes}</td>
                    <td>${newTodo.completed}</td>
                    <td><button class="completed-task" data-id="${newTodo.id}">Completed</button></td>
                    <td><button class="remove-task" data-id="${newTodo.id}">Remove Task</button></td>
                </tr>
            `);
        } else {
            $('#infoTodo').append(`
                <tr>
                    <td>${newTodo.notes}</td>
                    <td>${newTodo.completed}</td>
                    <td><button class="remove-task" data-id="${newTodo.id}">Remove Task</button></td>
                </tr>
            `);
        }
    }
}