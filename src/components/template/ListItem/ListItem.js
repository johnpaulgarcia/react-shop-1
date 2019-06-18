import React from 'react';
const ListItem = ({children,height}) => {
    let style = `list-item ${height || ''}`;
    return(
        <div class={style}>
            {children}
        </div>
    );
}

export default ListItem;