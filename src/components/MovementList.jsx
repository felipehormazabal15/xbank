import {
  FaArrowUp,
  FaArrowDown,
  FaCalendarAlt,
  FaClock,
  FaEnvelope,
} from "react-icons/fa";

import { formatMoney } from "../utils/formatMoney";

function MovementList({ movimientos }) {

  const formatearFecha = (fecha) => {
    if (!fecha) return "-";

    const date = fecha.toDate
      ? fecha.toDate()
      : new Date(fecha);

    return date.toLocaleDateString("es-CL");
  };

  const formatearHora = (fecha) => {
    if (!fecha) return "-";

    const date = fecha.toDate
      ? fecha.toDate()
      : new Date(fecha);

    return date.toLocaleTimeString("es-CL", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="movement-card">

      <h2>📜 Últimos movimientos</h2>

      {movimientos.length === 0 && (
        <p>No existen movimientos.</p>
      )}

      {movimientos.map((mov) => (
        <div
          key={mov.id}
          className="movement-item"
        >

          <div className="movement-icon">

            {mov.type === "Transferencia"
              ? <FaArrowUp color="#ef4444" size={22}/>
              : <FaArrowDown color="#22c55e" size={22}/>}

          </div>

          <div className="movement-info">

            <strong>{mov.type}</strong>

            <p>

              <FaEnvelope />

              {mov.toEmail}

            </p>

            <p>

              <FaCalendarAlt />

              {formatearFecha(mov.date)}

            </p>

            <p>

              <FaClock />

              {formatearHora(mov.date)}

            </p>

          </div>

          <div className="movement-amount">

            {formatMoney(mov.amount)}

          </div>

        </div>
      ))}

    </div>
  );
}

export default MovementList;