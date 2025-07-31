import React from 'react';
import { Container, Panel, Button, Icon } from 'rsuite';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
    this.handleReload = this.handleReload.bind(this);
  }

  // eslint-disable-next-line no-unused-vars
  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log the error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error caught by boundary:', error, errorInfo);
    }
    
    this.setState({
      error,
      errorInfo
    });
  }

  handleReload() {
    window.location.reload();
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container>
          <div className="text-center mt-page">
            <Panel bordered style={{ maxWidth: 500, margin: '0 auto' }}>
              <div style={{ padding: '20px' }}>
                <Icon 
                  icon="exclamation-triangle" 
                  size="3x" 
                  style={{ color: '#f44336', marginBottom: '20px' }} 
                />
                <h4>Oops! Something went wrong</h4>
                <p style={{ color: '#666', marginBottom: '20px' }}>
                  We&apos;re sorry, but something unexpected happened. Please try refreshing the page.
                </p>
                
                <Button 
                  color="blue" 
                  onClick={this.handleReload}
                  style={{ marginBottom: '10px' }}
                >
                  <Icon icon="refresh" /> Refresh Page
                </Button>
                
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details style={{ marginTop: '20px', textAlign: 'left' }}>
                    <summary style={{ cursor: 'pointer', marginBottom: '10px' }}>
                      Error Details (Development Only)
                    </summary>
                    <pre style={{ 
                      background: '#f5f5f5', 
                      padding: '10px', 
                      borderRadius: '4px',
                      fontSize: '12px',
                      overflow: 'auto',
                      maxHeight: '200px'
                    }}>
                      {this.state.error.toString()}
                      {this.state.errorInfo.componentStack}
                    </pre>
                  </details>
                )}
              </div>
            </Panel>
          </div>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;