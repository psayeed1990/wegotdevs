import List from '../../list-model';
import styles from './CommonUploads.module.css';

const CommonUpload = ({ user }) => {
  return (
    <List
      model="HTML Theme Uploads"
      url="uploads"
      singlePageUrl={`${user}/uploads`}
      data1="name"
      data2="type"
      heading="HTML Theme Uploads"
    />
  );
};

export default CommonUpload;
