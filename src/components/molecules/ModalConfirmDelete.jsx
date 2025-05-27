import React from "react";

export default function ModalConfirmDelete({ task, onConfirm, onCancel }) {
  if (!task) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <p>Tem certeza que deseja excluir: <strong>{task.description}</strong>?</p>
        <div className="modal-buttons">
          <button onClick={() => onConfirm(task.id)} className="confirm">Confirmar</button>
          <button onClick={onCancel} className="cancel">Cancelar</button>
        </div>
      </div>
    </div>
  );
}