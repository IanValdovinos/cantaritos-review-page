import styles from "./App.module.css";

// Import components
import ReviewCard from "./components/ReviewCard";

function App() {
  return (
    <div className={styles.app}>
      <ReviewCard
        className={styles.reviewCard}
        emailJsServiceId={"service_s5t5xrc"}
        emailJsTemplateId={"template_z8cvycr"}
        emailJsPublicKey={"a0i2gost1zTll3mbR"}
        googleMapsPlaceId={"ChIJaYKQtkTPJIgRTNeHHC-ukmk"}
      />
    </div>
  );
}

export default App;
