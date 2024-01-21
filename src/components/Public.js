import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">HD Academy!</span></h1>
            </header>
            <main className="public__main">
            <p>Located in the vibrant heart of Brossard, HD Academy is dedicated to providing top-notch basketball training with a skilled coaching staff ready to nurture the talents of aspiring athletes.</p>
                <address className="public__addr">
                <p>Join the team at HD Academy and be part of something extraordinary!</p>
                <p>As an employee, you'll play a crucial role in the development of young athletes and contribute to the success of HD Academy.</p>
                <p>See for yourself using User: test, and Password: 123</p>
                </address>
                <br />
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>

    )
    return content
}
export default Public