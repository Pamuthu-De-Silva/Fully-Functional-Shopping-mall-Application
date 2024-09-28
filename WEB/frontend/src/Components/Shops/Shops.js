// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
// import axios from 'axios';
// import AfterNav from '../Home/NavBar/AfterNav';
// import Footer from '../Home/HomePages/Footer';

// const Shops = () => {
//   const [sellers, setSellers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();  // Hook to handle navigation

//   useEffect(() => {
//     axios.get('http://localhost:8081/sellers')
//       .then(response => {
//         setSellers(response.data);
//         setLoading(false);
//       })
//       .catch(error => {
//         console.error('There was an error fetching the sellers!', error);
//         setError('There was an error fetching the sellers!');
//         setLoading(false);
//       });
//   }, []);

//   const handleShopClick = (seller) => {
//     navigate(`/seller/${seller}`);  // Navigate to the seller's products page
//   };

//   if (loading) {
//     return <p>Loading...</p>;
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>

// <AfterNav />



//       <h2>Available Shops</h2>
//       {sellers.length === 0 ? (
//         <p>No shops available at the moment.</p>
//       ) : (
//         <ul>
//           {sellers.map((seller, index) => (
//             <li key={index} onClick={() => handleShopClick(seller)} style={{ cursor: 'pointer', color: 'blue' }}>
//               {seller}
//             </li>
//           ))}
//         </ul>
//       )}

    
//       <Footer />

//     </div>








//   );
// };

// export default Shops;





import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AfterNav from '../Home/NavBar/AfterNav';
import Footer from '../Home/HomePages/Footer';
import './Shops.css';

const Shops = () => {
  const [sellers, setSellers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:8081/sellers')
      .then(response => {
        setSellers(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error('There was an error fetching the sellers!', error);
        setError('There was an error fetching the sellers!');
        setLoading(false);
      });
  }, []);

  const handleShopClick = (seller) => {
    navigate(`/seller/${seller}`);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <AfterNav />
      <div className="shops-container">
        <h2>Available Shops</h2>
        {sellers.length === 0 ? (
          <p>No shops available at the moment.</p>
        ) : (
          <div className="shop-cards">
            {sellers
              .filter(seller => seller !== null && seller !== '')  // Filter out null or empty values
              .map((seller, index) => (
                <div
                  key={index}
                  className="product_cards"
                  onClick={() => handleShopClick(seller)}
                  style={{ cursor: 'pointer' }}
                >
                  <h3>{seller}</h3>
                </div>
              ))
            }
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Shops;

