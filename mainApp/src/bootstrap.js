import React, { useState, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { ErrorBoundaryRemoteApp } from './containers/ErrorBoundaryRemoteApp/ErrorBoundaryRemoteApp'

const Counter = React.lazy(() => import('secondApp/Counter'));

function App() {
  const [count, setCount] = useState(0);
  return (
    <>
      <h1>Hello from main app</h1>
      <ErrorBoundaryRemoteApp>
        <Suspense fallback='Loading Counter...'>
          <Counter
            count={count}
            onIncrement={() => setCount(count + 1)}
            onDecrement={() => setCount(count - 1)}
          />
        </Suspense>
      </ErrorBoundaryRemoteApp>
    </>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
