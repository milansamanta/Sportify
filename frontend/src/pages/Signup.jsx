import './Signup.css'

export default function Signup(){
    return (
        <div className="container-fluid pt-5">
            <section className="d-flex flex-column justify-content-center align-items-center gap-3 mx-auto form-hero">
            <h1 className="mx-auto">Signup to Begin</h1>
            <div className="container-fluid mx-5 px-5">
            <form className="d-flex flex-column mx-5" action="/signup" method="POST">
                <input className="form-control mb-2" name="email" type="email" placeholder="Email" required />
                <input className="form-control mb-2" name="password" type="password" placeholder="Password" required />
                <input className="form-control mb-2" name="confirmPassword" type="password" placeholder="Confirm Password" required />
                <button className="btn btn-success mb-2" type="submit">Send OTP</button>
                <button hidden className="btn btn-primary" type="submit">Signup</button>
            </form>
            </div>
            </section>
        </div>
    );
}