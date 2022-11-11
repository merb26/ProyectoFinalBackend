export const newOrder = (products, subject) => {
  let message = ""
  let messageWhatsapp = ""
  let total = 0

  products.forEach(product => {
    const { subtotal } = product

    let isWhatsapp = false
    const productEmail = productSend(isWhatsapp, product)

    isWhatsapp = true
    const productWhatsapp = productSend(isWhatsapp, product)

    total += subtotal

    message += productEmail
    messageWhatsapp += productWhatsapp
  })

  message += `TOTAL: $${total}`
  messageWhatsapp += `\nTOTAL: $${total}`

  messageWhatsapp = subject + messageWhatsapp

  return {
    message,
    messageWhatsapp,
  }
}

const productSend = (isWhatsapp, product) => {
  const { name, description, code, price, amount, subtotal } = product

  let br = "<br>"

  let sendProduct = ""

  if (!isWhatsapp) {
    sendProduct = `
  
    Nombre: ${name} ${br}
    Descripción: ${description} ${br}
    Código: ${code} ${br}
    Precio: $${price} ${br}
    Cantidad: ${amount} ${br}
    Subtotal: $${subtotal} ${br} ${br}


    `
  } else {
    sendProduct += `\n\nNombre: ${name}\n`
    sendProduct += `Descripción: ${description}\n`
    sendProduct += `Código: ${code}\n`
    sendProduct += `Precio: $${price}\n`
    sendProduct += `Cantidad: ${amount}\n`
    sendProduct += `Subtotal: $${subtotal}\n`
  }

  return sendProduct
}
