function TransferForm({
  emailDestino,
  setEmailDestino,
  monto,
  setMonto,
  handleTransfer,
  loadingTransfer
}) {
  return (
    <div className="transfer-card">

      <h2>💸 Nueva transferencia</h2>

      <input
        type="email"
        placeholder="Correo del destinatario"
        value={emailDestino}
        onChange={(e) => setEmailDestino(e.target.value)}
      />

      <input
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