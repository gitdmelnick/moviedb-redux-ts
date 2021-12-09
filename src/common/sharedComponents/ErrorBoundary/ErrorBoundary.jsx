import { Component } from "react";
import Dummy from "../Dummy/Dummy";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Dummy text={"Whoops! Something went wrong"}/>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
