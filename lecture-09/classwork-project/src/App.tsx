import { useState } from "react";

export default function App() {
    const [errors, setErrors] = useState<string[]>([]);
    const [successMessage, setSuccessMessage] = useState("");

    function handleRegister() {

        const username = document.querySelector('#username') as HTMLInputElement;
        const email = document.querySelector('#email') as HTMLInputElement
        const password = document.querySelector('#password') as HTMLInputElement

        const validationErrors: string[] = [];

        if (!username?.value) {
            validationErrors.push("Username is required");
        }

        if (!email?.value) {
            validationErrors.push("Email is required");
        }

        if (!password?.value) {
            validationErrors.push("Password is required");
        }

        if (validationErrors.length > 0) {
            setErrors(validationErrors);
            setSuccessMessage("");
            return;
        }

        setErrors([]);
        setSuccessMessage("Registration completed successfully!");

        console.log({
            username,
            email,
            password
        });
    }

    return (
        <div className="container my-4">
            <h1>Sign up</h1>

            {errors.length > 0 && (
                <div className="alert alert-danger">
                    {errors[0]}
                </div>
            )}

            {successMessage && (
                <div className="alert alert-success">
                    {successMessage}
                </div>
            )}

            <form>
                <div className="form-group py-1">
                    <label htmlFor="username">Username*</label>
                    <input type="text" className="form-control" id="username"/>
                </div>

                <div className="form-group py-1">
                    <label htmlFor="email">Email*</label>
                    <input  type="email" className="form-control" id="email" />
                </div>

                <div className="form-group py-1">
                    <label htmlFor="password">Password*</label>
                    <input type="password" className="form-control"id="password"/>
                </div>

                <button type="button" onClick={handleRegister} className="btn btn-dark btn-lg mt-3" >
                    გაგზავნა
                </button>
            </form>
        </div>
    );
}