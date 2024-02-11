import React, { useState } from "react";
import supabase from "../supabaseClient";
import styles from "./MainContainer.module.css";

interface FormFileProps {
  setFinalUrl: React.Dispatch<React.SetStateAction<string>>;
}

const FormLink: React.FC<FormFileProps> = ({ setFinalUrl }) => {
  const [originalUrl, setOriginalUrl] = useState<string>("");

  async function handleNewLink() {
    if (originalUrl) {
      const { data, error } = await supabase
        .from("links")
        .insert([{ original_url: originalUrl }]) // todo After adding auth add user_id here
        .select();
      if (error) {
        console.error(error);
      } else {
        // console.log(data);
        setFinalUrl(
          `${import.meta.env.SITE}${import.meta.env.BASE_URL}l/${data[0].id}`,
        );
      }
    }
  }

  return (
    <div className={styles.mainForm} id={styles.formLink}>
      <input
        type="text"
        name="original_url"
        placeholder="URL"
        value={originalUrl}
        onChange={(e) => setOriginalUrl(e.target.value)}
      />
      <button id={styles.submitButton} onClick={handleNewLink}>
        ⚡
      </button>
    </div>
  );
};

export default FormLink;
