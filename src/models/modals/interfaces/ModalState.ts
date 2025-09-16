export interface ModalState {
    isModalOpen: boolean;
    modalType: string | null;
    openModal: (type: string) => void;
    closeModal: () => void;
}