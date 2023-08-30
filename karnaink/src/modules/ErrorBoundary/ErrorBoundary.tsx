import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error here if needed
    console.log("sm rdyis");
    //console.error(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI when an error occurs
      return <div>Something went wrong.</div>;
    }

    // Render the children if there's no error
    return this.props.children;
  }
}

export default ErrorBoundary;
