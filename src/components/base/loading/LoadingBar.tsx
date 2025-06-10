import { type RootState, useAppSelector } from '../../../redux/store'

type Props = {}

const LoadingBar = (_props: Props) => {
  const loadingBar = useAppSelector((store: RootState) => store.loadingBar)
  return loadingBar.show ? <></> : null
}

export default LoadingBar
