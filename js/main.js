const listCode = [
    {letter: 'e', code: 'enter'},
    {letter: 'i', code: 'imes'},
    {letter: 'a', code: 'ai'},
    {letter: 'o', code: 'ober'},
    {letter: 'u', code: 'ufat'},
]  

function encryptString(str) {
    for (let i = 0; i < listCode.length; i++) {
        const item = listCode[i];
        let regex = new RegExp(`${item.letter}`, 'g')
        str = str.replace(regex, item.code)
    }
    return str
}
function decryptString(str) {
    for (let i = 0; i < listCode.length; i++) {
        const item = listCode[i];
        let regex = new RegExp(`${item.code}`, 'g')
        str = str.replace(regex, item.letter)
    }
    return str
}

function validateEmptyStringAndUppercase(text) {
    if (text.trim().length == 0) {
        notification({
            icon: 'error',
            title: '¡Hubo un problema!',
            text: 'El campo de texto está vacío.'
        })
        return false
    } else if (!(/^[^A-ZÁÉÍÓÚÜáéíóúü]+$/.test(text))) {
        notification({
            icon: 'error',
            title: '¡Hubo un problema!',
            text: 'Verifica que el texto no contenga mayúsculas ni acentos'
        })
        return false
    }
    return true
}

function notification({icon, title, text}) {
    Swal.fire({
        icon,
        title,
        text,
        confirmButtonText: 'Entendido',
        background: '#F3F5FC',
        iconColor: '#052051',
        confirmButtonColor: '#052051',
        timer: 3000,
        timerProgressBar: true,
      })
}

const textUser = document.getElementById('textUser')
const textResult = document.getElementById('textResult')
const btnEncrypt = document.getElementById('btnEncrypt')
const btnDecrypt = document.getElementById('btnDecrypt')
const btnCopy = document.getElementById('btnCopy')
const boxNoneText = document.getElementById('boxNoneText')
const boxShowText = document.getElementById('boxShowText')

// Codigo para recibir el mensaje del usuario y posteriormente encriptarlo
btnEncrypt.addEventListener('click', () => {
    if (validateEmptyStringAndUppercase(textUser.value)) {
        let strTemp = encryptString(textUser.value)
        textResult.value = strTemp
        boxNoneText.style.display = 'none'
        boxShowText.style.display = 'flex'
    }
})
// Codigo para recibir el mensaje del usuario y posteriormente desencriptarlo
btnDecrypt.addEventListener('click', () => {
    if (validateEmptyStringAndUppercase(textUser.value)) {
        let strTemp = decryptString(textUser.value)
        textResult.value = strTemp
        boxNoneText.style.display = 'none'
        boxShowText.style.display = 'flex'   
    }
})
// Codigo para copiar el mensaje encriptado
btnCopy.addEventListener('click', () => {
    textResult.select();
    document.execCommand('copy');
    textResult.value = ''
    textUser.select()
    boxNoneText.style.display = 'block'
    boxShowText.style.display = 'none' 
    notification({
        icon: 'info',
        title: '¡Exelente!',
        text: 'El texto ha sido copiado exitosamente al portapapeles'
    })
})