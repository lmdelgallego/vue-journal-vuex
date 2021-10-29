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

    return {picture: data.secure_url, picture_id: data.asset_id};

  } catch (error) {
    console.error('Error al cargar la imagen revisar logs');
    console.log(error);
    return null;
  }
};

export const deleteImage = async (imageId) => {
  try {
    const url = `https://api.cloudinary.com/v1_1/alucardluis/image/destroy/${imageId}`;
    const {data} = await axios.delete(url, {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
    });

    console.log(data);

    return data;

  } catch (error) {
    console.error('Error al eliminar la imagen revisar logs');
    console.log(error);
    return null;
  }
}

export default uploadImage;