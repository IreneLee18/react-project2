import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
function TourDetail() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const { Picture1, Name, Opentime, Add, Description } = data;
  const api =
    "https://api.kcg.gov.tw/api/service/Get/9c8e1450-e833-499c-8320-29b36b7ace5c";
  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((res) => {
        const currentData = res.data.XML_Head.Infos.Info.filter(
          (item) => item.Id === id
        );
        setData(currentData[0]);
        console.log(data);
      });
  }, []);
  return (
    <>
      <div className="card">
        <div className="card-title">
          <h1>{Name}</h1>
        </div>
        <div className="card-body">
          <img src={Picture1} alt={Name} />
          <div className="card-content">
            <div>
              <p>地址：</p>
              <p>{Add}</p>
            </div>
            <div>
              <p>營業時間：</p>
              <p> {Opentime}</p>
            </div>
            <div>
              <p>介紹：</p>
              <p>{Description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default TourDetail;
