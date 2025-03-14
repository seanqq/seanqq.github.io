function checkIn(employeeId) {
    fetch('process.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `action=checkin&employee_id=${employeeId}`
    })
    .then(response => response.text())
    .then(() => location.reload())
    .catch(error => console.error('Ошибка:', error));
}

function checkOut(employeeId) {
    fetch('process.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `action=checkout&employee_id=${employeeId}`
    })
    .then(response => response.text())
    .then(() => location.reload())
    .catch(error => console.error('Ошибка:', error));
}
