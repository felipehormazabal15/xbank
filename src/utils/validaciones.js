export function validarTransferencia({
  emailDestino,
  emailOrigen,
  monto,
  saldo,
}) {
  if (!emailDestino.trim()) {
    return "Debes ingresar el correo del destinatario.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(emailDestino)) {
    return "Correo electrónico inválido.";
  }

  if (monto === "" || monto === null) {
    return "Debes ingresar un monto.";
  }

  const montoNumero = Number(monto);

  if (isNaN(montoNumero)) {
    return "Monto inválido.";
  }

  if (!Number.isInteger(montoNumero)) {
    return "El monto no puede tener decimales.";
  }

  if (montoNumero <= 0) {
    return "El monto debe ser mayor que cero.";
  }

  if (emailDestino === emailOrigen) {
    return "No puedes transferirte dinero a ti mismo.";
  }

  if (montoNumero > saldo) {
    return "Saldo insuficiente.";
  }

  return null;
}