import './Menu.scss'
import Button from '../Button/button'
import { BsCartCheck } from 'react-icons/bs'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Menu = () => {

    const initalFood = [
        {
            title: "gỏi ngó sen ",
            img_url: require("../../assets/assets/img_6.png"),
            desc: "Món ngon đến từ ngó sen rất đậm vị"
        },
        {
            title: "gà nướng muối ớt ",
            img_url: require("../../assets/assets/img_5.png"),
            desc: "Món gà sẽ làm bạn có trải nghiệm ngon"
        },
        {
            title: "gỏi tôm với cổ hủ dừa ",
            img_url: require("../../assets/assets/img_4.png"),
            desc: "Món ngon tươi ngọt ngon và xịn"
        }

    ]
    const [food, setFoods] = useState(initalFood)
    
    return (
        <div className='menu' id='menu'>
            <div className='menu__container container'>
                <span className='text-gradient'>__Thực Đơn__</span>
                <h1>THỰC ĐƠN ĐÁP ỨNG</h1>
                <Link to="/listmenu"><Button>Xem Danh Sách Thực Đơn</Button></Link>

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