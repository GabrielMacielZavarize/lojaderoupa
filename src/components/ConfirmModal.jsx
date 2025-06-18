import './ConfirmModal.css'

const ConfirmModal = ({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title = 'Confirmar Ação', 
  message = 'Tem certeza que deseja continuar?',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'warning' // 'warning', 'danger', 'info'
}) => {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  return (
    <div className="confirm-modal-overlay" onClick={handleCancel}>
      <div className="confirm-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className={`confirm-modal-header confirm-modal-${type}`}>
          <h3>{title}</h3>
          <button onClick={handleCancel} className="confirm-modal-close">✕</button>
        </div>
        
        <div className="confirm-modal-body">
          <div className="confirm-modal-icon">
            {type === 'danger' && <span className="icon-danger">⚠️</span>}
            {type === 'warning' && <span className="icon-warning">⚠️</span>}
            {type === 'info' && <span className="icon-info">ℹ️</span>}
          </div>
          <p>{message}</p>
        </div>
        
        <div className="confirm-modal-actions">
          <button 
            onClick={handleCancel} 
            className="confirm-modal-btn confirm-modal-btn-cancel"
          >
            {cancelText}
          </button>
          <button 
            onClick={handleConfirm} 
            className={`confirm-modal-btn confirm-modal-btn-${type}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal; 