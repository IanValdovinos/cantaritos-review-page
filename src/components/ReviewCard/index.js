import React, { useState } from "react";
import emailjs from "emailjs-com";

import styles from "./reviewCard.module.css";

function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 48,
  className = "",
  messages = [],
  defaultRating = 0,
  onSetRating,
}) {
  const [rating, setRating] = useState(defaultRating);
  const [tempRating, setTempRating] = useState(null);

  function handleRatingChange(newRating) {
    setRating(newRating);
    onSetRating(newRating);
  }

  const containerStyles = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    justifyContent: "center",
  };

  const starContainerStyle = {
    display: "flex",
  };

  return (
    <div style={containerStyles} className={className}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={
              tempRating !== null
                ? i + 1 <= tempRating
                : rating !== null && i + 1 <= rating
            }
            onRate={() => handleRatingChange(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(null)}
            color={color}
            size={size}
          />
        ))}
      </div>
    </div>
  );
}

function Star({ onRate, full, onHoverIn, onHoverOut, color, size }) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    display: "block",
    cursor: "pointer",
  };

  return (
    <span
      role="button"
      style={starStyle}
      onClick={onRate}
      onMouseEnter={onHoverIn}
      onMouseLeave={onHoverOut}
    >
      {full ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={color}
          stroke={color}
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke={color}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="{2}"
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
    </span>
  );
}

function ReviewCard({
  className,
  emailJsServiceId,
  emailJsTemplateId,
  emailJsPublicKey,
  googleMapsPlaceId,
}) {
  const [userRating, setUserRating] = useState(0);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  function onSelectRating(rating) {
    setUserRating(rating);
    if (rating >= 4) {
      window.open(
        `https://search.google.com/local/writereview?placeid=${googleMapsPlaceId}`
      );
    }
  }

  function handleNameChange(event) {
    const newName = event.target.value;
    setName(newName);
  }

  function handleEmailChange(event) {
    const newEmail = event.target.value;
    setEmail(newEmail);
  }

  function handleFeedbackChange(event) {
    const newFeedback = event.target.value;
    setFeedback(newFeedback);
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Sends application to Rocky's email
    emailjs
      .sendForm(emailJsServiceId, emailJsTemplateId, e.target, emailJsPublicKey)
      .then(() => {
        setFormSubmitted(true);
      });
  };

  return (
    <div className={`${styles.reviewCard} ${className}`}>
      <h1 className={styles.reviewCardTitle}>Rate Us</h1>

      {!formSubmitted && (
        <StarRating color="black" onSetRating={onSelectRating} />
      )}

      {userRating > 0 && userRating < 4 && !formSubmitted ? (
        <div className={styles.formContainer}>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputSection}>
              <label>Name</label>
              <input
                className={styles.inputField}
                type="text"
                name="name"
                value={name}
                onChange={handleNameChange}
                required
              />
            </div>

            <div className={styles.inputSection}>
              <label>Email</label>
              <input
                className={styles.inputField}
                type="text"
                name="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
            </div>

            <div className={styles.inputSection}>
              <label>Tell us more about your experience:</label>
              <textarea
                className={styles.textareaField}
                name="feedback"
                value={feedback}
                onChange={handleFeedbackChange}
                rows={6}
                required
              />
            </div>

            <input className={styles.submitButton} type="submit" />
          </form>
        </div>
      ) : null}

      {formSubmitted && (
        <p>Thank you for your feedback! We'll be in touch with you soon.</p>
      )}
    </div>
  );
}

export default ReviewCard;
