import styles from "./MainContainer.module.css";
import FormLink from "./FormLink";
import FormNote from "./FormNote";
import FormFile from "./FormFile";
import { useState } from "react";

const MainContainer = () => {
  const [displayedForm, setDisplayedForm] = useState("URL");
  const [finalUrl, setFinalUrl] = useState("Final Url");

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
        <FormLink setFinalUrl={setFinalUrl} />
      ) : displayedForm === "NOTE" ? (
        <FormNote setFinalUrl={setFinalUrl} />
      ) : displayedForm === "FILE" ? (
        <FormFile setFinalUrl={setFinalUrl} />
      ) : null}

      <div id={styles.finalUrl}>{finalUrl}</div>
    </div>
  );
};

export default MainContainer;
