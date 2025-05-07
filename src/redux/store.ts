import { configureStore, type AnyAction, type ThunkAction } from '@reduxjs/toolkit'
import { loadingBarMiddleware } from './middlewares/loadingbar'
import { notificationMiddleware } from './middlewares/notification'
import { processing } from './middlewares/Processing'
import { rootReducer } from './rootReducer'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux'

const middleWare = [processing, loadingBarMiddleware, notificationMiddleware]

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware): any => [...getDefaultMiddleware(), ...middleWare],
})

export type RootState = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<any>()
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, AnyAction>
