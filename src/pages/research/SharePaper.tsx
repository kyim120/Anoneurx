import { Navigate, useParams } from "react-router-dom";

/**
 * Public share URL: /share/:code → forwards to /read/:code
 * Kept as a dedicated route so links look like domain.com/share/xxxxx.
 */
const SharePaper = () => {
  const { code } = useParams();
  if (!code) return <Navigate to="/research" replace />;
  return <Navigate to={`/read/${code}`} replace />;
};

export default SharePaper;
