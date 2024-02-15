export function appendElemets(container, els) {
  els.forEach(el => {
    container.appendChild(el)
  })
}