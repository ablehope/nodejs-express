document.querySelectorAll('.price').forEach((node) => {
  node.textContent = new Intl.NumberFormat('ru-RU', {
    currency: 'usd',
    style: 'currency'
  }).format(node.textContent)
})