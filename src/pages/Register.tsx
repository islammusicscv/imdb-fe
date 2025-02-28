
const Register = () => {
    return (
        <>
            <div className="container">
                <h2>Registracija</h2>
                <form>
                    <div className="form-floating">
                        <input type="text" className="form-control" placeholder="Vstavi ime"
                               id="firstNameInput"/>
                        <label htmlFor="firstNameInput">Ime</label>
                    </div>
                    <div className="form-floating">
                        <input type="text" className="form-control" placeholder="Vstavi priimek"
                               id="lastNameInput"/>
                        <label htmlFor="lastNameInput">Priimek</label>
                    </div>
                    <div className="form-floating">
                        <input type="email" className="form-control" placeholder="Vstavi e-pošto"
                               id="emailInput"/>
                        <label htmlFor="emailInput">E-Pošta</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" placeholder="Vstavi geslo"
                               id="passwordInput"/>
                        <label htmlFor="passwordInput">Geslo</label>
                    </div>
                    <div className="form-floating">
                        <input type="password" className="form-control" placeholder="Ponovi geslo"
                               id="password2Input"/>
                        <label htmlFor="password2Input">Geslo 2x</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Registriraj</button>
                </form>
            </div>
        </>
    )
}
export default Register;