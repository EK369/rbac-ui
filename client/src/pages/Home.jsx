import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="content-overlay">
        <header className="home-header">
          <h1>Welcome to the RBAC Management System</h1>
          <p>
            Redefining role-based access control with an intuitive, secure, and API-driven solution tailored for modern businesses.
          </p>
        </header>
        <main className="home-main">
          {/* Intro Section */}
          <section className="intro-section">
            <h2>Why Choose RBAC?</h2>
            <div className="intro-content">
              <p>
                Our RBAC Management System is engineered to provide seamless and secure control over user permissions.
                Whether you're a small team or a large enterprise, our solution ensures efficiency, scalability, and
                security in managing roles and access rights.
              </p>
              <img
                srcSet="https://images.pexels.com/photos/18500862/pexels-photo-18500862.jpeg 768w, https://images.pexels.com/photos/18500862/pexels-photo-18500862.jpeg 1280w"
                sizes="(max-width: 768px) 100vw, 1280px"
                src="https://images.pexels.com/photos/18500862/pexels-photo-18500862.jpeg"
                alt="A typewriter with a paper that says decentralized"
                className="responsive-image"
                loading="lazy"
              />
            </div>
          </section>

          {/* Features Section */}
          <section className="features-section">
            <h2>Key Features</h2>
            <div className="features-grid">
              <div className="feature-item">
                <img
                  src="https://images.pexels.com/photos/6476584/pexels-photo-6476584.jpeg"
                  alt="Secure data"
                  className="feature-image"
                  loading="lazy"
                />
                <h3>🔒 Secure</h3>
                <p>Ensure robust data protection with advanced role-based permissions.</p>
              </div>
              <div className="feature-item">
                <img
                  src="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
                  alt="Scalable system"
                  className="feature-image"
                  loading="lazy"
                />
                <h3>📈 Scalable</h3>
                <p>Adapt to your organization's growth without compromising performance.</p>
              </div>
              <div className="feature-item">
                <img
                  src="https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg"
                  alt="Customizable system"
                  className="feature-image"
                  loading="lazy"
                />
                <h3>🚀 High Performance</h3>
                <p>Optimized backend for fast, reliable operations at any scale.</p>
              </div>
            </div>
          </section>

          {/* Use Cases Section */}
          <section className="use-cases-section">
            <h2>Real-World Applications</h2>
            <div className="use-case">
              <img
                src="https://i.pinimg.com/236x/7f/82/f5/7f82f50915fe46d9979a960da40895ba.jpg"
                alt="Corporate IT"
                className="use-case-image"
                loading="lazy"
              />
              <p>
                <strong>Corporate IT:</strong> Simplify employee access to internal tools and resources with role-specific permissions.
              </p>
            </div>
            <div className="use-case">
              <img
                src="https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg"
                alt="Healthcare"
                className="use-case-image"
                loading="lazy"
              />
              <p>
                <strong>Healthcare:</strong> Protect sensitive patient data with strict access controls.
              </p>
            </div>
            <div className="use-case">
              <img
                src="https://images.pexels.com/photos/5632371/pexels-photo-5632371.jpeg"
                alt="E-commerce"
                className="use-case-image"
                loading="lazy"
              />
              <p>
                <strong>E-commerce:</strong> Manage vendor and customer data access seamlessly.
              </p>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="testimonials-section">
            <h2>What Our Clients Say</h2>
            <div className="testimonial">
              <img
                src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg"
                alt="Client photo"
                className="testimonial-image"
                loading="lazy"
              />
              <blockquote>
                "The RBAC System has revolutionized our approach to access control. It's intuitive and efficient!"
                <cite>- Alex Johnson, CTO at SecureTech</cite>
              </blockquote>
            </div>
            <div className="testimonial">
              <img
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg"
                alt="Client photo"
                className="testimonial-image"
                loading="lazy"
              />
              <blockquote>
                "RBAC is a lifesaver for our growing team. We can manage permissions with confidence."
                <cite>- Sarah Lee, Product Manager at InnovateX</cite>
              </blockquote>
            </div>
          </section>

          {/* FAQs Section */}
          <section className="faqs-section">
            <h2>FAQs</h2>
            <p><strong>Q: Can RBAC handle large datasets?</strong></p>
            <p>A: Yes, our system is built to manage vast amounts of data efficiently.</p>
            <p><strong>Q: Is it compatible with other systems?</strong></p>
            <p>A: Absolutely. RBAC integrates seamlessly with existing infrastructure through its API-driven architecture.</p>
          </section>
        </main>
        <footer className="home-footer">
          <p>&copy; 2024 RBAC System. Built for innovation, designed for security.</p>
        </footer>
      </div>
    </div>
  );
};

export default Home;
