import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";

function DeleteButton({ index, id, onDelete }) {
  return (
    <Button
      variant="dark"
      className="btn-outline-danger fs-6"
      onClick={() => onDelete(index)}
    >
      Hapus
    </Button>
  );
}

DeleteButton.protoTypes = {
  index: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export { DeleteButton };
