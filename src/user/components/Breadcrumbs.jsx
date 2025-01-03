import React from "react";
import { Link } from "react-router-dom";

const Breadcrumbs = ({ lists = [] }) => {
  return (
    <div className="text-sm breadcrumbs my-5">
      <ul>
        {lists.map((list, index) => {
          return (
            <li key={`lists-${index}`}>
              {index == lists.length - 1 ? (
                <p className="font-bold tracking-wide">{list.text}</p>
              ) : (
                <Link to={list.goto}><p className="tracking-wide">{list.text}</p></Link>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Breadcrumbs;
