import React from 'react'

export class ErrorBoundaryRemoteApp extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, errorInfo);
  }

  render() {
    const { children } = this.props
    const { hasError } = this.state

    if (hasError) {
      return <h1>Remote is not available.</h1>
    }

    return children
  }
}
