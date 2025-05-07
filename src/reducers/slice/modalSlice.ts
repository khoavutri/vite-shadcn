import { type PayloadAction, createSlice } from '@reduxjs/toolkit'
import { type IModal, defaultModal } from '../../models/reducers/modal.model'

const initialState: IModal = defaultModal
export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    setModal: (state: IModal, action: PayloadAction<IModal>) => {
      state = action.payload
      return state
    },
    closeModal: (state: IModal) => {
      state.open = false
      return state
    },
  },
})
export default modalSlice.reducer
export const { setModal, closeModal } = modalSlice.actions
