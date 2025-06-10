import Modal from 'react-modal'

const customStyles = {
  overlay: {
    zIndex: 1000,
    background: 'rgba(0,0,0,0.5)',
    border: 'none',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    background: '#fff',
    padding: 0,
    border: 'none',
    overflow: 'hidden',
  },
}

type Props = {
  fullScreen?: boolean
  header?: any
  footer?: any
  children?: any
  isOpen: boolean
  onClose(): void
  width?: any
  hideHeader?: any
}
Modal.setAppElement('#root')
const ModalBase = (props: Props) => {
  return (
    <Modal isOpen={props.isOpen} style={customStyles} contentLabel="Example Modal">
      <div
        style={{
          width: props.fullScreen ? '100vw' : 'auto',
          height: props.fullScreen ? '100vh' : 'auto',
          overflow: 'hidden',
          border: '1px solid var(--color-3)',
        }}
      >

      </div>
    </Modal>
  )
}

export default ModalBase
