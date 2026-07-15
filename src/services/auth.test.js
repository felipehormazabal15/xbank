import { describe, it, expect, vi } from "vitest";

const loginMock = vi.fn();
const registerMock = vi.fn();

describe("Mocks del servicio auth", () => {
  it("simula login exitoso", async () => {
    loginMock.mockResolvedValue({
      uid: "123",
      email: "felipe@test.com",
    });

    const usuario = await loginMock(
      "felipe@test.com",
      "123456"
    );

    expect(loginMock).toHaveBeenCalledWith(
      "felipe@test.com",
      "123456"
    );

    expect(usuario.email).toBe("felipe@test.com");
  });

  it("simula error de login", async () => {
    loginMock.mockRejectedValue(
      new Error("Credenciales inválidas")
    );

    await expect(
      loginMock("felipe@test.com", "123")
    ).rejects.toThrow("Credenciales inválidas");
  });

  it("simula registro", async () => {
    registerMock.mockResolvedValue({
      uid: "999",
    });

    await registerMock(
      "nuevo@test.com",
      "123456"
    );

    expect(registerMock).toHaveBeenCalledWith(
      "nuevo@test.com",
      "123456"
    );
  });
});