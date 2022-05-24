//rough work
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import firebase from "../firebase";
import { toast } from "react-toastify";
import "./AddEdit.css";

const initialState = {
  sname: "",
  sbenefit: "",
  seligible: "",
  sdetail: "",
  sdocs: "",
  city: "",
  status: "",
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const [cityID, setcityID] = useState({});
  const { sname, sbenefit, seligible, sdetail, sdocs, city, status } = state;

  const navigate = useNavigate();

  const { region, id } = useParams();

  useEffect(() => {
    firebase.child(`schemes/${region}`).on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, [id, region]);

  useEffect(() => {
    if (id) {
      setState({ ...data[id] });
    } else {
      setState({ ...initialState });
    }

    return () => {
      setState({ ...initialState });
    };
  }, [id, data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
    console.log(state);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !sname ||
      !sbenefit ||
      !seligible ||
      !sdetail ||
      !sdocs ||
      !status ||
      !city
    ) {
      toast.error("Please provide value into each input field");
    } else {
      if (!id) {
        firebase.child(`schemes/${cityID}`).push(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Scheme Added Successfully");
          }
        });
      } else {
        firebase.child(`schemes/${region}/${id}`).set(state, (err) => {
          if (err) {
            toast.error(err);
          } else {
            toast.success("Scheme Updated Successfully");
          }
        });
      }
      setTimeout(() => navigate("/"), 500);
    }
  };

  function selectStateHandler(event) {
    setcityID(event.target.value);
    setState({ ...state, [event.target.name]: event.target.value });
  }

  return (
    <div className="form-div">
      <form
        // style={{
        //   margin: "auto",
        //   padding: "15px",
        //   maxWidth: "400px",
        //   alignContent: "center",
        // }}
        onSubmit={handleSubmit}
      >
        <div className="row">
          <div className="row-item">
            <label htmlFor="city">State</label>
            <input
              type="text"
              id="city"
              name="city"
              placeholder="State "
              value={city || ""}
              onChange={selectStateHandler}
            />
          </div>
          {/* <label>State: </label>
          <select className="stateDropdown" id="city" name="city" onChange={selectStateHandler}>
            <option>Select state</option>
            <option value="tn">Tamil Nadu</option>
            <option value="kl">Kerala</option>
            <option value="ka">Karnataka</option>
            <option value="ap">Andhra Pradesh</option>
          </select> */}

          {/* <br></br> */}
          <div className="row-item">
            <label htmlFor="seligible">Eligibility Criteria</label>
            <input
              type="text"
              id="seligible"
              name="seligible"
              placeholder="Enter Eligibility"
              value={seligible || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="row-item">
            <label htmlFor="sname">Scheme Name</label>
            <input
              type="text"
              id="sname"
              name="sname"
              placeholder="Enter Scheme Name"
              value={sname || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="row-item">
            <label htmlFor="sbenefit">Scheme Benefit</label>
            <input
              type="text"
              id="sbenefit"
              name="sbenefit"
              placeholder="Enter Benefit"
              value={sbenefit || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="row-item">
            <label htmlFor="sdocs">Documents required</label>
            <input
              type="text"
              id="sdocs"
              name="sdocs"
              placeholder="Documents "
              value={sdocs || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="row-item">
            <label htmlFor="status">Status</label>
            <input
              type="text"
              id="status"
              name="status"
              placeholder="Your Status..."
              value={status || ""}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <label htmlFor="sdetail">Scheme Details</label>
        <textarea
          type="text"
          id="sdetail"
          name="sdetail"
          placeholder="Enter Detail"
          value={sdetail || ""}
          onChange={handleInputChange}
          rows="4"
          cols="50"
        />
        <input type="submit" value={id ? "Update" : "Save"} />
      </form>
    </div>
  );
};

export default AddEdit;
