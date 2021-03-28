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

  useEffect(() => {
    window.fetch(`/visits/photos/${visitID}`)
      .then((response) => response.json())
      .then((url) => {
        setImages(url);
      });
  }, []);

  return (
    <div className="photo-gallery">
      <div className="title">
        <h1>Patient Photos</h1>
        <Tooltip placement="top" title="Add photo">
          <Upload
            customRequest={(options) => {
              const formData = new FormData();
              formData.append('photo', options.file);

              window.fetch(`/visits/photos/${visitID}`, {
                method: 'POST',
                body: formData,
              })
                .then((response) => response.json())
                .then((url) => {
                  imageList.push(url);
                  setImages(imageList);
                });
            }}
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
              className="patient-image"
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
