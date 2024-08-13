import myAxios from 'axios';

const axios = myAxios.create({
  baseURL: 'https://api.unsplash.com',
});

export const getPictures = async (query, page) => {
  const params = {
    client_id: 'EPeXdKHTO1YQvZycY9o6dNFLoE1wg8q1wyde_cCqFK8',
    query: query,
    per_page: 9,
    page: page,
  };

  const response = await axios.get('/search/photos', { params });
  return response;
};
