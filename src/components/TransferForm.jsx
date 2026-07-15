function TransferForm({
  emailDestino,
  setEmailDestino,
  monto,
  setMonto,
  handleTransfer,
  loadingTransfer,
}) {
  return (
    <div className="transfer-card">
      <h2>💸 Nueva transferencia</h2>

      <label htmlFor="emailDestino">
        Correo del destinatario
      </label>

      <input
        id="emailDestino"
        type="email"
        placeholder="Correo del destinatario"
        value={emailDestino}
        onChange={(e) => setEmailDestino(e.target.value)}
      />

      <label htmlFor="monto">
        Monto
      </label>

      <input
        id="monto"
        type="number"
        placeholder="Monto"
        value={monto}
        onChange={(e) => setMonto(e.target.value)}
      />

      <button
        onClick={handleTransfer}
        disabled={loadingTransfer}
      >
        {loadingTransfer ? "Enviando..." : "Enviar dinero"}
      </button>
    </div>
  );
}

export default TransferForm;