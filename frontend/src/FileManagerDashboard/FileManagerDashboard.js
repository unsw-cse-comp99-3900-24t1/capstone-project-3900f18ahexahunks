import { useParams } from 'react-router-dom';

const FileManagerDashboard = () => {
  const { process, id } = useParams();

  return (
    <div>
      FileManagerDashboard{process}
      {id}
    </div>
  );
};
export default FileManagerDashboard;
