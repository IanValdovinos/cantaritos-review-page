import styles from "./App.module.css";

// Import components
import ReviewCard from "./components/ReviewCard";

function App() {
  return (
    <div className={styles.app}>
      <ReviewCard className={styles.reviewCard} />
    </div>
  );
}

export default App;
