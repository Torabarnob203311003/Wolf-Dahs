import { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import logo from '../assets/logo.png';

function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = "email is required";
        } else if (formData.email.length > 100) {
            newErrors.email = "email must be less than 100 characters";
        }

        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        } else if (formData.password.length > 100) {
            newErrors.password = "Password must be less than 100 characters";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newErrors = validate();

        if (Object.keys(newErrors).length === 0) {
            console.log("Register data:", formData);
            alert("Registration successful!");
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#121212" }}>
            <div className="w-full max-w-xl bg-[#272828] p-6 rounded-lg shadow-lg">
                <div className="max-w-md mx-auto">
                    <div className="mb-8 text-center">
                        <div className="mb-6 flex justify-start">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    <img src={logo} alt="Logo" className="h-20 w-20" />
                                </div>
                            </div>
                        </div>
                        <h1 className="mb-2 text-3xl font-bold text-start" style={{ color: "#FAFAFA" }}>Register</h1>
                        <p style={{ color: "#999999" }} className="text-start">Let's create new account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: "#FAFAFA" }}>
                                Email
                            </label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" style={{ color: "#999999" }} />
                                <input
                                    type="text"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full pl-10 pr-4 py-2 rounded-md border outline-none focus:ring-2 transition-all"
                                    style={{
                                        backgroundColor: "#ffffff",
                                        borderColor: "#404040",
                                        color: "#000000",
                                        "--tw-ring-color": "#FF9933"
                                    }}
                                />
                            </div>
                            {errors.email && (
                                <p className="mt-1 text-sm" style={{ color: "#EB5757" }}>{errors.email}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: "#FAFAFA" }}>
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" style={{ color: "#999999" }} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter password"
                                    className="w-full pl-10 pr-10 py-2 rounded-md border outline-none focus:ring-2 transition-all"
                                    style={{
                                        backgroundColor: "#ffffff",
                                        borderColor: "#404040",
                                        color: "#000000",
                                        "--tw-ring-color": "#FF9933"
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                                    style={{ color: "#999999" }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = "#FAFAFA"}
                                    onMouseLeave={(e) => e.currentTarget.style.color = "#999999"}
                                >
                                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="mt-1 text-sm" style={{ color: "#EB5757" }}>{errors.password}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2" style={{ color: "#FAFAFA" }}>
                                Confirm Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2" style={{ color: "#999999" }} />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm password"
                                    className="w-full pl-10 pr-10 py-2 rounded-md border outline-none focus:ring-2 transition-all"
                                    style={{
                                        backgroundColor: "#ffffff",
                                        borderColor: "#404040",
                                        color: "#000000",
                                        "--tw-ring-color": "#FF9933"
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                                    style={{ color: "#999999" }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = "#FAFAFA"}
                                    onMouseLeave={(e) => e.currentTarget.style.color = "#999999"}
                                >
                                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                </button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="mt-1 text-sm" style={{ color: "#EB5757" }}>{errors.confirmPassword}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 rounded-md font-semibold transition-all"
                            style={{
                                backgroundColor: "#FF9933",
                                color: "#FAFAFA"
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.opacity = "0.9"}
                            onMouseLeave={(e) => e.currentTarget.style.opacity = "1"}
                        >
                            Continue
                        </button>

                        <p className="text-center text-sm" style={{ color: "#999999" }}>
                            Already have an account?{" "}
                            <a
                                href="/login"
                                className="font-semibold transition-all hover:underline"
                                style={{ color: "#FF9933" }}
                            >
                                Sign In
                            </a>
                        </p>
                    </form>

                    <div className="mt-8 text-center text-xs" style={{ color: "#999999" }}>
                        © 2025 <span className="font-semibold">NORTHSTAR</span> COMPETITIONS © 2025 · All rights reserved ·{" "}
                        <a
                            href="/terms"
                            className="hover:underline"
                            style={{ color: "#FF9933" }}
                        >
                            Term & Condition
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;