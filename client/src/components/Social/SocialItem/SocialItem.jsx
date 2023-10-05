import styles from "./styles/SocialItem.module.css"

function SocialItem( props ) {
  return (
    <div className={styles.SocialItem}>
        <img src={props.img} alt="Icon" className={styles.img} />
        <p className={styles.title}>{props.title}</p>
    </div>
  )
}

export default SocialItem