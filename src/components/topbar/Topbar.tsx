import { Link } from "react-router-dom";
import style from "./Topbar.module.css";
import useWindowResize from "../../hooks/useWindowResize";
import { useContext, useEffect, useState } from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { MenuButtonContext } from "../../contexts/MenuButtonContext";

const Topbar = () => {
  const windowSize = useWindowResize();
  const { isMenuButtonClicked, setIsMenuButtonClicked } =
    useContext(MenuButtonContext);

  useEffect(() => {}, [windowSize.innerWidth]);

  const handleMenuButtonClick = () => {
    setIsMenuButtonClicked(!isMenuButtonClicked);
    console.log(isMenuButtonClicked);
  };

  const closeMenu = () => {
    setIsMenuButtonClicked(false);
  };

  return (
    <>
      <nav className="topbar">
        <div id={style.logo}>
          <Link to="/">
            <span>Repono</span>
          </Link>
        </div>

        {windowSize.innerWidth < 600 ? (
          <button className="noStyleButton" onClick={handleMenuButtonClick}>
            {isMenuButtonClicked ? <IconX /> : <IconMenu2 />}
          </button>
        ) : (
          <ButtonList />
        )}
      </nav>
      {windowSize.innerWidth < 600 ? (
        isMenuButtonClicked ? (
          <div onClick={closeMenu}>
            <ButtonList />
          </div>
        ) : null
      ) : null}
    </>
  );
};

export default Topbar;

const ButtonList = () => {
  const [opacityValue, setOpacityValue] = useState(0);
  useEffect(() => {
    setOpacityValue(1);
    return () => {
      setOpacityValue(0);
    };
  }, []);
  return (
    <div id={style.buttonList}>
      <Link
        to="/"
        style={{
          opacity: opacityValue,
        }}
      >
        home
      </Link>
      <Link
        to="/about"
        style={{
          opacity: opacityValue,
        }}
      >
        about
      </Link>
      <Link
        to="/terms-of-service"
        style={{
          opacity: opacityValue,
        }}
      >
        terms of service
      </Link>
    </div>
  );
};
