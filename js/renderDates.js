const $currentYear = document.getElementById('current-year'),
    $currentDate = document.getElementById('current-date')

export const renderDates = () => {
    $currentYear.innerText = new Date().getFullYear()
    $currentDate.innerText = new Date().toDateString()
}