
function login(event) {
    event.preventDefault();
    const username = document.getElementById('.email-input').value;
    localStorage.setItem('username', username);
    window.location.href = '../index.html'; 
};

