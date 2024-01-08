import "./brand.css";

function Brand() {
  return (
    <>
      <div className="main container">
        <div className="maintext">
          <h1>Your Feet Deserve The Best</h1>
          <p>
            YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH OUR
            SHOES.YOUR FEET DESERVE THE BEST AND WE’RE HERE TO HELP YOU WITH OUR
            SHOES.
          </p>
          <div className="maintext-btn">
            <button id="shopNow">Shop Now</button>
            <button id="category">Category</button>
          </div>

          <div className="shopping">
            <p>Also Available on</p>
            <div className="shoppingBrands">
              <img src="./images/flipkart.png" alt="" />
              <img src="./images/amazon.png" alt="" />
            </div>
          </div>
        </div>
        <div className="mainimg">
          <img src="./images/brand.png" alt="" />
        </div>
      </div>
    </>
  );
}

export default Brand;
