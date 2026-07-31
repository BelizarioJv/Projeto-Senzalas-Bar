import axios from "axios";

export class ZapiService {
  private instanceId = process.env.ZAPI_INSTANCE_ID;
  private token = process.env.ZAPI_TOKEN;

  async sendMessage(telefone: string, mensagem: string): Promise<void> {
    if (!this.instanceId || !this.token) {
      throw new Error("Variáveis de ambiente do Z-API não configuradas.");
    }

    const url = `https://api.z-api.io/instances/${this.instanceId}/token/${this.token}/send-text`;

    await axios.post(url, {
      phone: telefone,
      message: mensagem,
    });
  }
}
