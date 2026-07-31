import axios from "axios";
export class ZapiService {
    instanceId = process.env.ZAPI_INSTANCE_ID;
    token = process.env.ZAPI_TOKEN;
    async sendMessage(telefone, mensagem) {
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
