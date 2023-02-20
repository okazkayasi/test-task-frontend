import { HomePage } from 'components/HomePage/HomePage'
import { SharedPage } from 'components/SharedPage/SharedPage'
import { BrowserRouter as Router, useRoutes } from 'react-router-dom'

function App() {
  return useRoutes([
    { path: '/', element: <HomePage /> },
    { path: '/shared/:token', element: <SharedPage /> },
    { path: '*', element: <div>Super nice 404 page</div> },
  ])
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  )
}

export default AppWrapper
