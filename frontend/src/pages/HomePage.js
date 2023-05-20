import ProductCarouselComponent from "../components/ProductCarouselComponent";
import { Row, Container,Card,Button} from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from "../redux/actions/categoryActions";
import { useEffect,useState } from "react";
import { getBestsellersProducts } from "../utils/utils";

const HomePage = () => {
  
  const { categories } = useSelector((state) => state.categories);
  const [bestSellers, setBestsellers] = useState([]);
  const [error, setError] = useState('');

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories());
    getBestsellersProducts()
    .then((data) => {
      setBestsellers(data);
    })
    .catch((er) => {
        setError(er.response.data.message ? er.response.data.message : er.response.data)
       console.log(er.response.data.message ? er.response.data.message : er.response.data) 
    });
  }, [dispatch])

  return (
    <>
      <ProductCarouselComponent bestSellers={bestSellers} />
      <div className="text-center mt-5">
          <LinkContainer to="/product-list">
          <Button variant="danger" className="w-50">Vidi sve proizvode</Button>
          </LinkContainer>
        </div>
      <Container>
        <Row xs={1} md={2} className="g-4 mt-5">
          {categories.map((category, idx) => (
            <Card>
            <Card.Img variant="top" src= {'/images/' + category.naziv_kategorije.split(' ')[1]+'.jpg'}  />
            <Card.Body>
              <Card.Title>{category.naziv_kategorije}</Card.Title>
              <Card.Text>
              {category.opis_kategorije}
              </Card.Text>
              <LinkContainer to={`/product-list/${category.naziv_kategorije}`}>
                <Button variant="primary">Vidi ponudu</Button>
              </LinkContainer>
            </Card.Body>
          </Card>
          ))}
        </Row>

      </Container>
    </>
  );
};

export default HomePage;
