import toast from 'react-hot-toast';

export const sendNotifyEmptyField = () => {
  return toast('Text must be entered to search for images.', {
    style: {
      borderRadius: '10px',
      background: '#fff',
      color: '#545454',
    },
  });
};

export const sendNotifyEndOfData = () => {
  return toast('We are sorry, there are no more pictures to load.', {
    style: {
      borderRadius: '10px',
      background: '#fff',
      color: 'red',
    },
  });
};

export const sendNotifyNotFound = () => {
  return toast('Nothing was found for your request. Try another query', {
    style: {
      borderRadius: '10px',
      background: '#fff',
      color: '3545454',
    },
  });
};