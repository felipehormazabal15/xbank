import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import TransferForm from "./TransferForm";

describe("TransferForm", () => {
  it("renderiza los campos y el botón", () => {
    render(
      <TransferForm
        emailDestino=""
        setEmailDestino={vi.fn()}
        monto=""
        setMonto={vi.fn()}
        handleTransfer={vi.fn()}
        loadingTransfer={false}
      />
    );

    expect(
      screen.getByLabelText(/correo del destinatario/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/monto/i)
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /enviar dinero/i,
      })
    ).toBeInTheDocument();
  });

  it("llama a handleTransfer al hacer click", async () => {
    const user = userEvent.setup();
    const handleTransfer = vi.fn();

    render(
      <TransferForm
        emailDestino=""
        setEmailDestino={vi.fn()}
        monto=""
        setMonto={vi.fn()}
        handleTransfer={handleTransfer}
        loadingTransfer={false}
      />
    );

    await user.click(
      screen.getByRole("button", {
        name: /enviar dinero/i,
      })
    );

    expect(handleTransfer).toHaveBeenCalledTimes(1);
  });

  it("deshabilita el botón mientras envía", () => {
    render(
      <TransferForm
        emailDestino=""
        setEmailDestino={vi.fn()}
        monto=""
        setMonto={vi.fn()}
        handleTransfer={vi.fn()}
        loadingTransfer={true}
      />
    );

    expect(
      screen.getByRole("button")
    ).toBeDisabled();

    expect(
      screen.getByText(/enviando/i)
    ).toBeInTheDocument();
  });
});