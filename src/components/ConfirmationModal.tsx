import { Button, Modal } from "react-bootstrap";
import { Variant } from "react-bootstrap/esm/types";

interface ConfirmationModalProps {
  show: boolean;
  title?: string;
  message: string;
  confirmButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant: Variant;
}

export default function ConfirmationModal({
  show,
  title,
  message,
  confirmButtonText,
  onConfirm,
  onCancel,
  variant,
}: ConfirmationModalProps) {
  return (
    <Modal show={show} onHide={onCancel} centered>
      {title && (
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
      )}
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onCancel}>
          取消
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          {confirmButtonText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
