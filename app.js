const d = document,
    $form = d.getElementById('form'),
    $qr = d.getElementById('qrcode'),
    $loader = d.getElementById('loader'),
    $generateBtn = d.getElementById('generateBtn'),
    $containerDynamicElements = d.getElementById('container-dynamic-elements'),
    $currentYear = d.getElementById('current-year'),
    $currentDate = d.getElementById('current-date')

const handleSubmit = e => {
    e.preventDefault()
    clearDOM()
    const url = d.getElementById('url').value,
        size = d.getElementById('img-size').value
    if (url === '' || size === null) return

    try {
        $loader.style.display = 'flex'
        $generateBtn.disabled = true
        $generateBtn.innerText = 'Wait, please...'
        setTimeout(() => {
            generateQR(url, size)
            $loader.style.display = 'none'
            $generateBtn.disabled = false
            $generateBtn.innerHTML = 'Generate QR <i class="fa-sharp fa-solid fa-qrcode"></i>'
            setTimeout(() => {
                const saveUrl = $qr.querySelector('img').src
                createSaveBtn(saveUrl)
            }, 50)
        }, 1000)
    } catch (error) {
        console.error(error)
    }
}

const clearDOM = () => {
    $qr.innerHTML = ''
    const $downloadBtn = d.getElementById('download-btn')
    if ($downloadBtn) $downloadBtn.remove()
}

const generateQR = (url, size) => {
    new QRCode(document.getElementById('qrcode'), {
        text: url,
        width: size,
        height: size,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    })
}

const createSaveBtn = saveUrl => {
    const downloadBtn = d.createElement('a')
    const downloadIcon = d.createElement('i')
    downloadIcon.classList = 'fa-solid fa-download'
    downloadBtn.id = 'download-btn'
    downloadBtn.classList = 'btn btn-success'
    downloadBtn.href = saveUrl
    downloadBtn.download = 'qrcode'
    downloadBtn.innerHTML = 'Save image'
    downloadBtn.appendChild(downloadIcon)
    $containerDynamicElements.appendChild(downloadBtn)
}

$currentYear.innerText = new Date().getFullYear()
$currentDate.innerText = new Date().toDateString()

$form.addEventListener('submit', handleSubmit)