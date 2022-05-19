import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate} from "react-router-dom";
import "./Header.css";

const Header = () => {
    const [activeTab, setActiveTab] = useState("Home");
    const location = useLocation();
    const [search, setSearch] = useState("");

    const navigate = useNavigate();
    
    useEffect(() => { 
        if(location.pathname === "/"){
            setActiveTab("Home")
        }else if(location.pathname === '/add'){
            setActiveTab("Add Scheme")
        }else if(location.pathname === "/about"){
            setActiveTab("About");
        }
    }, [location]);

    const handleSubmit = (e) => {
       e.preventDefault();
       navigate(`/search?name=${search}`)
       setSearch("");
    };
    return(
        <div className="header">
            <p></p>
            <p className="logo">Schemes App</p>
            
            <div className="header-right">
                {/* <form onSubmit={handleSubmit} style={{display:"inline"}}>
                    <input
                    type="text"
                    className="inputField"
                    placeholder="Search Scheme..."
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                    />
                </form> */}
                <Link to="/">
                    <p
                        className={`${activeTab === "Home" ? "active" : ""}`}
                        onClick={() => setActiveTab("Home")}
                    >
                        Home 
                    </p>
                </Link>

                <Link to="/add">
                    <p
                        className={`${activeTab === "Add Scheme" ? "active" : ""}`}
                        onClick={() => setActiveTab("Add Scheme")}
                    >
                        Add Scheme
                    </p>
                </Link>
                <p></p>
                {/* <Link to="/about">
                    <p
                        className={`${activeTab === "About" ? "active" : ""}`}
                        onClick={() => setActiveTab("About")}
                    >
                        About 
                    </p>
                </Link> */}

            </div>    
        </div>
    );
};

export default Header;