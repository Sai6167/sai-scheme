import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { useParams, Link } from "react-router-dom";

import "./View.css";

const View = () => {
  const [user, setUser] = useState({});

  const { region, id } = useParams();

  //const [cityID, setcityID] = useState({});

  useEffect(() => {
    firebase
      .child(`schemes/${region}/${id}`)
      .get()
      .then((snapshot) => {
        if (snapshot.exists()) {
          setUser({ ...snapshot.val() });
        } else {
          setUser({});
        }
      });
  }, [id]);

  return (
    <div style={{ marginTop: "25px" }}>
      <div className="card">
        <div className="card-header">
          <p>Scheme Info </p>
        </div>
        <div className="container">
          <strong>Scheme ID </strong>
          <span>{id}</span>
          <br />
          <br />
          <strong>Scheme Name </strong>
          <span>{user.sname}</span>
          <br />
          <br />
          <strong>Scheme Benefit </strong>
          <span>{user.sbenefit}</span>
          <br />
          <br />
          <strong>Scheme Eligibilit </strong>
          <span>{user.seligible}</span>
          <br />
          <br />
          <strong>Scheme Detail </strong>
          <span>{user.sdetail}</span>
          <br />
          <br />
          <strong>Scheme Documents </strong>
          <span>{user.sdocs}</span>
          <br />
          <br />
          <strong>State </strong>
          <span>{user.city}</span>
          <br />
          <br />
          <strong>Scheme Status </strong>
          <span>{user.status}</span>
          <br />
          <br />
          <Link to="/">
            <button className="bttn btn-edit">{"<"} Back</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default View;
