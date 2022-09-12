const d = document,
    $form = d.getElementById('form'),
    $qr = d.getElementById('qrcode'),
    $loader = d.getElementById('loader'),
    $generateBtn = d.getElementById('generateBtn'),
    $containerDynamicElements = d.getElementById('container-dynamic-elements')

const handleSubmit = e => {
    e.preventDefault()
    clearDOM()
    const url = d.getElementById('url').value,
        size = d.getElementById('img-size').value
    if (url === '' || size === null) return

    try {
        $generateBtn.disabled = true
        $loader.style.display = 'block'
        generateQR(url, size)
        setTimeout(() => {
            const saveUrl = $qr.querySelector('img').src
            createSaveBtn(saveUrl)
        }, 50);
    } catch (error) {
        console.error(error)
    } finally {
        $loader.style.display = 'none'
        $generateBtn.disabled = false
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
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H
    })
}

const createSaveBtn = saveUrl => {
    const downloadBtn = d.createElement('a')
    downloadBtn.id = 'download-btn'
    downloadBtn.classList = 'download-btn'
    downloadBtn.href = saveUrl
    downloadBtn.download = 'qrcode'
    downloadBtn.innerHTML = 'Save image'
    $containerDynamicElements.appendChild(downloadBtn)
}

$form.addEventListener('submit', handleSubmit)