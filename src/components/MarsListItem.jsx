import React, { PropTypes } from 'react';


// extract rendering from MarsListItem;
// see: http://survivejs.com/react/getting-started/editing-notes/#extracting-rendering-from-note-
export default ({children, ...props}) => (
  <div {...props}>
    {children}
  </div>
);
