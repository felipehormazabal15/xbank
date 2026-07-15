import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import LoginForm from "./LoginForm";

describe("LoginForm", () => {
  it("renderiza los campos y botones", () => {
    render(
      <LoginForm
        email=""
        setEmail={vi.fn()}
        password=""
        setPassword={vi.fn()}
        handleLogin={vi.fn()}
        handleRegister={vi.fn()}
      />
    );

    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /iniciar sesión/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /registrarse/i })
    ).toBeInTheDocument();
  });

  it("llama a handleLogin", async () => {
    const user = userEvent.setup();
    const handleLogin = vi.fn();

    render(
      <LoginForm
        email=""
        setEmail={vi.fn()}
        password=""
        setPassword={vi.fn()}
        handleLogin={handleLogin}
        handleRegister={vi.fn()}
      />
    );

    await user.click(
      screen.getByRole("button", { name: /iniciar sesión/i })
    );

    expect(handleLogin).toHaveBeenCalledTimes(1);
  });

  it("llama a handleRegister", async () => {
    const user = userEvent.setup();
    const handleRegister = vi.fn();

    render(
      <LoginForm
        email=""
        setEmail={vi.fn()}
        password=""
        setPassword={vi.fn()}
        handleLogin={vi.fn()}
        handleRegister={handleRegister}
      />
    );

    await user.click(
      screen.getByRole("button", { name: /registrarse/i })
    );

    expect(handleRegister).toHaveBeenCalledTimes(1);
  });
});