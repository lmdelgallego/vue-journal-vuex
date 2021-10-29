import axios from "axios";

const uploadImage = async (file) => {
  if (!file) return;

  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'schioqrm');

    const url = 'https://api.cloudinary.com/v1_1/alucardluis/image/upload';
    const {data} = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log(data);

    return data.secure_url;

  } catch (error) {
    console.error('Error al cargar la imagen revisar logs');
    console.log(error);
    return null;
  }
};

export default uploadImage;