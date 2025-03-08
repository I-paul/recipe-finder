import React from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Globe, 
  MapPin 
} from 'lucide-react';
import './styling/contact-styles.css';
import paul from '../assets/paul-pro.jpg';
const ContactSection = () => {
  const teamMembers = [
    {
      name: "K.Israel Paul",
      role: "Lead Developer",
      linkedin: "https://www.linkedin.com/in/israel-paul-1b6034273",
      github: "https://github.com/I-paul",
      portfolio: "https://emilyrodriguez.dev",
      image: paul
    },
    // {
    //   name: "Alex Chen",
    //   role: "UI/UX Designer",
    //   linkedin: "https://linkedin.com/in/alexchen",
    //   github: "https://github.com/alexchen",
    //   portfolio: "https://alexchen.design",
    //   image: "/path/to/alex-avatar.jpg"
    // }
  ];

  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <h2 className="contact-title">Meet the Creators</h2>
        
        <div className="team-grid">
          {teamMembers.map((member, index) => (
            <div key={index} className="team-member-card">
              <div className="member-avatar">
                <img 
                  src={member.image} 
                  alt={`${member.name} avatar`} 
                  className="avatar-image"
                />
              </div>
              <div className="member-info">
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <div className="member-social-links">
                  <a href={member.linkedin} target="_blank">
                    <Linkedin size={20} />
                  </a>
                  <a href={member.github} target="_blank">
                    <Github size={20} />
                  </a>
                  <a href={member.portfolio} target="_blank">
                    <Globe size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="contact-info">
          <h2 className="contact-title">Contact Us</h2>
          <div className="contact-methods">
            <div className="contact-method">
              <Mail size={24} className="contact-icon" />
              <div>
                <h3>Email</h3>
                <p>recipefinder@support.com</p>
              </div>
            </div>
            <div className="contact-method">
              <Linkedin size={24} className="contact-icon" />
              <div>
                <h3>LinkedIn</h3>
                <p>Recipe Finder Official</p>
              </div>
            </div>
            <div className="contact-method">
              <MapPin size={24} className="contact-icon" />
              <div>
                <h3>Location</h3>
                <p>San Francisco, California</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;