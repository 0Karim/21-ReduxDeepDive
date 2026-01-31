import { useDispatch, useSelector } from 'react-redux';
import classes from './CartButton.module.css';
import { uiActions } from '../../store/ui-slice.js';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalItems = useSelector(state => state.cart.items.length);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  const handleClick = () => {
    dispatch(uiActions.toggle());
  }

  return (
    <button className={classes.button} onClick={handleClick}>
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
