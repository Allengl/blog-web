import React, { ReactNode } from "react";
import { Button, ButtonProps, Spinner } from "react-bootstrap";

interface LoadingButtonProps {
  isLoading: boolean;
  children: ReactNode;
}

const LoadingButton = ({
  isLoading,
  children,
  ...props
}: LoadingButtonProps & ButtonProps) => {
  return (
    <Button {...props}>
      {isLoading && (
        <>
          <Spinner
            as="span"
            animation="border"
            size="sm"
            role="status"
            aria-hidden="true"
          />
          <span className="visually-hidden">加载中...</span>
        </>
      )}
      {children}
    </Button>
  );
};

export default LoadingButton;
