import React from 'react';
import classes from './Layout.module.scss';

function Layout({ children }) {
  // Render the children components inside a main container
  return (
    <main className={classes.container}>{children}</main>
  );
}

export default Layout;
