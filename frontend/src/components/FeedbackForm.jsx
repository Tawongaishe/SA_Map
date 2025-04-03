import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import './FeedbackForm.css';

const FeedbackForm = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const formRef = useRef();

  // Replace these with your actual EmailJS credentials
  const SERVICE_ID = 'service_w53rb5f';
  const TEMPLATE_ID = 'template_ea5j518';
  const PUBLIC_KEY = '56mX3wkIETjbYMk43';

  const toggleForm = () => {
    setIsOpen(!isOpen);
    setShowSuccess(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Prepare template parameters
    const templateParams = {
      feedback_type: formRef.current.feedback_type.value,
      message: formRef.current.message.value,
      user_email: formRef.current.email.value || 'tawongaishe.nhawu@gmail.com',
      page_url: window.location.href,
      email: 'emailservice4994@gmail.com',
    };

    emailjs.init(PUBLIC_KEY);

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams)
      .then((response) => {
        console.log('Feedback sent successfully:', response);
        setIsSubmitting(false);
        setShowSuccess(true);
        formRef.current.reset();
        
        // Close the form after 3 seconds
        setTimeout(() => {
          setIsOpen(false);
          setShowSuccess(false);
        }, 3000);
      })
      .catch((error) => {
        console.error('Error sending feedback:', error);
        setIsSubmitting(false);
        alert('There was an error sending your feedback. Please try again.');
      });
  };

  return (
    <div className="feedback-container">
      {isOpen ? (
        <div className="feedback-form-container">
          <button className="close-button" onClick={toggleForm}>×</button>
          
          {showSuccess ? (
            <div className="success-message">
              <h3>Thank you for your feedback!</h3>
              <p>We appreciate your input and will use it to improve the platform.</p>
            </div>
          ) : (
            <form ref={formRef} onSubmit={handleSubmit}>
              <h3>Send Feedback</h3>
              <p>Help us improve by sharing your thoughts.</p>
              
              <div className="form-group">
                <label htmlFor="feedback_type">Feedback Type</label>
                <select 
                  name="feedback_type" 
                  id="feedback_type" 
                  required
                >
                  <option value="">Select a type</option>
                  <option value="Feature Request">Feature Request</option>
                  <option value="Bug Report">Bug Report</option>
                  <option value="Suggestion">Suggestion</option>
                  <option value="Compliment">Compliment</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Feedback</label>
                <textarea 
                  name="message" 
                  id="message" 
                  rows="4" 
                  required 
                  placeholder="Tell us what you think..."
                ></textarea>
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email (optional)</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  placeholder="If you'd like us to follow up"
                />
              </div>
              
              <button 
                type="submit" 
                className="submit-button" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Feedback'}
              </button>
            </form>
          )}
        </div>
      ) : (
        <button className="feedback-button" onClick={toggleForm}>
          Feedback
        </button>
      )}
    </div>
  );
};

export default FeedbackForm;