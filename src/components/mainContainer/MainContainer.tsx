import styles from "./MainContainer.module.css";
import FormLink from "./FormLink";
import FormNote from "./FormNote";
import FormFile from "./FormFile";
import { useState } from "react";

const MainContainer = () => {
  const [displayedForm, setDisplayedForm] = useState("URL");

  return (
    <div id={styles.mainContainer}>
      <div id={styles.formTypes}>
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
        <FormLink />
      ) : displayedForm === "NOTE" ? (
        <FormNote />
      ) : displayedForm === "FILE" ? (
        <FormFile />
      ) : null}

      <div id={styles.finalUrl}>Final URL</div>
    </div>
  );
};

export default MainContainer;
