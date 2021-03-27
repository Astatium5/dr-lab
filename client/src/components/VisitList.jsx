import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'antd';

function VisitList({ visits }) {
  return (
    <List
      data={visits}
      header={<div>Visits</div>}
      renderItem={(item) => (
        <List.Item>
          {item}
        </List.Item>
      )}
    />
  );
}

VisitList.propTypes = {
  visits: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default VisitList;
