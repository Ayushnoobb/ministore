import React, { useEffect } from 'react';
import { useDispatch} from 'react-redux';
import { fetchProducts } from '../../assets/lib/product/productSlice';
import homeHero from "../../../public/img/home/shop-banner.jpg"

const Home = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProductData = async () => {
      await dispatch(fetchProducts());
    };

    fetchProductData();
  }, [dispatch]);


  return (
    <main id='main'>
      <section className='home'>
        <div className="container relative">
          <h2 className='heading absolute text-white w-2/4'>Relax ! <br/> We got everything . </h2>
          <div className="splash">
            <img src={homeHero} width={700} height={700} alt='home-hero' />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
