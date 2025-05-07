// import i18next from 'i18next'
// import { useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
// import historyNote from './release/history.json'
// import metadata from './release/metadata.json'
import Router from './router/Router'

import { useEffect } from 'react'
import ErrorBoundry from './components/base/error/ErrorBoundary'
import i18n from './i18n'
import { setDarkMode, setLanguge } from './reducers/slice/themeLanguageSlice'
import { useAppDispatch, useAppSelector } from './redux/store'
import './App.css'
import 'antd/dist/reset.css'
import './theme/default-theme.scss'
import './theme/pink-theme.scss'
import './theme/purple-theme.scss'
import './theme/red-theme.scss'
import LoadingBar from './components/base/loading/LoadingBar'

import { HTML5Backend } from 'react-dnd-html5-backend'
import { TouchBackend } from 'react-dnd-touch-backend'
import { DndProvider, TouchTransition, MouseTransition, Preview } from 'react-dnd-multi-backend'
import { Button, ConfigProvider } from 'antd'
import { darkTheme } from './managers/themes/dark-theme'
import { lightTheme } from './managers/themes/light-theme'

export const generatePreview = (props: any) => {
  const { item, style } = props

  const newStyle = {
    ...style,
    opacity: 0.5,
  }

  return (
    <div style={newStyle}>{item.draggingComponent ? item.draggingComponent : item.children}</div>
  )
}

const HTML5toTouch = {
  backends: [
    {
      id: 'html5',
      backend: HTML5Backend,
      transition: MouseTransition,
    },
    {
      id: 'touch',
      backend: TouchBackend,
      options: { enableMouseEvents: true },
      preview: true,
      transition: TouchTransition,
    },
  ],
}

const App = () => {
  const dispatch = useAppDispatch()
  const theme = useAppSelector((state) => state.themeLanguage.theme)
  const mode = useAppSelector((state) => state.themeLanguage.darkMode)

  useEffect(() => {
    dispatch(setLanguge(i18n.resolvedLanguage))
  }, [])

  return (
    <ErrorBoundry>
      <I18nextProvider i18n={i18n}>
        <ConfigProvider theme={mode ? darkTheme : lightTheme}>
          <DndProvider options={HTML5toTouch}>
            <Preview>{generatePreview}</Preview>
            <div
              className="App"
              data-theme={theme}
              style={{ backgroundColor: mode ? '#000' : '#fff' }}
            >
              <LoadingBar />
              <Router />
              <Button
                onClick={() => {
                  dispatch(setDarkMode(!mode))
                }}
                style={{ marginTop: 30 }}
              >
                Change
              </Button>
            </div>
          </DndProvider>
        </ConfigProvider>
      </I18nextProvider>
    </ErrorBoundry>
  )
}

export default App
