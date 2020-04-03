import React from "react";

import { Aside, Header, Footer, Body } from "./styles";

export interface DefaultProps {
  isExpanded: boolean;
  isFullExpanded: boolean;
  isDismissedAll?: boolean;
  isLoading: boolean;
  children?: any;
  onDismissAll: () => void;
  onNextPage: () => void;
}

interface DefaultPropsButton {
  text: string;
  className?: string;
  onClick?: () => void;
  isLoading?: boolean;
}

/**
 * A basic Drawer component that accept children elements.
 * @param children
 * @param isExpanded
 * @param isDismissedAll
 * @param onDismissAll
 * @constructor
 */
export const Drawer: React.FC<DefaultProps> = ({
  children,
  isExpanded,
  isFullExpanded,
  isDismissedAll,
  onDismissAll,
  onNextPage,
  isLoading,
}) => {
  return (
    <Aside isFullExpanded={isFullExpanded} isExpanded={isExpanded}>
      <>
        <Header>
          <h1>Reddis Post</h1>
        </Header>
        <Body>{children}</Body>
        {isDismissedAll ? null : (
          <PaginationButton
            onClick={onNextPage}
            text={isLoading ? "loop" : "navigate_next"}
          />
        )}
        <Footer onClick={onDismissAll}>
          {isDismissedAll ? (
            <Button data-testid="recover-all" text="Recover All" />
          ) : (
            <Button data-testid="dismiss-all" text="Dismiss All" />
          )}
        </Footer>
      </>
    </Aside>
  );
};

const Button: React.FC<DefaultPropsButton> = ({ text, ...rest }) => (
  <button
    {...rest}
    className={`mdl-button mdl-js-button mdl-button--raised mdl-button--colored mdl-js-ripple-effect btn-footer`}
  >
    {text}
  </button>
);

const PaginationButton: React.FC<DefaultPropsButton> = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored btn-pagination`}
    >
      <i className="material-icons">{text}</i>
    </button>
  );
};
