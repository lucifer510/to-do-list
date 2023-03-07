const form = document.querySelector('form');
        const input = document.querySelector('input');
        const ul = document.querySelector('ul');
        const button = document.querySelector('button');
        const listItems = document.querySelectorAll('li');
        const listArray = Array.from(listItems);
        const list = document.querySelector('ul');
        const listItemsArray = Array.from(list.children);
        const searchInput = document.querySelector('#search-todo');
        const todos = JSON.parse(localStorage.getItem('todos')) || [];


        function addTodos(e) {
            e.preventDefault();
            const text = (this.querySelector('[name=item]')).value;
            const todo = {
                text,
                done: false
            };
            todos.push(todo);
            populateList(todos, list);
            localStorage.setItem('todos', JSON.stringify(todos));
            this.reset();
        }

        function populateList(todos = [], list) {
            list.innerHTML = todos.map((todo, i) => {
                return `
                    <li>
                        <input type="checkbox" data-index=${i} id="item${i}" ${todo.done ? 'checked' : ''} />
                        <label for="item${i}">${todo.text}</label>
                    </li>
                `;
            }).join('');
        }

        function toggleDone(e) {
            if (!e.target.matches('input')) return;
            const el = e.target;
            const index = el.dataset.index;
            todos[index].done = !todos[index].done;
            localStorage.setItem('todos', JSON.stringify(todos));
            populateList(todos, list);
        }

        function deleteTodos(e) {
            const index = e.target.dataset.index;
            todos.splice(index, 1);
            localStorage.setItem('todos', JSON.stringify(todos));
            populateList(todos, list);
        }

        function searchTodos(e) {
            const text = e.target.value.toLowerCase();
            const filteredTodos = todos.filter(todo => {
                return todo.text.toLowerCase().includes(text);
            });
            populateList(filteredTodos, list);
        }
        
        form.addEventListener('submit', addTodos);
        list.addEventListener('click', toggleDone);
        list.addEventListener('click', deleteTodos);
        searchInput.addEventListener('keyup', searchTodos);
        populateList(todos, list);

