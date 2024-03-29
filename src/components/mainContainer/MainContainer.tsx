import styles from "./MainContainer.module.css";
import FormLink from "./FormLink";
import FormNote from "./FormNote";
import FormFile from "./FormFile";
import { useContext, useEffect, useRef, useState } from "react";
import { MenuButtonContext } from "../../contexts/MenuButtonContext";

const MainContainer = () => {
  const [displayedForm, setDisplayedForm] = useState("URL");
  const [finalUrl, setFinalUrl] = useState<string>("");
  const formTypesRef = useRef<HTMLDivElement>(null);
  const [activeTypeStyle, setActiveTypeStyle] = useState({});
  const { isMenuButtonClicked } = useContext(MenuButtonContext);

  useEffect(() => {
    const updateActiveTypeStyle = () => {
      if (formTypesRef.current !== null) {
        const divWidth = formTypesRef.current.offsetWidth;
        const divHeight = formTypesRef.current.offsetHeight;
        const divTop = formTypesRef.current.getBoundingClientRect().top;
        console.log(`divPosition: ${divTop}`);
        console.log(`divWidth: ${divWidth}`);
        console.log(`divHeight: ${divHeight}`);

        let transValue: number = -100;
        switch (displayedForm) {
          case "URL":
            transValue = -100;
            break;
          case "NOTE":
            transValue = 0;
            break;
          case "FILE":
            transValue = 100;
            break;
        }

        setActiveTypeStyle({
          margin: `${divTop}px 0px 0px 0px`,
          height: `${divHeight - 3}px`,
          width: `${divWidth / 3}px`,
          transform: `translateX(${transValue}%)`,
        });
      }
    };

    const resizeObserver = new ResizeObserver(updateActiveTypeStyle);

    if (formTypesRef.current) {
      resizeObserver.observe(formTypesRef.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [displayedForm, isMenuButtonClicked]);
  return (
    <div id={styles.mainContainer}>
      <div id={styles.activeType} style={activeTypeStyle}></div>
      <div id={styles.formTypes} ref={formTypesRef}>
        <button
          className={styles.formType}
          onClick={() => setDisplayedForm("URL")}
        >
          Link
        </button>
        <button
          className={styles.formType}
          onClick={() => setDisplayedForm("NOTE")}
        >
          Note
        </button>
        <button
          className={styles.formType}
          onClick={() => setDisplayedForm("FILE")}
        >
          File
        </button>
      </div>

      {displayedForm === "URL" ? (
        <FormLink setFinalUrl={setFinalUrl} />
      ) : displayedForm === "NOTE" ? (
        <FormNote setFinalUrl={setFinalUrl} />
      ) : displayedForm === "FILE" ? (
        <FormFile setFinalUrl={setFinalUrl} />
      ) : null}

      <div
        id={styles.finalUrl}
        onClick={() => {
          navigator.clipboard.writeText(finalUrl);
        }}
      >
        {finalUrl}
      </div>
    </div>
  );
};

export default MainContainer;
