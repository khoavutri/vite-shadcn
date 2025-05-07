import { useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { authenticate } from '../reducers/slice/authSlice'
import { useAppDispatch } from '../redux/store'
import { Button, Input, Row, Typography } from 'antd'

type Props = {}

const Login = ({}: Props) => {
  const [username, setUsername] = useState('admin')
  const [password, setPassword] = useState('Tta@123')
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const redirectRouter = searchParams.get('return') || '/'
  const login = async () => {
    await dispatch(authenticate())
    navigate(redirectRouter)
  }
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <Row justify="center">
        <Typography.Title>Login</Typography.Title>
      </Row>
      <Typography.Text>Username:</Typography.Text>
      <Input
        style={{ padding: '8px 16px', fontSize: 16 }}
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Typography.Text>Password:</Typography.Text>
      <Input
        style={{ padding: '8px 16px', fontSize: 16 }}
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={login}>Login</Button>
    </div>
  )
}

export default Login
