import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Button, Table } from "react-bootstrap";

import Message from "../component/Alert/Message";
import Loader from "../component/spinner/Loader";

import { UserListAsync, DeleteUserAsync } from "../redux/user/user.action";

const UserListScreen = ({ history }) => {
  const dispatch = useDispatch();
  const { loading, error, users } = useSelector((state) => state.userList);
  const { user } = useSelector((state) => state.user);

  const {
    loading: deleteLoading,
    error: deleteError,
    success,
  } = useSelector((state) => state.userDelete);

  useEffect(() => {
    if (user && user.isAdmin) {
      dispatch(UserListAsync());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, success, user]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(DeleteUserAsync(id));
    }
  };

  return (
    <>
      <h1>Users</h1>
      {loading || deleteLoading ? (
        <Loader />
      ) : error || deleteError ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <Table striped bordered hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <i className="fas fa-check" style={{ color: "green" }} />
                  ) : (
                    <i className="fas fa-times" styles={{ color: "red" }} />
                  )}
                </td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant="light" className="btn-sm">
                      <i className="fas fa-edit" />
                    </Button>
                  </LinkContainer>
                  <Button
                    variant="danger"
                    className="btn-sm"
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className="fas fa-trash" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default UserListScreen;
