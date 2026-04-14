function digitsOnly(value: string): string {
  return value.replace(/\D/g, "");
}

const DEFAULT_PHONE = "7013386529";
const DEFAULT_WHATSAPP_E164 = "917013386529";

const phoneNumber = digitsOnly(import.meta.env.VITE_PHONE_NUMBER ?? DEFAULT_PHONE) || DEFAULT_PHONE;
const whatsAppNumberE164 =
  digitsOnly(import.meta.env.VITE_WHATSAPP_NUMBER_E164 ?? DEFAULT_WHATSAPP_E164) ||
  DEFAULT_WHATSAPP_E164;

export const contact = {
  phoneNumber,
  phoneDisplay: phoneNumber,
  phoneTelHref: `tel:${phoneNumber}`,
  whatsAppNumberE164,
};
