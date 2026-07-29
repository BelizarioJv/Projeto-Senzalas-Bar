import { Request, Response } from "express";
import { MercadoPagoConfig, Payment } from "mercadopago";
import { randomUUID } from "crypto";
import "dotenv/config";

// Ensure access token exists
const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;

if (!accessToken) {
  console.log(
    "⚠️ Warning: MERCADO_PAGO_ACCESS_TOKEN is missing in environment variables.",
  );
}

const client = new MercadoPagoConfig({
  accessToken: accessToken || "",
});

const payment = new Payment(client);

export const createPixPayment = async (
  req: Request,
  res: Response,
): Promise<Response> => {
  try {
    const { transaction_amount, description, payer } = req.body;

    // Basic payload validation
    if (
      !transaction_amount ||
      !payer?.email ||
      !payer?.identification?.number
    ) {
      return res.status(400).json({
        success: false,
        message: "Dados do pagamento ou pagador inválidos/incompletos.",
      });
    }

    const requestOptions = {
      idempotencyKey: randomUUID(),
    };

    const body = {
      transaction_amount: Number(transaction_amount),
      description: description || "Pagamento via Pix",
      payment_method_id: "pix",
      payer: {
        email: payer.email,
        first_name: payer.first_name,
        last_name: payer.last_name,
        identification: {
          type: payer.identification.type || "CPF",
          number: payer.identification.number,
        },
      },
    };

    const result = await payment.create({ body, requestOptions });

    const transactionData = result.point_of_interaction?.transaction_data;

    return res.status(201).json({
      success: true,
      payment_id: result.id,
      status: result.status,
      detail: result.status_detail,
      qr_code: transactionData?.qr_code,
      qr_code_base64: transactionData?.qr_code_base64,
      ticket_url: transactionData?.ticket_url,
    });
  } catch (error: any) {
    console.error("Erro na API do Mercado Pago:", error?.cause || error);

    return res.status(error.status || 500).json({
      success: false,
      message: "Falha ao gerar o Pix.",
      error: error.message || "Erro interno do servidor.",
      details: error.cause || null,
    });
  }
};
