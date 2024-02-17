import { useEffect, useState } from "react"; // Import useState
import supabase from "../supabaseClient";
import styles from "./MainContainer.module.css";
import matrixEffect from "./matrixEffect";

interface FormFileProps {
  setFinalUrl: React.Dispatch<React.SetStateAction<string>>;
}

const FormFile: React.FC<FormFileProps> = ({ setFinalUrl }) => {
  const [file, setFile] = useState<File | null>(null);
  const [fileBorder, setFileBorder] = useState<string>();
  const [activateBorders, setActivateBorders] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (activateBorders) {
      if (!file) {
        setFileBorder("red");
      } else {
        setFileBorder("var(--accent)");
      }
    }
  }, [activateBorders, file]);

  async function handleNewFile() {
    try {
      if (!file) {
        setFinalUrl("Please select a file.");
        setActivateBorders(true);
        return;
      }
      setActivateBorders(false);
      setIsLoading(true);

      // Upload file to Supabase storage
      const { data: filesUpload, error: uploadError } = await supabase.storage
        .from("files")
        .upload(`${file.name}`, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        throw new Error(`File upload failed: ${uploadError}`);
      }
      console.log(filesUpload);
      // Retrieve file ID from Supabase database
      const { data: filesSelect, error: selectError } = await supabase
        .from("files")
        .select("id")
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        .eq(`file_id`, `${filesUpload.id}`);

      if (selectError) {
        throw new Error(`Database query failed: ${selectError}`);
      }

      console.log(filesSelect);
      // Move the file within Supabase storage to the appropriate directory
      const { data: filesMove, error: moveError } = await supabase.storage
        .from("files")
        .move(`${file.name}`, `${filesSelect[0].id}/${file.name}`);

      if (moveError) {
        throw new Error(`File move failed: ${moveError}`);
      }

      console.log(filesMove);
      setIsLoading(false);
      matrixEffect.matrixEffectAsync(
        `${window.location.href}f/${filesSelect[0]?.id}`,
        setFinalUrl
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (isLoading) {
      matrixEffect.matrixLoadingAsync(setFinalUrl);
    }
  }),
    [isLoading];

  // Handle file input change
  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  }

  return (
    <div className={styles.mainForm} id={styles.formFile}>
      <input
        type="file"
        name=""
        id=""
        onChange={handleFileChange}
        style={{ borderColor: fileBorder }}
      />
      <button id={styles.submitButton} onClick={handleNewFile}>
        ⚡
      </button>
    </div>
  );
};

export default FormFile;
