import '../scss/photo-gallery.scss';
import React from 'react';
import {
  Button,
  Tooltip,
  Upload,
  Image,
  Empty,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import placeholderImage from '../assets/dummy-image.jpg';

function PhotoGallery({ imageList }) {
  const uploadImage = (event) => {
    // TODO
    console.log(event);
  };

  return (
    <div className="photo-gallery">
      <div className="title">
        <h1>Patient Photos</h1>
        <Tooltip placement="top" title="Add photo">
          <Upload
            action="/"
            onChange={uploadImage}
            fileList={null}
            accept="image/png, image/jpeg, image/jpg"
          >
            <Button type="primary" className="btn-add">
              <PlusOutlined />
            </Button>
          </Upload>
        </Tooltip>
      </div>
      {imageList.length === 0 ? (
        <Empty
          description={
          (<span>Not images to show.</span>)
        }
        />
      ) : (
        <div className="grid">
          {imageList.map((src) => (
            <Image
              className="image-container"
              src={src}
              fallback={placeholderImage}
            />
          ))}
        </div>
      )}
    </div>
  );
}

PhotoGallery.propTypes = {
  imageList: PropTypes.arrayOf(PropTypes.string),
};

PhotoGallery.defaultProps = {
  imageList: [],
};

export default PhotoGallery;
