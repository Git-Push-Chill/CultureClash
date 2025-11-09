"use client";

import React, { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, RefreshCw, Home } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full p-8 bg-gray-900/80 border-2 border-red-500/50 shadow-xl">
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <div className="bg-red-500/20 rounded-full p-4">
                  <AlertCircle
                    className="w-16 h-16 text-red-500"
                    aria-hidden="true"
                  />
                </div>
              </div>

              <h1 className="text-3xl font-bold mb-4 text-white">
                Oops! Something went wrong
              </h1>

              <p className="mb-6">
                We encountered an unexpected error. Don't worry, your data is
                safe.
              </p>

              {process.env.NODE_ENV === "development" && this.state.error && (
                <details className="mb-6 text-left bg-gray-800 rounded-lg p-4 border border-red-500/30">
                  <summary className="cursor-pointer text-red-400 font-semibold mb-2">
                    Error Details (Development Only)
                  </summary>
                  <div className="text-sm space-y-2">
                    <p>
                      <strong>Error:</strong> {this.state.error.message}
                    </p>
                    {this.state.errorInfo && (
                      <pre className="overflow-auto text-xs">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    )}
                  </div>
                </details>
              )}

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={this.handleReset}
                  className="bg-linear-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  aria-label="Try again"
                >
                  <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
                  Try Again
                </Button>

                <Button
                  onClick={this.handleReload}
                  variant="outline"
                  className="border-purple-400/50 text-purple-300 hover:bg-purple-600/20"
                  aria-label="Reload page"
                >
                  <RefreshCw className="w-4 h-4 mr-2" aria-hidden="true" />
                  Reload Page
                </Button>

                <Button
                  onClick={this.handleGoHome}
                  variant="outline"
                  className="border-purple-400/50 text-purple-300 hover:bg-purple-600/20"
                  aria-label="Go to home page"
                >
                  <Home className="w-4 h-4 mr-2" aria-hidden="true" />
                  Go Home
                </Button>
              </div>
            </div>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}
