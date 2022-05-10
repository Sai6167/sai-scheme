//rough work
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase  from "../firebase";
import { toast } from "react-toastify";
import "./Home.css";
import "./AddEdit.js";

const Home = () => {
  const [data, setData] = useState({});
  const [sortedData, setSortedData] = useState([]);
  const [sort, setSort] = useState(false);
  const [cityID, setcityID] = useState({});

  let sno = 0;

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
  }, []);

  const onDelete = (state, id) => {
    if (
      window.confirm("Are you sure that you wanted to delete that Scheme ?")
    ) {
      firebase.child(`schemes/${state}/${id}`).remove((err) => {
        if (err) {
          toast.error(err);
        } else {
          toast.success("Scheme Deleted Successfully");
        }
      });
    }
  };

  const handleChange = (e) => {
    setSort(true);
    firebase
      .child("schemes")
      .orderByChild(`${e.target.value}`)
      .on("value",(snapshot) => {
        let sortedData =[];
        snapshot.forEach((snap) => {
          sortedData.push(snap.val());
        });
        setSortedData(sortedData);
      });
  };  
  const handleReset = () => {
    setSort(false);
    firebase.child("schemes").on("value", (snapshot) => {
      if (snapshot.val() !== null) {
        setData({ ...snapshot.val() });
      } else {
        setData({});
      }
    });
  }; 
  
  const filterData = (value) => {
    firebase
      .child("schemes")
      .orderByChild("status")
      .equalTo(value)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          setData(data);
        }
      });
  };

  
  const filterData2 = (value) => {
    firebase
      .child("schemes")
      .orderByChild("sstate")
      .equalTo(value)
      .on("value", (snapshot) => {
        if (snapshot.val()) {
          const data = snapshot.val();
          setData(data);
        }
      });
  };

  return (
   

    <div style={{ marginTop: "100px" }}>
       
      {/* <label>Select State: </label>
        <select className="dropdown" name="colValue" onChange={(e) => filterData(e.target.value)}>
          <option>Please Select</option>
          <option value="TN" >TamilNadu</option>
          <option value="KL" >Kerala</option>
          <option value="AP" >Andhra</option>
          <option value="KT" >Karnataka</option>
        </select>  */}
        
    
    
    
      <label>Sort By: </label>
        <select className="dropdown" name="colValue" onChange={handleChange}>
            <option>Please Select</option>
            <option value="sname">Scheme Name</option>
            <option value="sbenefit">Scheme Benefit</option>
            <option value="seligible">Eligible Criteria</option>
            <option value="sstate">State</option>
            
        </select>
      <button className="bttn btn-reset" onClick={handleReset}>Reset</button>
      <br></br><br />
      <label>Status: </label>
      <button className="btn btn-active" onClick={() => filterData("Active")}>Active</button>
      <button className="btn btn-inactive" onClick={() => filterData("Inactive")}>Inactive</button>
      <br />
      <br></br>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No</th>
            <th style={{ textAlign: "center" }}>Scheme Name</th>
            <th style={{ textAlign: "center" }}>Scheme Benefit</th>
            <th style={{ textAlign: "center" }}>Scheme Eligible</th>
            <th style={{ textAlign: "center" }}>Scheme Details</th>
            <th style={{ textAlign: "center" }}>Scheme Documents</th>
            <th style={{ textAlign: "center" }}>State</th>
            <th style={{ textAlign: "center" }}>Status</th>
            <th style={{ textAlign: "center" }}>Action</th>
            {/*/{!sort && <th style={{ textAlign: "center" }}>Action</th> }*/} 
          </tr>
        </thead>
        {!sort && (
          <tbody>
            {Object.keys(data).map((id, index) => {
              const state = data[id];
              return (
                Object.keys(state).map(item => {
                  sno++;
                  return (
                    <tr key={index}>
                      <th scope="row">{sno}</th>
                      <td>{state[item].sname}</td>
                      <td>{state[item].sbenefit}</td>
                      <td>{state[item].seligible}</td>
                      <td>{state[item].sdetail}</td>
                      <td>{state[item].sdocs}</td>
                      <td>{state[item].city}</td>
                      <td>{state[item].status}</td>
                      <td>
                        <Link to={`/update/${id}/${item}`}>  {/* /update/state/id */}
                          <button className="bttn btn-edit">Edit</button>
                        </Link>

                        <button className="bttn btn-delete" onClick={() => onDelete(id, item)}>Delete</button>  {/* onDelete(state/id) */}
                        
                        <Link to={`/view/${id}/${item}`}>
                          <button className="bttn btn-reset">View</button>
                        </Link>
                      </td>
                    </tr>
                  )
                })
              );
            })}
          </tbody>
        )}
        {sort && (
          <tbody>
            {sortedData.map((item, index) => {
              return(
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{item.sname}</td>
                  <td>{item.sbenefit}</td>
                  <td>{item.seligible}</td>
                  <td>{item.sdetail}</td>
                  <td>{item.sdocs}</td>
                  <td>{item.city}</td>
                  <td>{item.status}</td>

                <td>
                    <Link to={`/update/${index}`}>
                      <button className="bttn btn-edit">Edit</button>
                    </Link>

               <button className="bttn btn-delete" onClick={() => onDelete(index)}>Delete</button>
                    
                    <Link to={`/view/${index}`}>
                      <button className="bttn btn-reset">View</button>
                    </Link>
                  </td>              
                </tr>
              );           
            })}
          </tbody>
        )}
        <br />
      </table>
    
    </div>
    
  );
};

export default Home;

