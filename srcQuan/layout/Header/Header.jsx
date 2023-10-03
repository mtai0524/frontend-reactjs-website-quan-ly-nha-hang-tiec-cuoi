
import './Header.scss'
import { useState } from "react";
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from "react-scroll";



const Header = () => {

    const initalLink = [
        {
            title: "Home",
            active: true
        },

        {
            title: "Branch",
            active: false
        },
        {
            title: "Hall",
            active: false
        },
        {
            title: "Menu",
            active: false
        },
        {
            title: "Service",
            active: false
        },
        {
            title: "Contact",
            active: false
        }

    ]
    const [link, setLinks] = useState(initalLink)

    const activeLinks = (event) => {
        const title = event.currentTarget.textContent.trim();
        const newLinks = link.map(item => {
            if (item.title === title) {
                item.active = true;
            }
            else {
                item.active = false
            }

            return item;
        })
        setLinks(newLinks);
    }
    return (
        <div className="nav">
            <div className="nav__container container">
                <Link to="/" className="nav__logo text-gradient">Food.</Link>
                <ul className="nav__links">
                    {
                        link.map(item => {
                            return <li key={item.title}>
                                <ScrollLink className='nav-link text-black' activeClass="active" onClick={event => { activeLinks(event) }} to={item.title.toLowerCase()} spy={true} smooth={true} offset={-50} duration={500} delay={1}>

                                    {item.title}
                                </ScrollLink>
                                {
                                    item.active && <span></span>
                                }
                            </li>
                        })

                    }
                    <li><Link className='nav-link text-black' to="/login" >Đăng Nhập</Link></li>
                </ul>
            </div>

        </div>


    )
}
export default Header;