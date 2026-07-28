function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-blue-600">
        HireSense AI
      </h1>

      <div className="hidden md:flex gap-8 items-center">
        <a href="#" className="hover:text-blue-600 transition">
          Home
        </a>

        <a href="#" className="hover:text-blue-600 transition">
          Features
        </a>

        <a href="#" className="hover:text-blue-600 transition">
          Pricing
        </a>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
          Login
        </button>
      </div>
    </nav>
  );
}

export default Navbar;