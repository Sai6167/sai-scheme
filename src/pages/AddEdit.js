//rough work
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
  city:"",
  status: "",
  dept:""
};

const AddEdit = () => {
  const [state, setState] = useState(initialState);
  const [data, setData] = useState({});
  const [cityID, setcityID] = useState({});
  const { sname, sbenefit, seligible, sdetail, sdocs, city, status, dept } = state;

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
    console.log(state)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!sname || !sbenefit || !seligible || !sdetail || !sdocs || !status || !city || !dept) {
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
    setcityID(event.target.value)
    setState({ ...state, [event.target.name]: event.target.value });
  }

  return (
    <div style={{ marginTop: "30px" }}>
      <form
        style={{
          margin: "auto",
          padding: "15px",          
          maxWidth: "400px",
          alignContent: "center",
        }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="city">State</label>
        <input
          type="text"
          id="city"
          name="city"
          placeholder="State "
          value={city || ""}
          onChange={selectStateHandler}
        />
        
        <label htmlFor="dept">Department: </label>
          <select className="DeptDropdown" id="dept" name="dept" value={dept || ""} onChange={handleInputChange}>
            <option value="Public Department">Select Dept</option>
            <option value="Education Department">Education</option>                       
            <option value="Agriculture and Farmer Welfare Department">Agriculture</option> 
            <option value="Welfare of Differently Abled Persons">Disabled</option>
            <option value="Department of Ex-Servicemen Welfare">ESM</option>
            <option value="Social Welfare and Women Empowerment">Social / Women / Widow</option>            
            <option value="Tribal Welfare and Rural Development">Tribal / Rural</option>
            <option value="Minorities Welfare Department">Minority / Caste</option>
            <option value="Labour Welfare and Skill Development">Labour / Skill</option>
            
          </select>

          <br></br>
        
        <label htmlFor="seligible">Eligible Criteria</label>
        <input
          type="text"
          id="seligible"
          name="seligible"
          placeholder="Enter Eligibility"
          value={seligible || ""}
          onChange={handleInputChange}
        />

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