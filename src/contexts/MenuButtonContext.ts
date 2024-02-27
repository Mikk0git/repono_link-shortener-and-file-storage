import { createContext } from "react";

interface MenuButtonContextProps {
  isMenuButtonClicked: boolean;
  setIsMenuButtonClicked: (isMenuButtonClicked: boolean) => void;
}

export const MenuButtonContext = createContext<MenuButtonContextProps>({
  isMenuButtonClicked: false,
  setIsMenuButtonClicked: function (): void {
    throw new Error("Function not implemented.");
  },
});
