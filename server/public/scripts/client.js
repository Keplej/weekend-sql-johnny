$(document).ready(function () {
   console.log('jQuery sourced.');
    getTodo();
});

function addClickHandlers() {
    $('#todoButton').on('click', function() {
        console.log('in todoButton');
        let todoToSend = {
            notes: $('#todoList'),
            completed: $('#todoAnswer')
        };
        clearTodo(todoToSend);

        $('#todoList').val('');
        $('#todoAnswer').val('');
    });
    
};

// GET function
function getTodo() {
    console.log('GET function on client.js');
    $('#infoTodo').empty();

    $.ajax({
        type: 'GET',
        url: '/todo'
    }).then(function (response) {
        console.log(response);
        for (let i = 0; i < response.length; i++) {
            let todo = response[i];
            if (todo.completed == 'No') {
                $('#infoTodo').append(`
                    <tr>
                        <td>${todo.notes}<td>
                        <td>${todo.completed}<td>
                        <td><button class="completed-task" data-id="${todo.id}">Complted</button><td>
                        <td><button class="remove-task" data-id="${todo.id}">Remove Task</button><td>
                    </tr>
                `);
            } else {
                $('#infoTodo').append(`
                    <tr>
                        <td>${todo.notes}<td>
                        <td>${todo.completed}<td>
                        <td><button class="remove-task" data-id="${todo.id}">Remove Task</button><td>
                    </tr>
                `);
            }
        }
    }).catch(function(error) {
        console.log('error in GET', error);
    });
}

