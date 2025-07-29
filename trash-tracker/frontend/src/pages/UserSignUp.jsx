import { useState } from "react";
import axios from "axios";

function SignUpPage(){
    const [form, setForm] = useState({name: "", email: "", password: "", role: "user"});
    const [message, setMessage] = useState('');

    const handleChange = (e) => {setForm({...form, [e.target.name]: e.target.value})};
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post("/api/signup/users", form);
            setMessage(result.data.message);
        } catch (error) {
            setMessage(error.response?.data?.message || "Error occured");
        }
    };
    return(
        <>
            <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Sign Up as User</h1>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="name">Name</label>
                        <input
                        required
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Your name"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
                        <input
                        required
                        type="text"
                        name="email"
                        id="email"
                        placeholder="Your email"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="password">Password</label>
                        <input
                        required
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>


                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
                        >
                        Sign Up
                    </button>
                    </form>
                    <p className="mt-4 text-center text-sm text-gray-600">{message}</p>
                </div>
            </div>
        </>
    );
}

export default SignUpPage;