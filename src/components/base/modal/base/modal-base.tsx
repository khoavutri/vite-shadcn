import { Button, Col, Layout, Row } from 'antd'
import styles from './style.module.scss'
import { type IoClose } from 'react-icons/io5'
import Modal from 'react-modal'
const { Header, Content, Footer } = Layout
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
        <Layout style={{ width: '100%', height: '100%' }}>
          <Header className={styles.header} style={{ display: props.header ? '' : 'none' }}>
            <Row align={'middle'} style={{ height: '100%' }}>
              <Col span={23} className={styles.colHeader}>
                {props.header}
              </Col>
              <Col span={1} style={{ height: '100%' }}>
                <Button
                  onClick={props.onClose}
                  icon={<IoClose />}
                  type="link"
                  className={styles.close}
                  danger={true}
                />
              </Col>
            </Row>
          </Header>
          <Content
            className={styles.content}
          // style={{ padding: props.fullScreen ? 0 : '0px 5px' }}
          >
            {props.children}
          </Content>
          {props.footer && <Footer className={styles.footer}>{props.footer}</Footer>}
        </Layout>
      </div>
    </Modal>
  )
}

export default ModalBase
