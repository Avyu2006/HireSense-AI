import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const registerUser = async () => {
    if (!fullName || !email || !password) {
      toast.error("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/users/register", {
        full_name: fullName,
        email: email,
        password: password,
      });

      toast.success("Registration Successful!");

      setTimeout(() => {
        navigate("/");
      }, 500);

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.detail ||
        "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>HireSense AI</h1>

      <h2>Register</h2>

      <input
        type="text"
        placeholder="Full Name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
      />

      <br /><br />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button
        onClick={registerUser}
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>

      <br /><br />

      <Link to="/">
        Already have an account? Login
      </Link>
    </div>
  );
}

export default Register;