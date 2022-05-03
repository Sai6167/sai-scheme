import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import  firebase from "../firebase";
import { toast } from "react-toastify";
import "./AddEdit.css";

const initialState = {
  sname: "",
  sbenefit: "",
  seligible: "",
  sdetail: "",
  sdocs: "",
  sstate:"",
  status: ""
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});

  const { sname, sbenefit, seligible, sdetail, sdocs, sstate, status } = state;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    firebase.child("schemes").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });

    return () => {
      setData({});
    };
  }, [id]);

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
  };

  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sname || !sbenefit || !seligible || !sdetail || !sdocs || !sstate || !status) {
      toast.error("Please provide value into each input field");
    } else {
      if (!id) {
        firebase.child("schemes").push(state, (err) => {
          console.log("state", state);
          if (err) {
            toast.error(err);
          } else {
            toast.success("Scheme Added Successfully");
          }
        });
      } else {
        firebase.child(`schemes/${id}`).set(state, (err) => {
          console.log("state", state);
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
  return (
    <div style={{ marginTop: "100px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        {/* <label htmlFor="sstate">State</label>
        <input
          type="text"
          id="sstate"
          name="sstate"
          placeholder="State "
          value={sstate || ""}
          onChange={handleInputChange}
        /> */}
        
        <label>state: </label>
          <select className="dropdown" name="colValue" >
            <option>Select state</option>
            <option value="tn">TamilNadu</option>
            <option value="kl">Kerala</option>
            <option value="ka">Karnataka</option>
            <option value="ap">Andhra Pradesh</option>
          </select>

          <br></br>


        <label htmlFor="sname">Scheme Name</label>
        <input
          type="text"
          id="sname"
          name="sname"
          placeholder="Enter Scheme Name"
          value={sname || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="sbenefit">Scheme Benefit</label>
        <input
          type="text"
          id="sbenefit"
          name="sbenefit"
          placeholder="Enter Benefit"
          value={sbenefit || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="seligible">Eligible Criteria</label>
        <input
          type="text"
          id="seligible"
          name="seligible"
          placeholder="Enter Eligibility"
          value={seligible || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="sdetail">Scheme Details</label>
        <input
          type="text"
          id="sdetail"
          name="sdetail"
          placeholder="Enter Detail"
          value={sdetail || ""}
          onChange={handleInputChange}
        />
        <label htmlFor="sdocs">Documents required</label>
        <input
          type="text"
          id="sdocs"
          name="sdocs"
          placeholder="Documents "
          value={sdocs || ""}
          onChange={handleInputChange}
        />
        
        <label htmlFor="status">Status</label>
        <input
          type="text"
          id="status"
          name="status"
          placeholder="Your Status..."
          value={status || ""}
          onChange={handleInputChange}
        />
        <input type="submit" value={id ? "Update" : "Save"} />
      </form>
    </div>
  );
};

export default AddEdit;