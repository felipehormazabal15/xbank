import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MovementList from "./MovementList";

const movimientos = [
  {
    id: "1",
    type: "Transferencia",
    toEmail: "juan@test.com",
    amount: 25000,
    date: new Date("2026-07-10T10:30:00"),
  },
  {
    id: "2",
    type: "Depósito",
    toEmail: "felipe@test.com",
    amount: 100000,
    date: new Date("2026-07-11T09:00:00"),
  },
];

describe("MovementList", () => {
  it("muestra un mensaje cuando no existen movimientos", () => {
    render(<MovementList movimientos={[]} />);

    expect(
      screen.getByText(/no existen movimientos/i)
    ).toBeInTheDocument();
  });

  it("renderiza los movimientos recibidos", () => {
    render(<MovementList movimientos={movimientos} />);

    expect(
      screen.getByText("juan@test.com")
    ).toBeInTheDocument();

    expect(
      screen.getByText("felipe@test.com")
    ).toBeInTheDocument();
  });

  it("muestra los tipos de movimiento", () => {
    render(<MovementList movimientos={movimientos} />);

    expect(
      screen.getByText("Transferencia")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Depósito")
    ).toBeInTheDocument();
  });
});