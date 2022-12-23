let orderMongo = {products: [], state: 'generado'};

export const newOrder = (products, subject) => {
  orderMongo.products = [];
  let message = '';
  let messageWhatsapp = '';
  let total = 0;

  products.forEach((product) => {
    const subtotal = product.amount * product.price;
    product = {...product, subtotal};

    let isWhatsapp = false;
    const productEmail = productSend(isWhatsapp, product);

    isWhatsapp = true;
    const productWhatsapp = productSend(isWhatsapp, product);

    total += subtotal;

    message += productEmail;
    messageWhatsapp += productWhatsapp;
  });

  message += `TOTAL: $${total}`;
  messageWhatsapp += `\nTOTAL: $${total}`;

  const orderMongo2 = {...orderMongo, total};

  messageWhatsapp = subject + messageWhatsapp;

  return {
    message,
    messageWhatsapp,
    orderMongo2,
  };
};

const productSend = (isWhatsapp, product) => {
  const {name, description, code, price, amount, subtotal} = product;

  let br = '<br>';

  let sendProduct = '';

  if (!isWhatsapp) {
    sendProduct = `
  
    Nombre: ${name} ${br}
    Descripción: ${description} ${br}
    Código: ${code} ${br}
    Precio: $${price} ${br}
    Cantidad: ${amount} ${br}
    Subtotal: $${subtotal} ${br} ${br}


    `;

    const productMongo = {
      name,
      description,
      price,
      amount,
      subtotal,
    };

    orderMongo.products.push(productMongo);
  } else {
    sendProduct += `\n\nNombre: ${name}\n`;
    sendProduct += `Descripción: ${description}\n`;
    sendProduct += `Código: ${code}\n`;
    sendProduct += `Precio: $${price}\n`;
    sendProduct += `Cantidad: ${amount}\n`;
    sendProduct += `Subtotal: $${subtotal}\n`;
  }

  return sendProduct;
};
