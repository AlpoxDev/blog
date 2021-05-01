import axios from 'axios';
import config from 'config';

export const onUploadImage = async (file: File, prefix?: string): Promise<string | null> => {
  const formData = new FormData();
  formData.append('file', file);

  const url = config.UPLOAD_SERVER_URL + (prefix ? `?prefix=${prefix}` : '?prefix=guest');
  console.log(url);

  try {
    const { status, data } = await axios.post(url, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (status === 201) {
      return data.location;
    }
    throw { status: 500 };
  } catch (error) {
    console.log('onUploadImage Error', error);
    return null;
  }
};
