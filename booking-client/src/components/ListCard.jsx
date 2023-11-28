import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card } from "semantic-ui-react";

const ListCard = (props) => {
  const { listItem, ob, endpoint } = props;
  const items = listItem.map((_addr) => {
    return {
      header: _addr,
      description: <Link to={`/${endpoint}/${_addr}`}>Xem {ob}</Link>,
      fluid: true,
    };
  });
  return <div>{listItem.length > 0 ? <Card.Group items={items} /> : ""}</div>;
};

ListCard.propTypes = {
  listItem: PropTypes.array,
  endpoint: PropTypes.string,
  ob: PropTypes.string,
};
ListCard.defaultProps = {
  listItem: [],
  endpoint: "",
  ob: "",
};

export default ListCard;
