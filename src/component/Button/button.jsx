import './button.scss'

const Button = ({ children }) => {
    return (
        <button className="button main-background">{children}</button>
    )
}
export default Button;