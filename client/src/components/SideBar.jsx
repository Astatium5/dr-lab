import '../scss/sidebar.scss';
import React from 'react';
import PropTypes from 'prop-types';

function SideBar({ children }) {
  return (
    <div className="sidebar">
      {children}
    </div>
  );
}

SideBar.propTypes = {
  children: PropTypes.node,
};

SideBar.defaultProps = {
  children: null,
};

export default SideBar;
