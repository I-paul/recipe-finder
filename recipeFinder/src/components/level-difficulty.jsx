import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { ChevronDown, Clock, Utensils } from "lucide-react";
import './styling/level-styles.css';
const CategoryCard = ({ title, recipes }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  
  return (
    <div className="category-card">
      <div className="category-header" onClick={toggleDropdown}>
        <h2>{title}</h2>
        <div className={`icon ${isOpen ? 'open' : ''}`}>
          <ChevronDown size={20} />
        </div>
      </div>
      <div className={`recipe-dropdown ${isOpen ? 'open' : ''}`}>
        {recipes.length > 0 ? (
          <ul className="recipe-list">
            {recipes.map((recipe, index) => (
              <li key={index} className="recipe-item">
                <span className="recipe-icon"><Utensils size={16} /></span>
                <span className="recipe-name">{recipe.name}</span>
                <span className="recipe-time">
                  <Clock size={16} />
                  {recipe.time}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">No recipes available</div>
        )}
      </div>
    </div>
  );
};

const Difficulty = React.memo(() => {
  const { difficulty } = useParams();

  // Preload level details to avoid reloading from API every time
  const levelDetails = useMemo(() => ({
    beginner: {
      title: "Beginner Level",
      description: "Learn the basics of cooking, kitchen safety, and simple recipes.",
    },
    intermediate: {
      title: "Intermediate Level",
      description: "Explore international cuisines and advanced cooking techniques.",
    },
    advanced: {
      title: "Advanced Level",
      description: "Master gourmet dishes and sophisticated culinary presentations.",
    },
    master: {
      title: "Master Chef Level",
      description: "Innovate and experiment with expert-level cooking techniques.",
    },
  }), []);

  // Sample food categories with recipes for each difficulty level
  const foodCategories = useMemo(() => {
    // Different recipes based on difficulty level
    const difficultyRecipes = {
      beginner: {
        breakfast: [
          { name: "Simple Pancakes", time: "15 min" },
          { name: "Scrambled Eggs", time: "10 min" },
          { name: "Avocado Toast", time: "5 min" }
        ],
        soups: [
          { name: "Classic Tomato Soup", time: "30 min" },
          { name: "Chicken Noodle Soup", time: "45 min" }
        ],
        mains: [
          { name: "Spaghetti with Marinara", time: "20 min" },
          { name: "Grilled Cheese Sandwich", time: "10 min" },
          { name: "Basic Omelette", time: "15 min" }
        ],
        desserts: [
          { name: "Chocolate Chip Cookies", time: "25 min" },
          { name: "Fruit Salad", time: "10 min" }
        ]
      },
      intermediate: {
        breakfast: [
          { name: "Eggs Benedict", time: "30 min" },
          { name: "French Toast", time: "20 min" }
        ],
        soups: [
          { name: "French Onion Soup", time: "1 hr" },
          { name: "Minestrone", time: "45 min" }
        ],
        mains: [
          { name: "Chicken Parmesan", time: "45 min" },
          { name: "Beef Stir Fry", time: "30 min" },
          { name: "Eggplant Lasagna", time: "1 hr" }
        ],
        desserts: [
          { name: "Tiramisu", time: "3 hrs" },
          { name: "Apple Pie", time: "1 hr 30 min" }
        ]
      },
      advanced: {
        breakfast: [
          { name: "Eggs Florentine", time: "40 min" },
          { name: "Croque Madame", time: "35 min" }
        ],
        soups: [
          { name: "Lobster Bisque", time: "1 hr 30 min" },
          { name: "Bouillabaisse", time: "2 hrs" }
        ],
        mains: [
          { name: "Beef Wellington", time: "2 hrs 30 min" },
          { name: "Duck à l'Orange", time: "1 hr 45 min" },
          { name: "Risotto ai Funghi", time: "50 min" }
        ],
        desserts: [
          { name: "Crème Brûlée", time: "1 hr" },
          { name: "Chocolate Soufflé", time: "45 min" }
        ]
      },
      master: {
        breakfast: [
          { name: "Eggs Royale with Homemade Hollandaise", time: "45 min" },
          { name: "Brioche French Toast with Caramelized Bananas", time: "40 min" }
        ],
        soups: [
          { name: "Consommé with Herb Quenelles", time: "3 hrs" },
          { name: "Thai Tom Kha Gai (Coconut Soup)", time: "1 hr 30 min" }
        ],
        mains: [
          { name: "Sous Vide Rack of Lamb", time: "2 hrs" },
          { name: "Truffle Risotto with Gold Leaf", time: "1 hr" },
          { name: "Lobster Thermidor", time: "2 hrs 30 min" }
        ],
        desserts: [
          { name: "French Croquembouche", time: "3 hrs" },
          { name: "Baked Alaska", time: "4 hrs" },
          { name: "Chocolate Mirror Glaze Cake", time: "5 hrs" }
        ]
      }
    };
    
    return difficultyRecipes[difficulty] || {};
  }, [difficulty]);

  const selectedLevel = levelDetails[difficulty] || {
    title: "Unknown Level",
    description: "Level not found. Please select a valid difficulty.",
  };

  const categories = [
    { id: "breakfast", title: "Breakfast & Brunch" },
    { id: "soups", title: "Soups & Stews" },
    { id: "mains", title: "Main Dishes" },
    { id: "desserts", title: "Desserts & Baking" }
  ];

  return (
    <section className="difficulties">
      <h1>{selectedLevel.title}</h1>
      <p>{selectedLevel.description}</p>
      
      <div className="category-container">
        {categories.map(category => (
          <CategoryCard 
            key={category.id}
            title={category.title}
            recipes={foodCategories[category.id] || []}
          />
        ))}
      </div>
      
    </section>
  );
});

export default Difficulty;