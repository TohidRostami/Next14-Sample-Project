import styles from "./page.module.css";
import MainComponent from "@/components/MainComponent";

export default function Home() {
  return (
    <main className={styles.main}>
      <MainComponent/>
    </main>
  );
}
