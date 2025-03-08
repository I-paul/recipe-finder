import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import "./styling/level-styles.css";

const Levels = memo(() => {
  const navigate = useNavigate();

  const handleNavigation = (event) => {
    const difficulty = event.currentTarget.dataset.difficulty;
    navigate(`/level-difficulty/${difficulty}`);
  };

  return (
    <section className="levels-section" id="levels">
      <div className="levels-grid">
        {["beginner", "intermediate", "advanced", "master"].map((level) => (
          <div key={level} className="level-card" data-difficulty={level} onClick={handleNavigation}>
            <h3 className="level-title">{level.charAt(0).toUpperCase() + level.slice(1)}</h3>
            <p className="level-description">
              {level === "beginner" && "Perfect for those just starting their culinary journey. Learn basic techniques, simple recipes, and essential kitchen safety."}
              {level === "intermediate" && "Ready to expand your skills? Discover more complex techniques, international cuisines, and flavor combinations."}
              {level === "advanced" && "For experienced cooks looking to master sophisticated techniques, gourmet dishes, and professional presentation."}
              {level === "master" && "Challenge yourself with expert-level recipes, innovative cooking methods, and creative culinary experiments."}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
});

export default Levels;
