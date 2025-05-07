export interface IModal {
  open: boolean
  key: any
  fullScreen?: any
  width?: any
}
export const defaultModal: IModal = {
  key: '',
  open: false,
}
export interface IModalCache {
  content: any
  key: any
  header?: any
  footer?: any
  hideHeader?: any
}
