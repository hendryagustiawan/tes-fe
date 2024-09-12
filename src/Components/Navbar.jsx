import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container">
          <Link to={"/"} style={{ textDecoration: "none" }}>
            <a className="navbar-brand fw-bold text-white" href="#">
              TODO
            </a>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={"/login"} style={{ textDecoration: "none" }}>
                  <a className="nav-link fw-semibold text-white" aria-current="page">
                    Login
                  </a>
                </Link>
              </li>
              <li className="nav-item ">
                <Link to={"#"} style={{ textDecoration: "none" }}>
                  <a className="nav-link fw-semibold text-white" href="#">
                    Home
                  </a>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
