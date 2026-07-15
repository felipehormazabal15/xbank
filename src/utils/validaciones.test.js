import { describe, it, expect } from "vitest";
import { validarTransferencia } from "./validaciones";

describe("validarTransferencia", () => {
  it("rechaza destinatario vacío", () => {
    const resultado = validarTransferencia({
      emailDestino: "",
      emailOrigen: "origen@test.com",
      monto: 1000,
      saldo: 5000,
    });

    expect(resultado).toBe("Debes ingresar el correo del destinatario.");
  });

  it("rechaza correo con formato inválido", () => {
    const resultado = validarTransferencia({
      emailDestino: "correo-invalido",
      emailOrigen: "origen@test.com",
      monto: 1000,
      saldo: 5000,
    });

    expect(resultado).toBe("Correo electrónico inválido.");
  });

  it("rechaza monto vacío", () => {
    const resultado = validarTransferencia({
      emailDestino: "destino@test.com",
      emailOrigen: "origen@test.com",
      monto: "",
      saldo: 5000,
    });

    expect(resultado).toBe("Debes ingresar un monto.");
  });

  it("rechaza monto no numérico", () => {
    const resultado = validarTransferencia({
      emailDestino: "destino@test.com",
      emailOrigen: "origen@test.com",
      monto: "abc",
      saldo: 5000,
    });

    expect(resultado).toBe("Monto inválido.");
  });

  it("rechaza monto decimal", () => {
    const resultado = validarTransferencia({
      emailDestino: "destino@test.com",
      emailOrigen: "origen@test.com",
      monto: 100.5,
      saldo: 5000,
    });

    expect(resultado).toBe("El monto no puede tener decimales.");
  });

  it("rechaza monto negativo", () => {
    const resultado = validarTransferencia({
      emailDestino: "destino@test.com",
      emailOrigen: "origen@test.com",
      monto: -100,
      saldo: 5000,
    });

    expect(resultado).toBe("El monto debe ser mayor que cero.");
  });

  it("rechaza monto igual a cero", () => {
    const resultado = validarTransferencia({
      emailDestino: "destino@test.com",
      emailOrigen: "origen@test.com",
      monto: 0,
      saldo: 5000,
    });

    expect(resultado).toBe("El monto debe ser mayor que cero.");
  });

  it("rechaza transferirse dinero a sí mismo", () => {
    const resultado = validarTransferencia({
      emailDestino: "felipe@test.com",
      emailOrigen: "felipe@test.com",
      monto: 1000,
      saldo: 5000,
    });

    expect(resultado).toBe("No puedes transferirte dinero a ti mismo.");
  });

  it("rechaza cuando el saldo es insuficiente", () => {
    const resultado = validarTransferencia({
      emailDestino: "destino@test.com",
      emailOrigen: "origen@test.com",
      monto: 10000,
      saldo: 5000,
    });

    expect(resultado).toBe("Saldo insuficiente.");
  });

  it("acepta una transferencia válida", () => {
    const resultado = validarTransferencia({
      emailDestino: "destino@test.com",
      emailOrigen: "origen@test.com",
      monto: 1000,
      saldo: 5000,
    });

    expect(resultado).toBeNull();
  });
});