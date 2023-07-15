import React, { useContext, useRef, useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { UserContext } from "../context/UserContext";

const CommentModal = ({ showModal, onCloseModal, selectedGunpla }) => {
  if (!selectedGunpla) {
    return null;
  }
  const { user } = useContext(UserContext);
  const formRef = useRef(null);
  const [comments, setComments] = useState([]);
  console.log(comments);

  useEffect(() => {
    fetch(`https://gunpla-pal.onrender.com/comments/${selectedGunpla.id}`)
      .then((response) => response.json())
      .then((data) => {
        setComments(data.comments);
      });
  }, [selectedGunpla]);

  const closeModal = () => {
    onCloseModal();
  };

  const initialValues = {
    comment: "",
  };

  const validationSchema = Yup.object({
    comment: Yup.string().required("Comment is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const commentData = {
      values: {
        comment: values.comment,
      },
      gunpla_id: selectedGunpla.id,
    };

    fetch(`https://gunpla-pal.onrender.com/comments/add`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(commentData),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        const newComment = data;
        setComments((prevComments) => [...prevComments, newComment]);
        resetForm();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Modal
      show={showModal}
      onHide={closeModal}
      className="comment-modal"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>Comments</Modal.Title>
      </Modal.Header>
      <Modal.Body className="comment-body">
        {comments.map((comment) => (
          <>
            <div key={comment.id}>
              <p className="comment-username">
                {comment.user && comment.user.username}:
              </p>
              <p className="comment-text">{comment.text}</p>
            </div>
            <hr />
          </>
        ))}
      </Modal.Body>
      <Modal.Footer>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          innerRef={formRef}
        >
          <Form>
            <div className="d-flex align-items-center">
              <Field
                className="comment-input mr-3"
                type="text"
                name="comment"
                placeholder="Enter your comment..."
              />
              <Button
                variant="primary"
                type="submit"
                className="comment-button"
              >
                Post
              </Button>
            </div>
          </Form>
        </Formik>
      </Modal.Footer>
    </Modal>
  );
};

export default CommentModal;
