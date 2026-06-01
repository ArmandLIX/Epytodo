const API = 'http://localhost:3001';

  let token = localStorage.getItem('token') || null;

  if (token) { 
    showPage('todos-page');
    loadTodos();
    document.getElementById('logout-btn').style.display = 'block';
  }
  
  function showPage(id) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }

  async function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    const res = await fetch(`${API}/login`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({email, password}) });
    const data = await res.json();
    if (!res.ok) {
        document.getElementById('login-error').textContent = data.msg;
        return;
    }
    token = data.token;
    localStorage.setItem('token', token);
    document.getElementById('logout-btn').style.display = 'block';
    showPage('todos-page');
    loadTodos();
  }

  async function register() {
    const firstname = document.getElementById('reg-firstname').value;
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const res = await fetch(`${API}/register`, { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({firstname, name, email, password}) });
    const data = await res.json();
    if (!res.ok) {
        document.getElementById('register-error').textContent = data.msg;
        return;
    }
    token = data.token;
    localStorage.setItem('token', token);
    document.getElementById('logout-btn').style.display = 'block';
    showPage('todos-page');
    loadTodos();
  }

  async function loadTodos() {
    const res = await fetch(`${API}/todos`, { 
        headers: {'Authorization': `Bearer ${token}`}
    });
    if (res.status === 401) {
        logout(); return;
    }
    const todos = await res.json();
    renderTodos(todos);
  }

  function renderTodos(todos) {
    const list = document.getElementById('todo-list');
    const empty = document.getElementById('empty-msg');
    list.innerHTML = '';
    if (!todos.length) {
        empty.style.display = 'block';
        return;
    }
    empty.style.display = 'none';
    todos.forEach(t => {
      const badgeClass = t.status.replace(' ', '-');
      list.innerHTML += `
        <div class="todo-item">
          <div class="todo-info">
            <strong>${t.title}</strong>
            <p>${t.description}</p>
          </div>
          <span class="badge ${badgeClass}">${t.status}</span>
          <div class="todo-actions">
            <button class="del-btn" onclick="deleteTodo(${t.id})">Delete</button>
          </div>
        </div>`;
    });
  }

  async function addTodo() {
    const title = document.getElementById('new-title').value;
    const description = document.getElementById('new-desc').value;
    const due_time = document.getElementById('new-due').value.replace('T', ' ') + ':00';
    const status = document.getElementById('new-status').value;
    if (!title || !description || !due_time)
        return alert('Fill all fields');
    await fetch(`${API}/todos`, {
        method: 'POST', 
        headers: {'Content-Type':'application/json','Authorization':`Bearer ${token}`}, 
        body: JSON.stringify({title, description, due_time, status}) 
    });
    document.getElementById('new-title').value = '';
    document.getElementById('new-desc').value = '';
    loadTodos();
  }

  async function deleteTodo(id) {
    await fetch(`${API}/todos/${id}`,{
        method: 'DELETE', 
        headers: {'Authorization':`Bearer ${token}`} 
    });
    loadTodos();
  }

  function logout() {
    token = null;
    localStorage.removeItem('token');
    document.getElementById('logout-btn').style.display = 'none';
    showPage('login-page');
  }