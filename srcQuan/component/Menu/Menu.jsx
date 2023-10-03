import './Menu.scss'
import Button from '../Button/button'
import { BsCartCheck } from 'react-icons/bs'
import { useState } from 'react'

const Menu = () => {

    const initalFood = [
        {
            title: "Food 1 ",
            img_url: require("../../assets/assets/img_6.png"),
            desc: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        },
        {
            title: "Food 2 ",
            img_url: require("../../assets/assets/img_5.png"),
            desc: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        },
        {
            title: "Food 3 ",
            img_url: require("../../assets/assets/img_4.png"),
            desc: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        }

    ]
    const [food, setFoods] = useState(initalFood)
    return (
        <div className='menu' id='menu'>
            <div className='menu__container container'>
                <span className='text-gradient'>Thực Đơn</span>
                <h1>Danh Sách Thực Đơn</h1>
                <p>bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb</p>
                <li className='menu__chosselist'>
                    <Button variant="outline-primary">Sáng </Button>
                    <Button variant="outline-secondary" >Trưa</Button>
                    <Button variant="outline-success">Tối</Button>
                </li>

                <ul className='menu__list'>{
                    food.map(item => {
                        return <li className='menu__item' key={item.title}>
                            <div className='menu__item--img'>
                                <img src={item.img_url} alt=''></img>
                            </div>
                            <div className='menu__item--content'>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                                <Button><BsCartCheck />Order Here</Button>
                            </div>
                        </li>
                    })
                }</ul>
            </div>
        </div>

    )
}
export default Menu;