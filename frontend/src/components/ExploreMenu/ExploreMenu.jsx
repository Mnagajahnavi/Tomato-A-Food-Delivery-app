import React from 'react'
import './ExploreMenu.css'
import {menu_list} from '../../assets/assets'
const ExploreMenu = ({category,setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore Our Menu</h1>
      <p className='explore-menu-text'>Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and elevate your dining experience, one delecious meal at a time.
      </p>
      <div className='explore-menu-list'>
        {menu_list.map((item, index) => (
            <div onClick={() => setCategory(prev=>prev===item.menu_name?"all":item.menu_name)} className='explore-menu-list-item' key={index}>
                <img className={category===item.menu_name?"active":""} src={item.menu_image} alt={item.name} />
                <h3>{item.menu_name}</h3>
            </div>
          )
        )}
      </div>
      <hr/>
    </div>
  )
}

export default ExploreMenu
