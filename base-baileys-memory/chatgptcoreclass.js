require('dotenv').config()

class ChatGPTClass {
  queue = []; 
  optionsGPT = { model: "gpt-3.5-turbo" };
  openai = undefined;

  constructor() {
    this.init().then();
  }

  /**
   * Esta funciona inicializa
   */
  init = async () => {
    const { ChatGPTAPI } = await import("chatgpt");
    this.openai = new ChatGPTAPI(
        {
            apiKey: "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" 
        }
    );
  };

  /**
   * Manejador de los mensajes
   * sun funcion es enviar un mensaje a wahtsapp
   * @param {*} ctx 
   */
  handleMsgChatGPT = async (body) => {
    const interaccionChatGPT = await this.openai.sendMessage(body, {
      conversationId: !this.queue.length
        ? undefined
        : this.queue[this.queue.length - 1].conversationId,
      parentMessageId: !this.queue.length
        ? undefined
        : this.queue[this.queue.length - 1].id,
    });

    this.queue.push(interaccionChatGPT);
    return interaccionChatGPT
  };
}

module.exports = ChatGPTClass;