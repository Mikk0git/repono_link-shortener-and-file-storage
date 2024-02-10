import styles from "./MainContainer.module.css";

const FormNote = () => {
  return (
    <div className={styles.mainForm} id={styles.formNote}>
      <input type="text" name="" placeholder="Title" />
      <input type="text" name="" id="" placeholder="Note" />
    </div>
  );
};
export default FormNote;
