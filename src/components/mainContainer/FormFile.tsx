import styles from "./MainContainer.module.css";

interface FormFileProps {
  setFinalUrl: React.Dispatch<React.SetStateAction<string>>;
}

const FormFile: React.FC<FormFileProps> = ({ setFinalUrl }) => {
  function handleNewFile() {
    setFinalUrl("file");
  }

  return (
    <div className={styles.mainForm} id={styles.formFile}>
      <input type="file" name="" id="" />
      <button id={styles.submitButton} onClick={handleNewFile}>
        ⚡
      </button>
    </div>
  );
};

export default FormFile;
