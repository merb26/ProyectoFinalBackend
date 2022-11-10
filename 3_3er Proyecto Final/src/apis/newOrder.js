export const newOrder = (products, subject) => {
  let message = ""
  let messageWhatsapp = ""
  let total = 0

  products.forEach(product => {
    const { subtotal } = product

    let isWhatsapp = false
    const productEmail = product(isWhatsapp, product)

    isWhatsapp = true
    const productWhatsapp = product(isWhatsapp, product)

    total += subtotal

    message += productEmail
    messageWhatsapp += productWhatsapp
  })

  message += `TOTAL: $${total}`
  messageWhatsapp += `TOTAL: $${total}`

  messageWhatsapp = subject + messageWhatsapp

  return {
    message,
    messageWhatsapp,
  }
}

const product = (isWhatsapp, product) => {
  const { name, description, code, price, amount, subtotal } = product

  let br = "<br>"
  isWhatsapp && (br = "")

  const sendProduct = `
  
  
    Nombre: ${name} ${br}
    Descripción: ${description} ${br}
    Código: ${code} ${br}
    Precio: $${price} ${br}
    Cantidad: ${amount} ${br}
    Subtotal: $${subtotal} ${br} ${br}


    `

  return sendProduct
}
