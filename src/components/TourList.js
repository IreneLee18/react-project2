import { useState, useEffect,useCallback } from "react";
import { Link } from "react-router-dom";
function TourList() {
  const [data, setData] = useState([]);
  const [pageData, setPageData] = useState([]);
  const perPage = 20;
  const [page, setPage] = useState({
    totalPage: 0,
    currentPage: 1,
    hasPer: false,
    hasNext: false,
  });
  const api =
    "https://api.kcg.gov.tw/api/service/Get/9c8e1450-e833-499c-8320-29b36b7ace5c";
  const pageNum = [];
  const currentPageData = [];


  // 抓取API資料
  useEffect(() => {
    fetch(api)
      .then((res) => res.json())
      .then((res) => {
        const totalData = res.data.XML_Head.Infos.Info;
        // 取出所有資料
        setData(totalData);
        // 預設先取出前20個資料(不能寫，會一直重複抓到第一次資料)
        // setPageData(data.slice(0, perPage));
        // 設定總頁數
        setPage((state) => ({
          ...state,
          totalPage: Math.ceil(data.length / perPage),
        }));
      });
  }, [data]);

  // 製作頁碼 
  for (let i = 1; i <= page.totalPage; i++) {
    pageNum.push(i);
  }

  // 製作點擊頁碼並切換頁面資料
  const pagination = useCallback((nowPage) =>{
    setPage((state) => ({ ...state, currentPage: nowPage }));
    setPageData([]); //每次都要清空一次
    if (page.currentPage > page.totalPage) {
      setPage((state) => ({ ...state, currentPage: page.totalPage }));
    }
    if (page.currentPage < 1) {
      setPage((state) => ({ ...state, currentPage: 1 }));
    }
    page.currentPage > 1
      ? setPage((state) => ({ ...state, hasPer: true }))
      : setPage((state) => ({ ...state, hasPer: false }));
    page.currentPage < page.totalPage
      ? setPage((state) => ({ ...state, hasNext: true }))
      : setPage((state) => ({ ...state, hasNext: false }));
    const minData = page.currentPage * perPage - perPage + 1;
    const maxData = page.currentPage * perPage;
    data.forEach((item, index) => {
      const num = index + 1;
      if (num >= minData && num <= maxData) {
        currentPageData.push(item);
      }
    });
  },[currentPageData, data, page.currentPage, page.totalPage])

  // 監聽目前頁碼，若有變化就呼叫 pagination 並帶入現在的頁碼 ＆ 將現在頁碼的資料放入到pageData中，使畫面可以做變化
  useEffect(() => {
    pagination(page.currentPage);
    setPageData(currentPageData);
  }, [page.currentPage, currentPageData, pagination]);
  
  return (
    <>
      <ul className="tourList">
        {pageData.map((item) => (
          <li key={item.Id}>
            <Link to={`/tour/${item.Id}`}>
              <img src={item.Picture1} alt={item.Id} />
              <span>{item.Name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <ul className="pagination">
        <li>
          <input
            type="button"
            value="&#8249;"
            onClick={() =>
              setPage((state) => ({
                ...state,
                currentPage: page.currentPage - 1,
              }))
            }
          />
        </li>
        {pageNum.map((item) => (
          <li key={item}>
            <input
              type="button"
              value={item}
              className={
                Number(page.currentPage) === item ? "pagination-active" : ""
              }
              onClick={(e) =>
                setPage((state) => ({ ...state, currentPage: e.target.value }))
              }
            />
          </li>
        ))}
        <li>
          <input
            type="button"
            value="&#8250;"
            onClick={() =>
              setPage((state) => ({
                ...state,
                currentPage: page.currentPage + 1,
              }))
            }
          />
        </li>
      </ul>
    </>
  );
}
export default TourList;
