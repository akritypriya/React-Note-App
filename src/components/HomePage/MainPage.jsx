import "../../index.css";
import styles from "./mainPage.module.css";
import logo from "../../assets/mainLogo.png";
import lock from "../../assets/lock.svg";


function MainPage() {
  return (
    <div className={styles.mainSection}>
    <div className={styles.rightSection}>
    <img src={logo} alt=""  />
      <h1>Pocket Notes</h1>
      <p>Send and receive messages without keeping your phone online.<br/>
         Use Pocket Notes on up to 4 linked devices and 1 mobile phone
      </p>
      <img src={lock} alt="" /><span>&nbsp;&nbsp;end-to-end encrypted</span>
    </div>
    </div>
 )
}

export default MainPage;











