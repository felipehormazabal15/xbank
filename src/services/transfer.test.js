import { describe, it, expect, vi } from "vitest";

const transferMock = vi.fn();

describe("Transferencias", () => {
  it("transfiere correctamente", async () => {
    transferMock.mockResolvedValue(true);

    const resultado = await transferMock(
      "uid1",
      "destino@test.com",
      10000
    );

    expect(transferMock).toHaveBeenCalledWith(
      "uid1",
      "destino@test.com",
      10000
    );

    expect(resultado).toBe(true);
  });

  it("rechaza saldo insuficiente", async () => {
    transferMock.mockRejectedValue(
      new Error("Saldo insuficiente.")
    );

    await expect(
      transferMock(
        "uid1",
        "destino@test.com",
        1000000
      )
    ).rejects.toThrow("Saldo insuficiente.");
  });
});