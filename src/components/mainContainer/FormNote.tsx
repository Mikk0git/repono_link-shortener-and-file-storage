import styles from "./MainContainer.module.css";
interface FormFileProps {
  setFinalUrl: React.Dispatch<React.SetStateAction<string>>;
}
const FormNote: React.FC<FormFileProps> = ({ setFinalUrl }) => {
  function handleNewNote() {
    setFinalUrl("note");
  }
  return (
    <div className={styles.mainForm} id={styles.formNote}>
      <input type="text" name="" placeholder="Title" />
      <input type="text" name="" id="" placeholder="Note" />

      <button id={styles.submitButton} onClick={handleNewNote}>
        ⚡
      </button>
    </div>
  );
};
export default FormNote;
