declare module "material-ui-popup-state" {
  import * as React from "react";

  export interface PopupState {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
    setOpen: (open: boolean) => void;
    anchorEl?: HTMLElement | null;
  }

  export interface PopupStateProps {
    children: (popupState: PopupState) => React.ReactNode;
    variant?: "popover" | "popper";
    popupId?: string;
  }

  export default function PopupState(props: PopupStateProps): JSX.Element;

  export function bindToggle(popupState: PopupState): {
    onClick: (event: React.MouseEvent<any>) => void;
  };

  export function bindPopper(popupState: PopupState): {
    open: boolean;
    anchorEl?: HTMLElement | null;
  };
}
