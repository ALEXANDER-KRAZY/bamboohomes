'use client'

import { useEffect } from "react";

import EmptyState from "./components/EmptyState";

interface ErrorStateProps {
    error: Error
}

const ErrorOutput: React.FC<ErrorStateProps> = ({
    error
}) => {
    useEffect(() => {
        console.error(error);
    }, [error]);
  return (
    <EmptyState
    title="Uh Oh!"
    subtitle="Something went wrong"
    />
  )
}

export default ErrorOutput
