import styles from "./MainContainer.module.css";

const FormFIle = () => {
  return (
    <div className={styles.mainForm} id={styles.formFile}>
      <input type="file" name="" id="" />
      <button id={styles.submitButton}>⚡</button>
    </div>
  );
};

export default FormFIle;
