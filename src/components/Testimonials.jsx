import "../styles/Testimonials.css";
import testimonials from "../data/Testimonials";
import { FaStar, FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  return (
    <section className="testimonials-section">

      <div className="testimonials-header">
        <p className="testimonials-eyebrow">
          PATIENT REVIEWS
        </p>

        <h2 className="testimonials-title">
          What Our Patients Say
        </h2>

        <p className="testimonials-subtitle">
          Trusted by thousands of patients for quality healthcare services
        </p>
      </div>

      <div className="testimonials-grid">

        {testimonials.map((testimonial) => (
          <div className="testimonial-card" key={testimonial.id}>

            <FaQuoteLeft className="quote-icon" />

            <p className="testimonial-review">
              {testimonial.review}
            </p>

            <div className="testimonial-rating">
              {[...Array(testimonial.rating)].map((_, index) => (
                <FaStar key={index} />
              ))}
            </div>

            <div className="testimonial-user">

              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="testimonial-img"
              />

              <div>
                <h4>{testimonial.name}</h4>
                <span>{testimonial.role}</span>
              </div>

            </div>

          </div>
        ))}

      </div>

    </section>
  );
};

export default Testimonials;