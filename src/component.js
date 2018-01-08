import style from './assets/styles.css'

export default (text = 'Hello world') => {
    const element = document.createElement('div')
    element.innerHTML = '<p>' + text +'</p>'
    element.className = style.greenClass
    return element
}