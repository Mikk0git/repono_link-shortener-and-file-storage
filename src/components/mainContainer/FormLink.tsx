import styles from "./MainContainer.module.css";
interface FormFileProps {
  setFinalUrl: React.Dispatch<React.SetStateAction<string>>;
}
const FormLink: React.FC<FormFileProps> = ({ setFinalUrl }) => {
  function handleNewLink() {
    setFinalUrl("link");
  }

  return (
    <div className={styles.mainForm} id={styles.formLink}>
      <input type="text" name="" placeholder="URL" />
      <button id={styles.submitButton} onClick={handleNewLink}>
        ⚡
      </button>
    </div>
  );
};
export default FormLink;
