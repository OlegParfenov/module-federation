import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import { ErrorBoundaryRemoteApp } from './containers/ErrorBoundaryRemoteApp/ErrorBoundaryRemoteApp'

const Button = React.lazy(() => import('mainApp/Button'))

function App () {
  return <>
    <h1>Hello from second app</h1>
    <ErrorBoundaryRemoteApp>
      <Suspense fallback='...'>
        <Button text={'Button from main app'}/>
      </Suspense>
    </ErrorBoundaryRemoteApp>
  </>
}

export default App

ReactDOM.render(<App/>, document.getElementById('root'))
