import React, { useEffect, useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, message, Upload } from 'antd';
import useApiRequest from '../../Comman/useApiRequest';
import axios from 'axios';
import { API_URL } from '../../Comman/api';
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};
const UploadProfile = ({id, setProfileImageId}) => {
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const {uploadApi, getApi} = useApiRequest();
  useEffect(()=> {
    if(id){
        const url = API_URL + '/' + "api/documents/" + id
        axios.get(url)
        .then((data)=>{console.log("data",data?.data[0]?.path)
            const profileUrl = API_URL + '/' +  data?.data[0]?.path;
            console.log(profileUrl,"profileurl")
        setImageUrl(profileUrl);

        })
        .catch((error)=>console.log(error));
    }
  },[id])
  const handleChange = (info) => {
    console.log(imageUrl,"imageUrl")
    console.log("info",info)
    if (info.file.status === 'uploading') {
      setLoading(true);
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
    //   getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        const url = API_URL + "/" + info.path;
        console.log(url);
        setImageUrl(url);
        setProfileImageId(info._id);
    //   });
    }
  };
  const handleUpload = async ({ file }) => {
    if (!id) {
        message.error("Invalid lead ID");
        return;
    }

    const successFn = (data) => {
        message.success("File uploaded successfully!");
        console.log("Upload Success:", data);
        // setFileList((prev) => [...prev, { uid: data._id, name: data.name, status: "done" }]);
        const file = {status : "done"};
        data.file = file;
        handleChange(data)
    };

    const errorFn = (error) => {
        message.error("Failed to upload file.");
        console.error("Upload Error:", error);
    };

    uploadApi(`${API_URL}/api/upload`, id, file, successFn, errorFn);
};

//   const uploadProps = {
//     customRequest: ({ file }) => handleUpload({ file }), // Custom upload handler
//     // showUploadList: true,
//   };
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type="button"
    >
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  return (
    <Flex gap="middle" wrap>
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        // action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        customRequest={({ file }) => handleUpload({ file })}
        beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        <div
  style={{
    width: '100px', // Adjust size as needed
    height: '100px',
    borderRadius: '50%',
    overflow: 'hidden',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: '3px solid #ddd', // Optional border
  }}
>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
                width: '120%',
                height: '120%',
                objectFit: 'cover',
            }}
          />
        ) : (
          uploadButton
        )}
        </div>
      </Upload>
    </Flex>
  );
};
export default UploadProfile;