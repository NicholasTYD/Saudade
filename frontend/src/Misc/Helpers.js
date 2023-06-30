import axios from "axios";

export function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export function getCsrfToken() {
    return getCookie('csrftoken');
}

export function getAuthToken() {
    return localStorage.getItem('token');
}

export function userIsLoggedIn() {
    return localStorage.getItem('user') !== null;
}

export function getUsername() {
    return localStorage.getItem('user');
}

export function jsDateToDjangoDate(date) {
    return date.toISOString().split('T')[0];
}

export function getMaxEntriesPerPage() {
    return localStorage.getItem('maxEntriesPerPage');
}

export function setMaxEntriesPerPage(amt) {
    localStorage.setItem('maxEntriesPerPage', amt);
    axios.post('/api/update-user-settings/', {
        token: getAuthToken(),
        maxEntriesPerPage: amt,
    }, {
        headers: {
            'X-CSRFToken': getCsrfToken(),
            'Content-Type': 'application/json'
        }
    }).then(response => console.log(response))
}

// Converts input date from django's YYYY-MM-DD to DD-MM-YYYY
export function convertYMDToDMY(date) {
    const parts = date.split('-');
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
}