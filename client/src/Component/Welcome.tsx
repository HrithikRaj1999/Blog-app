import { User, BookOpen, Edit } from "react-feather";

const WelcomePage = () => {
  return (
    <div className="welcome-container">
      <h1 className="fade-in">Welcome to Blogify!</h1>
      <p className="fade-in">Your personal space to express and explore!</p>
      <div className="icons fade-in">
        <User size={48} />
        <BookOpen size={48} />
        <Edit size={48} />
      </div>
    </div>
  );
};

export default WelcomePage;
