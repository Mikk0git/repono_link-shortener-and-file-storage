import React, { useEffect, useState } from "react";
import supabase from "../supabaseClient";
import styles from "./MainContainer.module.css";
import matrixEffect from "./matrixEffect";

interface FormFileProps {
  setFinalUrl: React.Dispatch<React.SetStateAction<string>>;
}

const FormLink: React.FC<FormFileProps> = ({ setFinalUrl }) => {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [originalUrlBorder, setOriginalUrlBorder] = useState<string>();
  const [activateBorders, setActivateBorders] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activateBorders) {
      if (!originalUrl) {
        setOriginalUrlBorder("red");
      } else {
        setOriginalUrlBorder("black");
      }
    }
  }, [activateBorders, originalUrl]);

  async function handleNewLink() {
    if (originalUrl) {
      setIsLoading(true);

      const { data, error } = await supabase
        .from("links")
        .insert([{ original_url: originalUrl }]) // todo After adding auth add user_id here
        .select();
      if (error) {
        console.error(error);
      } else {
        // console.log(data);
        setIsLoading(false);
        matrixEffect.matrixEffectAsync(
          `${window.location.href}l/${data[0].id}`,
          setFinalUrl
        );
      }
    } else {
      setActivateBorders(true);
      setFinalUrl("Some values are missing");
    }
  }

  useEffect(() => {
    if (isLoading) {
      matrixEffect.matrixLoadingAsync(setFinalUrl);
    }
  }),
    [isLoading];

  return (
    <div className={styles.mainForm} id={styles.formLink}>
      <input
        type="text"
        name="original_url"
        placeholder="URL"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
        style={{ borderColor: originalUrlBorder }}
      />
      <button id={styles.submitButton} onClick={handleNewLink}>
        ⚡
      </button>
    </div>
  );
};

export default FormLink;
