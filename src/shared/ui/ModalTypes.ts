export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export interface ModalHeaderProps {
  onClose?: () => void;
  children: React.ReactNode;
}

export interface ModalBodyProps {
  children: React.ReactNode;
}

export interface ModalFooterProps {
  children: React.ReactNode;
}
