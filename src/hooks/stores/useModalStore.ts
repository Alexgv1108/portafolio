import { create } from 'zustand';
import type { ModalState } from '../../models/modals/interfaces/ModalState';

export const useModalStore = create<ModalState>((set) => ({
    isModalOpen: false,
    modalType: null,
    openModal: (type: string) => set({ isModalOpen: true, modalType: type }),
    closeModal: () => set({ isModalOpen: false, modalType: null }),
}));
