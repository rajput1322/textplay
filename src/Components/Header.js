/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import PropTypes from "prop-types";

export default function Header(props) {
    return (
        <nav
            className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode} border-bottom rounded`}
        >
            <div className="container-fluid">
                <a
                    className="navbar-brand mx-1"
                    href="/"
                >
                    <h5>{props.title}</h5>
                </a>
                <div
                    className="collapse navbar-collapse"
                    id="navbarSupportedContent"
                >
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a
                                className="nav-link active"
                                aria-current="page"
                                href="/"
                            >
                                Text at your fingertips
                            </a>
                        </li>
                    </ul>
                    <div
                        className={`form-check form-switch text-${
                            props.mode === "dark" ? "light" : "dark"
                        } mx-3`}
                    >
                        <label
                            className="form-check-label"
                            htmlFor="flexSwitchCheckDefault"
                        >
                            {props.mode[0].toUpperCase() +
                                props.mode.slice(1).toLowerCase()}{" "}
                            Mode
                        </label>
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            onClick={props.toggleMode}
                        />
                    </div>
                    <form
                        className="d-flex"
                        role="search"
                    >
                        <input
                            className={`form-control ${
                                props.mode === "light"
                                    ? ""
                                    : "bg-dark text-warning"
                            }`}
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                        />
                        <button
                            className={`btn btn-outline-${
                                props.mode === "light" ? "success" : "warning"
                            }`}
                            type="submit"
                        >
                            Search
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
};

Header.defaultProps = {
    title: "title here",
    about: "about",
};
