export const { format: formatPrice } = new Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL',
})

export const { format: dateFormatter } = new Intl.DateTimeFormat('pt-br')
