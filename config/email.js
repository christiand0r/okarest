const { EventEmitter } = require("events");
const { Notification } = require("../models");

class Email extends EventEmitter {
  constructor(options) {
    super();
    this.options = options;
  }

  fakeEmail() {
    const { to, subject, body } = this.options;

    const template = `
      Para: ${to} \n
      Asunto: ${subject} \n
      ${body}
    `;

    setTimeout(() => {
      this.emit("send", template);
    }, 5000);
  }

  async saveEmail() {
    const notification = new Notification(this.options);
    await notification.save();
  }
}
