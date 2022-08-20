import { Outlet, useParams } from "react-router-dom";
function Tour() {
  const { id } = useParams();
  return (
    <>
      <div className="content">
        <h2>{id === undefined ? "Where do u want to go?" : "Welcome!"}</h2>
        <Outlet />
      </div>
    </>
  );
}
export default Tour;
