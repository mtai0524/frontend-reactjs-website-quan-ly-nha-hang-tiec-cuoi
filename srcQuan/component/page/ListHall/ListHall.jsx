import { useState } from 'react'

import './ListHall.scss'

const ListHall = () => {
    const initalHall = [
        {
            title: "Hall 1 ",
            img_url: require("../../../assets/assets/img_6.png"),
            desc: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        },
        {
            title: "Hall 2 ",
            img_url: require("../../../assets/assets/img_5.png"),
            desc: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        },
        {
            title: "Hall 3 ",
            img_url: require("../../../assets/assets/img_5.png"),
            desc: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        },
        {
            title: "Hall 4 ",
            img_url: require("../../../assets/assets/img_7.png"),
            desc: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        },
        {
            title: "Hall 5 ",
            img_url: require("../../../assets/assets/img_8.png"),
            desc: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
        },

    ]
    const [hall] = useState(initalHall)
    return (
        <div className='listhall' id='listhall'>
            <div className='listhall__container '>
                <ul className='listhall__list'>{
                    hall.map(item => {
                        return <li className='listhall__item' key={item.title}>
                            <div className='listhall__item--img'>
                                <img src={item.img_url} alt=""></img>
                            </div>
                            <div className='listhall__item--content'>
                                <h3>{item.title}</h3>
                                <p>{item.desc}</p>
                            </div>
                        </li>
                    })
                }</ul>
            </div>
        </div>

    )
}
export default ListHall;