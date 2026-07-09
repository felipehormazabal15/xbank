import {
  FaWallet,
  FaExchangeAlt,
  FaMoneyBillWave,
} from "react-icons/fa";

import { formatMoney } from "../utils/formatMoney";

function StatsCards({ saldo, movimientos }) {

  const totalTransferencias = movimientos.length;

  const totalEnviado = movimientos.reduce(
    (total, mov) => total + Number(mov.amount),
    0
  );

  return (
    <div className="stats-grid">

      <div className="stat-card">

        <FaWallet size={30} />

        <h3>Saldo</h3>

        <h2>{formatMoney(saldo)}</h2>

      </div>

      <div className="stat-card">

        <FaExchangeAlt size={30} />

        <h3>Transferencias</h3>

        <h2>{totalTransferencias}</h2>

      </div>

      <div className="stat-card">

        <FaMoneyBillWave size={30} />

        <h3>Total enviado</h3>

        <h2>{formatMoney(totalEnviado)}</h2>

      </div>

    </div>
  );
}

export default StatsCards;