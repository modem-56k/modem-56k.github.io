// Read the dates from the date.txt file
fetch('date.txt').then(response => response.text()).then(data => {
    const dates = data.split(',');
    const currentYear = new Date().getFullYear();

    document.getElementById('currentYear').textContent = currentYear;

    renderMonths(currentYear, dates);
});

function renderMonths(year, dates) {
    const monthsContainer = document.querySelector('.months');
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    monthsContainer.innerHTML = '';

    months.forEach((month, index) => {
        const monthNumber = (index + 1).toString().padStart(2, '0');
        const fullDate = `${year}${monthNumber}`;
        
        const monthElement = document.createElement('span');
        monthElement.textContent = month;

        if (!dates.includes(fullDate)) {
            monthElement.classList.add('disabled');
        } else {
            monthElement.addEventListener('click', () => {
                window.open(`https://56k.lishuhang.me/${year}/${monthNumber}`, '_blank');
            });
        }

        monthsContainer.appendChild(monthElement);
    });
}