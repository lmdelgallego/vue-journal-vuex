import axios from 'axios';
import imageApi from '@/helpers/imageApi';

describe('ImageApi', () => {
  test('should be upload image and return a url', async () => {
    const {data} = await axios.get('https://res.cloudinary.com/alucardluis/image/upload/v1612270415/x8tmirlsesb5pizhdzbq.jpg', {
      responseType: 'arraybuffer'
    });

    const file = new File([data], 'foto.jpg');

    console.log(file);

    const url = await imageApi(file);
    console.log(url);
    expect(typeof url).toEqual('object');
    expect(url).toEqual({
      picture: expect.any(String),
      picture_id: expect.any(String)
    })

  });
})
