import styles from "./page.module.css";
import ProductTable from "../components/ProductTable";

export default function Home() {
  return (
    <main className={styles.main}>
      <ProductTable />
    </main>
  );
}
