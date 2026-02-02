import { useDispatch, useSelector } from 'react-redux';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useEffect } from 'react';
import Notification from './components/UI/Notification';
import {fetchCartData, sendCartData} from './store/cart-actions';
 
let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.cartIsVisible);
  const cart = useSelector(state => state.cart);
  const notification = useSelector(state => state.ui.notification)


  /**
   * We face one problem when using useEffect the way we currently do it: It will execute when our app starts.
   * Why is this an issue?
   * It's a problem because this will send the initial (i.e. empty) cart to our backend and overwrite any data stored there.\
   * We'll fix this over the next lectures, I just wanted to point it out here!
   */


  //Version #1 Use useEffect insinde the component and make http request
  // useEffect(() => {
  //   const sendCartData = async () => {
  //     dispatch(uiActions.showNotification({
  //       status: 'pending',
  //       title: 'Sending...',
  //       message: 'Sending cart data!',
  //     }));

  //     const response = await fetch('https://react-app-1-78d61-default-rtdb.firebaseio.com/cart.json',{
  //       method:'PUT',
  //       body: JSON.stringify(cart)      
  //     });

  //     if(!response.ok){
  //       throw new Error('Sending cart data failed!');
  //     }
  //     const responseData = response.json();
  //     dispatch(uiActions.showNotification({
  //         status: 'success',
  //         title: 'Success!',
  //         message: 'Sent cart data successfully!',
  //     }));      
  //   }

  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }

  //   sendCartData().catch((error) =>{
  //     dispatch(uiActions.showNotification({
  //       status: 'error',
  //       title: 'Error!',
  //       message: 'Sending cart data failed!',        
  //     }));
  //   });

    
  // },[cart, dispatch]);

  //used to fetch data onec the application is loaded
  useEffect(() => {
    dispatch(fetchCartData())
  }, [dispatch]);

    //Version #2 Use useEffect insinde the component and 
    // move the http request to the action creator in redux toolkit
    //second pattern which depend on something called Thunk
    useEffect(() => {
    if (isInitial) {
      isInitial = false;
      return;
    }

    if (cart.changed) {
      dispatch(sendCartData(cart));
    }    

    // dispatch(sendCartData(cart))
  },[cart, dispatch]);


  return (
    <>
    {notification && <Notification status={notification.status} title={notification.title} message={notification.message} />}
    <Layout>
      {showCart && <Cart />} 
      <Products />
    </Layout>
    </>
  );
}

export default App;
