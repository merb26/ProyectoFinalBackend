class MessageDTO {
  constructor({email, dateAndHour, bodyMessage}) {
    this.email = email;
    this.dateAndHour = dateAndHour;
    this.bodyMessage = bodyMessage;
  }
}

export const asDTO = (messages) => {
  if (Array.isArray(messages))
    return messages.map((message) => new MessageDTO(message));
  else return new MessageDTO(messages);
};
