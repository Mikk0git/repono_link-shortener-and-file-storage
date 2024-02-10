import styles from "./MainContainer.module.css";

const MainContainer = () => {
  return (
    <div id={styles.mainContainer}>
      <div id={styles.actionTypes}>
        <div className={styles.actionType}>Link</div>
        <div className={styles.actionType}>Note</div>
        <div className={styles.actionType}>File</div>
      </div>
      <div id="mainForm">
        <input type="text" name="" />
      </div>
      <div id={styles.finalUrl}>URL</div>
    </div>
  );
};

export default MainContainer;
