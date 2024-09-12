import { toast } from 'react-toastify';

export const loadingMsg = () => {
  toast.dismiss();
  toast.loading('Please wait...');
};

export const successMsg = () => {
  toast.dismiss();
  toast.success('Success!');
};

export const errorMsg = (msg) => {
  toast.dismiss();
  toast.error(msg);
};
