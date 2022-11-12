import Link from "next/link";

import styles from "./CommonLinks.module.css";

export const CommonLinks = () => {
    return (
        <section className={styles.CommonLinks__container}>
            <Link className={styles.CommonLinks__link} href="/">
                Городские руководства
            </Link>
        </section>
    )
}