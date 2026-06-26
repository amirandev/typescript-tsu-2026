import { useState } from "react"
import { API_BASEURL } from "../../partials/config";


/*
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "password_confirmation": "password123"
}
*/

export default function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [password_confirmation, setPasswordRepeat] = useState("");
    const [alertStatus, setStatus] = useState(false);

    const [alertMessage, setAlertMessage] = useState("")

    async function handleSignUp() {

        const run = await fetch(`${API_BASEURL}/register`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                password_confirmation: password_confirmation
            })
        });

        const data = await run.json();

        if (!run.ok) {
            setStatus(false);
            setAlertMessage(data.message)
            return false;
        }

        // success
        setStatus(true);
        setAlertMessage(data.message)
        localStorage.setItem('token', data.token)

        console.log(data);
    }

    return <div>
        <h1>Registration</h1>
        {
            alertMessage && (<div className={`alert alert-${alertStatus ? 'success' : 'danger'}`}>{alertMessage}</div>)
        }   
        <div>
            <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" name="name" placeholder="Username..." />
            <input type="email" onChange={(event) => setEmail(event.target.value)} className="form-control mt-4" name="email" placeholder="Email..." />
            <input type="password" onChange={(event) => setPassword(event.target.value)} className="form-control mt-4" name="password" placeholder="Password..." />
            <input type="password" onChange={(event) => setPasswordRepeat(event.target.value)} className="form-control my-4" name="password_confirmation" placeholder="Repeat password..." />
            <button type="button" onClick={handleSignUp}>Register</button>
        </div>
    </div>
}


