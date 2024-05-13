import React from 'react'
import './CSS/ShopCategory.css'
import { ShopContext } from '../Context/ShopContext';
import { useContext } from 'react';
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'
import all_product from '../Components/Assets/all_product';

const ShopCategory = (props) => {
  const {all_product} = useContext(ShopContext);
  
  return (
    <div className="shopcategory">
      <img src={props.banner} className="shopcategory-banner" alt="" />
      <div className="shopcategory-indexSort">
        <p><span>Showing 1 - 12</span> out of 54 Products</p>
        <div className="shopcategory-sort">Sort by  <img src={dropdown_icon} alt="" /></div>
      </div>
      <div className="shopcategory-products">
        {all_product.map((item,i) => {
            if(props.category===item.category)
            {
              return <Item id={item.id} key={i} name={item.name} image={item.image}  new_price={item.new_price} old_price={item.old_price}/>;
            }
            else
            {
              return null;
            }
        })}
      </div>
      <div className="shopcategory-loadmore">
      {/* <Link to='/' style={{ textDecoration: 'none' }}>Explore More</Link> */}
      </div>
    </div>
  );
};

export default ShopCategory;