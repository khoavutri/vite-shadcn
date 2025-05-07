import { getModalCache } from '../../../../managers/modal/modal-manager';
import { type IModal, defaultModal } from '../../../../models/reducers/modal.model';
import { setModal } from '../../../../reducers/slice/modalSlice';
import { type RootState, useAppDispatch, useAppSelector } from '../../../../redux/store';
import ModalBase from '../base/modal-base';

const ModalWrapper = () => {
  const modal: IModal = useAppSelector((state: RootState) => state.modal);
  const dispatch = useAppDispatch();
  return (
    <ModalBase
      isOpen={modal.open}
      fullScreen={modal.fullScreen}
      width={modal.width}
      header={getModalCache(modal.key)?.header}
      footer={getModalCache(modal.key)?.footer}
      hideHeader={getModalCache(modal.key)?.headerHeight}
      onClose={() => {
        dispatch(setModal(defaultModal));
      }}
    >
      {getModalCache(modal.key)?.content}
    </ModalBase>
  );
};

export default ModalWrapper;
