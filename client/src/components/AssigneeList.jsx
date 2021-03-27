import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, List } from 'antd';

function AssigneeList({ assignees }) {
  return (
    <List
      itemLayout="horizontal"
      header={<div>Assignees</div>}
      dataSource={assignees}
      renderItem={(assignee) => (
        <List.Item>
          <List.Item.Meta
            avatar={<Avatar src={assignee.imgURL} />}
            title={assignee.name}
            description={assignee.role}
          />
        </List.Item>
      )}
    />
  );
}

AssigneeList.propTypes = {
  assignees: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    imgURL: PropTypes.string,
    role: PropTypes.string,
  })).isRequired,
};

export default AssigneeList;
