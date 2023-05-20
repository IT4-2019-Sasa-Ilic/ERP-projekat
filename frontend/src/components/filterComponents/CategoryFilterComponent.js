import { Form } from "react-bootstrap";
import React, {useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from "../../redux/actions/categoryActions";
const CategoryFilterComponent = ({ setCategoriesFromFilter,categoryChecked={} }) => {
  
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch()

  const selectCategory = (e, category, idx) => {
    setCategoriesFromFilter((items) => {
      return { ...items, [category.naziv_kategorije]: e.target.checked };
    });
  }
  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])
    return (
      <>
        <span className="fw-bold">Kategorija</span>
        <Form>
          {categories.map((category, idx) => (
            <div key={idx}>
              <Form.Check type="checkbox" id={`check-api2-${idx}`}>
                <Form.Check.Input
                  type="checkbox"
                  defaultChecked={category.naziv_kategorije==Object.keys(categoryChecked)[0]? true:false}
                  isValid
                  onChange={(e) => selectCategory(e, category, idx)}
                />
                <Form.Check.Label style={{ cursor: "pointer" }}>
                  {category.naziv_kategorije}
                </Form.Check.Label>
              </Form.Check>
            </div>
          ))}
        </Form>
      </>
    );
};

export default CategoryFilterComponent;

