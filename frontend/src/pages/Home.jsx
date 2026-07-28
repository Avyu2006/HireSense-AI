import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Navbar />
      <Hero />
      <Features />
    </div>
  );
}

export default Home;