import { Form } from "react-bootstrap";

const SortOptionsComponent = ({setSortOption}) => {
  return (
    <Form.Select onChange={(e)=>setSortOption(e.target.value)} aria-label="Default select example">
      <option value="">Sortiranje prema</option>
      <option value="cena 1">Ceni: Od najnize do najvise</option>
      <option value="cena -1">Ceni: Od najvise do najnize</option>
      <option value="rejting -1">Oceni korisnika</option>
      <option value="naziv_proizvoda 1">Nazivu A-Z</option>
      <option value="naziv_proizvoda -1">Nazivu Z-A</option>
    </Form.Select>
  );
};

export default SortOptionsComponent;

