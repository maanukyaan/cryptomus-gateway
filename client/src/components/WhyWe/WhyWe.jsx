import styles from "./WhyWe.module.css"

import Li from "./Li";


function WhyWe() {
  return (
    <div className={styles.WhyWe}>
        <h2 className={styles.title}>Why Buy Our Facebook Accounts?</h2>
        <ul className={styles.ul}>
            <Li text="High Quality Service" />
            <Li text="Real & Active Accounts" />
            <Li text="100% Complete Profiles" />
            <Li text="Cheap Price Per Account" />
            <Li text="Unlimited Accounts" />
            <Li text="Custom Order Quantity" />
            <Li text="24/7 Lifetime Support" />
            <Li text="And much more..." />
        </ul>
    </div>
  )
}

export default WhyWe