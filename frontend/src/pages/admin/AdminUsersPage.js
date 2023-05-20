import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../components/admin/AdminLinksComponent";
import { deleteUser, getUsers } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import { USER_DETAILS_RESET } from "../../redux/constants/userConstants";


const AdminUsersPage = () => {

  const usersList = useSelector((state) => state.users)
  const { loading, error, users } = usersList  
  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete
  const dispatch = useDispatch();

  const deleteHandler = async (id) => {
    if (window.confirm("Da li ste sigurni da zelite da obrisete korisnika?")) {
         dispatch(deleteUser(id))
    }
  };

  useEffect(() => {
    dispatch(getUsers())
    dispatch({type:USER_DETAILS_RESET})
  }, [dispatch,successDelete])


  return (

    <Row className="m-5">
    <Col md={2}>
    <AdminLinksComponent />
    </Col>
    <Col md={10}>

    
      {loading ? (
          <h2>Učitavanje korisnika ...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <>
        <h1>Spisak korisnika</h1>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>#</th>
              <th>Ime</th>
              <th>Prezime</th>
              <th>E-mail</th>
              <th>Admin</th>
              <th>Izmeni/Obriši</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{user.ime}</td>
                  <td>{user.prezime}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isAdmin ? <i className="bi bi-check-lg text-success"></i> : <i className="bi bi-x-lg text-danger"></i>}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/edit-user/${user._id}`}>
                      <Button className="btn-sm">
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                    </LinkContainer>
                    {" / "}
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className="bi bi-x-circle"></i>
                    </Button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </Table>
        </>
         )}
      </Col>
       
    </Row>
  );
};

export default AdminUsersPage;

