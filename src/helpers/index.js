export const helpers = {
  buzzing: (element) => {
    const baseElement = document.querySelector(element)
    if (baseElement)
      baseElement.classList.add('zumbido')
      setTimeout(() => {
        if (baseElement)
          baseElement.classList.remove('zumbido')
      }, 250)
  }
}
