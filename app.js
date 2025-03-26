let token = null;

document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    const registerMessage = document.getElementById('registerMessage');
    registerMessage.textContent = result.message || 'Registration failed';
    registerMessage.className = response.ok ? 'success' : 'error';
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    });

    const result = await response.json();
    const loginMessage = document.getElementById('loginMessage');
    if (response.ok) {
        token = result.token;
        localStorage.setItem('token', token);
        loginMessage.textContent = 'Login successful!';
        loginMessage.className = 'success'; // Добавляем класс 'success'
    } else {
        loginMessage.textContent = result.message || 'Login failed';
        loginMessage.className = 'error'; // Добавляем класс 'error'
    }
});

document.getElementById('fetchProtectedData').addEventListener('click', async () => {
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
        const protectedData = document.getElementById('protectedData');
        protectedData.textContent = 'Please login first';
        protectedData.className = 'error';
        return;
    }

    const response = await fetch('http://localhost:3000/protected', {
        headers: { 'Authorization': `Bearer ${storedToken}` }
    });

    const result = await response.json();
    const protectedData = document.getElementById('protectedData');
    if (response.ok) {
        protectedData.textContent = JSON.stringify(result);
        protectedData.className = 'success';
    } else {
        protectedData.textContent = 'Access denied';
        protectedData.className = 'error';
    }
});