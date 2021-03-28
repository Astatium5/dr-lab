import '../scss/photo-gallery.scss';
import React, { useState, useEffect } from 'react';
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

function PhotoGallery({ visitID }) {
  const [imageList, setImages] = useState([]);

  const uploadImage = (value) => {
    const formData = new FormData();
    console.log(value.file);
    formData.set('photo', value.file);
    formData.set('body', '');
    console.log(value.file.name);
    window.fetch(`/visits/photos/${visitID}`, {
      method: 'PUT',
      body: formData,
    })
      .then((response) => response.json())
      .then((url) => {
        imageList.push(url);
        setImages(imageList);
      });
  };

  useEffect(() => {
    console.log('got here');
    window.fetch(`/visits/photos/${visitID}`)
      .then((response) => response.json())
      .then((url) => {
        console.log(url);
        setImages(url);
      });
  }, []);

  return (
    <div className="photo-gallery">
      <div className="title">
        <h1>Patient Photos</h1>
        <Tooltip placement="top" title="Add photo">
          <Upload
            action={`/visits/photos/${visitID}`}
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
  visitID: PropTypes.string.isRequired,
};

export default PhotoGallery;
