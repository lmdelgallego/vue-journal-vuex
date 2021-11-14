import axios from 'axios';
import imageApi from '@/helpers/imageApi';
import cloudinary from 'cloudinary';

cloudinary.config({
  cloud_name: 'alucardluis',
  api_key: '676364253242874',
  api_secret: '2nFml2s1kILek2WOg1cEWT-uJZ4'
})

describe('ImageApi', () => {
  test('should be upload image and return a url', async (done) => {
    const {data} = await axios.get('https://res.cloudinary.com/alucardluis/image/upload/v1612270415/x8tmirlsesb5pizhdzbq.jpg', {
      responseType: 'arraybuffer'
    });

    const file = new File([data], 'foto.jpg');


    const url = await imageApi(file);
    expect(typeof url).toEqual('object');
    expect(url).toEqual({
      picture: expect.any(String),
      picture_id: expect.any(String)
    });

    const segments = url.picture.split('/');
    const imageId = segments[segments.length - 1].replace('.jpg', '');


    cloudinary.v2.api.delete_resources(imageId, {}, () => done());

  });
})
