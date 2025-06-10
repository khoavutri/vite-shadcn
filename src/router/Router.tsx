import { Route } from 'react-router-dom'
import { ErrorBoundaryRoutes } from '../components/base/error/ErrorBoundaryRoutes'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'

const Router = () => {
  return (
    <ErrorBoundaryRoutes>
      <Route
        index={true}
        element={
          <Home />
        }
      />
      <Route path="*" element={<NotFound />} />
    </ErrorBoundaryRoutes>
  )
}

export default Router
