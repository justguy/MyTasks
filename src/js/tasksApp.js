'use strict';

import {createStore} from "./store";
import {tasksReducer} from "./reducers/tasks.reducer";
import {actionSplitterMiddleware} from "./middleware/core/actionSplitter";
import {loggerMiddleware} from "./middleware/core/logger";
import {apiMiddleware} from "./middleware/core/api";
import {tasksMiddleware} from "./middleware/feature/tasks";
import {fetchTasks, updateTask, removeTask} from "./actions/tasks";
import * as taskSelectors from './selectors/tasks';

// the order is important!
const middlewares = [
    actionSplitterMiddleware, // first: split multiple actions
    tasksMiddleware, // second: handle feature actions
    apiMiddleware, // third: handle API
    loggerMiddleware // log everything
];

const reducers = [
    tasksReducer
];

const render = () => {
    const store = createStore(reducers, middlewares, [], taskSelectors);

    $(document).ready(function () {
        let todoForm = $('#appRx > form');
        todoForm.submit(function (e) {
            e.preventDefault();
            store.dispath(updateTask({
                title: todoForm.find('input').val(),
                completed: false
            }));
            todoForm.get(0).reset();

            return false;
        });

        $('.btn-undo').click(() => {
            store.undo();
        });

        let todoCounter = $('.todo-counter');

        let todoList = $('<ul>');
        todoList.appendTo($('#appRx'));

        store.subscribe(() => {
            todoList.empty();
            let tasks = store.select.tasks();
            $.each(tasks, function (id, todo) {
                todoList.append(todoTemplate(todo))
            })
        });

        store.subscribe(() => {
            let total = store.select.taskCount();
            let completed = store.select.taskCount(true);
            todoCounter.text(`${completed}/${total}`);
        });

        todoList.on('click', 'span.toggle', function (e) {
            let id = parseInt($(e.target).parents('li').attr('rel'), 10);
            let task = store.select.task(id);
            store.dispatch(updateTask({
                id,
                completed: !task.completed
            }));
        });

        todoList.on('click', 'a.remove', function (e) {
            e.preventDefault();
            let id = parseInt($(e.target).parents('li').attr('rel'), 10);
            store.dispatch(removeTask({
                id
            }));
        });

        store.dispatch(fetchTasks()); // seed data
    });

    function todoTemplate(todo) {
        let template = [
            "<li rel='{{id}}'>",
            "<span class='toggle'>{{check}}</span>",
            "{{title}}",
            "<small><a href='javascript:void(0);' class='remove'>(remove)</a></small>",
            "</li>"
        ].join('');
        let data = $.extend({}, todo)
        data.check = data.completed ? '&check;' : '&ndash;';
        let html = template.replace(
            /\{\{([^{}]+)\}\}/g,
            function (_, match) {
                return data[match]
            }
        );
        //console.log("GENERATED HTML", html)
        return html
    }
};

export const TasksApp = {
    render
};
