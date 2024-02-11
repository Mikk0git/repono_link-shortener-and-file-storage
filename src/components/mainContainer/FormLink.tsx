import styles from "./MainContainer.module.css";

const FormLink = () => {
  return (
    <div className={styles.mainForm} id={styles.formLink}>
      <input type="text" name="" placeholder="URL" />
      <button id={styles.submitButton}>⚡</button>
    </div>
  );
};
export default FormLink;
