export default (text = 'Hello world') => {
    const element = document.createElement('div')
    element.innerHTML = '<p>' + text + '</p>'
    return element
}