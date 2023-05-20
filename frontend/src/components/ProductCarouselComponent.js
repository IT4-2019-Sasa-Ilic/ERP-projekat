import { Carousel } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const ProductCarouselComponent = ({ bestSellers }) => {
  const cursorP = {
    cursor: "pointer",
    color: "orange"
  };
  const carouselStyle = {
    backgroundColor: "#F7F1E5"
  };
  return bestSellers.length > 0 ? (
    <Carousel style={carouselStyle}>
      {bestSellers.map((item, idx) => (
        <Carousel.Item key={idx}>
          <img
            crossOrigin="anonymous"
            className="d-block w-100"
            style={{ height: "450px", objectFit: "contain" }}
            src={item.slike ? item.slike[0].url : null}
            alt="First slide"
          />
          <Carousel.Caption>
            <LinkContainer style={cursorP} to={`/product-details/${item._id}`}>
            <h2 style={{ color: "black" }}>{item.naziv_proizvoda}</h2>
            </LinkContainer>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  ) : null;
};
export default ProductCarouselComponent;
