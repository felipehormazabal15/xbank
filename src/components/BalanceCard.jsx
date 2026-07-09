import { FaWallet } from "react-icons/fa";
import { formatMoney } from "../utils/formatMoney";

function BalanceCard({ email, saldo }) {
  return (
    <div className="balance-card">

      <div className="balance-header">

        <FaWallet size={30} />

        <div>
          <h3>Saldo Disponible</h3>
          <p>{email}</p>
        </div>

      </div>

      <h2>{formatMoney(saldo)}</h2>

    </div>
  );
}

export default BalanceCard;