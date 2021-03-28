/* eslint-disable */
import '../scss/comments.scss';
import React, { useState } from 'react';
import {
  Form,
  Input,
  Button,
  Comment,
  Avatar,
  List,
} from 'antd';
import PropTypes from 'prop-types';

const { TextArea } = Input;

const getHeaderText = (length) => {
  switch (length) {
    case 1:
      return 'reply';
    default:
      return 'replies';
  }
};

function CommentList({ comments }) {
  return (
    <List
      dataSource={comments}
      header={`${comments.length} ${getHeaderText(comments.length)}`}
      itemLayout="horizontal"
      renderItem={(props) => (
        <Comment
        // eslint-disable-next-line react/jsx-props-no-spreading
          {...props}
          avatar={
            (
              <Avatar className="avatar">
                <span>{props.email[0]}</span>
              </Avatar>
            )
          }
        />
      )}
    />
  );
}

function Editor({
  onChange,
  onSubmit,
  value,
}) {
  return (
    <>
      <Form.Item>
        <TextArea rows={4} onChange={(event) => onChange(event.target.value)} value={value} />
      </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          onClick={() => onSubmit(value)}
          type="primary"
        >
          Add Comment
        </Button>
      </Form.Item>
    </>
  );
}

function Comments({ comments, onCommentAdded }) {
  const user = JSON.parse(localStorage.getItem('user'));

  const [commentValue, setCommentValue] = useState('');
  const [wasCalled, setCalled] = useState(false);

  // TODO: THIS IS FOR TESTING
  const [commentsObj, setComments] = useState(comments);
  // TODO: END TESTING

  const submitComment = (comment) => {
    // TODO
    setCalled(true);
    setCommentValue('');

    // TODO: THIS IS FOR TESTING
    setComments((prevState) => (
      [...prevState, {
        email: user.ownerId,
        content: comment,
      }]
    ));

    if (!wasCalled) {
      onCommentAdded();
    }
  };

  return (
    <div className="comments">
      <h1>Comments</h1>
      <Comment
        avatar={
          (
            <Avatar className="avatar">
              <span>{user.firstName[0]}</span>
            </Avatar>
          )
        }
        content={
          (
            <Editor
              onChange={setCommentValue}
              onSubmit={submitComment}
              value={commentValue}
            />
          )
        }
      />
      <CommentList comments={commentsObj} />
    </div>
  );
}

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

Editor.propTypes = {
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

Comments.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      email: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default Comments;
