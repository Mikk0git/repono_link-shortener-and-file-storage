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
        <div
          className={styles.formType}
          onClick={() => setDisplayedForm("URL")}
        >
          Link
        </div>
        <div
          className={styles.formType}
          onClick={() => setDisplayedForm("NOTE")}
        >
          Note
        </div>
        <div
          className={styles.formType}
          onClick={() => setDisplayedForm("FILE")}
        >
          File
        </div>
      </div>

      {displayedForm === "URL" ? (
        <FormLink />
      ) : displayedForm === "NOTE" ? (
        <FormNote />
      ) : displayedForm === "FILE" ? (
        <FormFile />
      ) : null}

      <div id={styles.finalUrl}>URL</div>
    </div>
  );
};

export default MainContainer;
