import { type IModalCache } from '../../models/reducers/modal.model';

const modalManager = new Map();
export const getModalCache = (id: any) => {
  if (modalManager.get(id)) {
    return modalManager.get(id);
  }
};
export const setModalCache = (id: any, value: IModalCache) => {
  modalManager.set(id, value);
};
