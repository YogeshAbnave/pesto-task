// src/components/UserProfile.js
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const UserProfile = ({ userDetails, onUpdateUser }) => {
  const [show, setShow] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...userDetails });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    setEditedUser({ ...editedUser, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = () => {
    onUpdateUser(editedUser);
    handleClose();
  };

  const defaultProfileImage = 'https://i.ibb.co/HFM2JnS/DSC0727.jpg'; // Replace with your sample image URL

  return (
    <>
      <div className="header-bar">
        <div className="user-profile" onClick={handleShow}>
          {/* Display user's profile picture or default image */}
          {userDetails.profilePicture ? (
            <img
              src={userDetails.profilePicture}
              alt="Profile"
              className="user-profile-image"
            />
          ) : (
            <span
              className="user-profile-default-image"
              style={{
                backgroundImage: `url(${defaultProfileImage})`,
                backgroundSize: 'cover',
              }}
            >
            </span>
          )}
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="name">
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={editedUser.name}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={editedUser.email}
                onChange={handleInputChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="address">
              <Form.Label>Address:</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={editedUser.address}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateUser}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserProfile;
