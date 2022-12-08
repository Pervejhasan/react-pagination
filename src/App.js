import "./App.css";
import ReactPaginate from "react-paginate";
import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  //console.log(pageCount);
  let limit = 12;
  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/comments?page=1&_limit=${limit}`
      );
      const data = await res.json();
      //total number of data find
      const total = res.headers.get("x-total-count");
      const pageAmount = Math.ceil(total / 12);
      //console.log(pageAmount);
      setPage(pageAmount);

      setItems(data);
    };
    getComments();
  }, []);

  const fetchComments = async (currentPage) => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?_page=${currentPage}&_limit=${limit}`
    );
    const data = await res.json();
    return data;
  };

  //Invoke when user click to request another page.
  const handlePageClick = async (data) => {
    //console.log(event.selected);
    let currentPage = data.selected + 1;

    const commentsFromServe = await fetchComments(currentPage);
    setItems(commentsFromServe);
  };

  return (
    <div>
      <h2 className="text-center my-1 p-3 mb-2 bg-primary text-white">
        React Pagination
      </h2>
      <div className="container">
        <div className="row m-2">
          {items.map((item) => {
            return (
              <div key={item.id} className="col-sm-6 col-md-4 my-2">
                <div
                  className="card shadow-sm w-100"
                  style={{ minHeight: 225 }}
                >
                  <div className="card-body">
                    <h5 className="card-title text-center h2">{item.id}</h5>
                    <h6 className="card-subtitle mb-2 text-muted text-center">
                      {item.email}
                    </h6>
                    <p className="card-text">{item.body.slice(0, 100)}...</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <ReactPaginate
        breakLabel={"..."}
        nextLabel={"next"}
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={page}
        previousLabel={"previous"}
        renderOnZeroPageCount={3}
        marginPagesDisplayed={3}
        containerClassName={"pagination justify-content-center "}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link"}
        previousClassName={"page-item"}
        previousLinkClassName={"page-link"}
        nextClassName={"page-item"}
        nextLinkClassName={"page-link"}
        breakClassName={"page-item"}
        breakLinkClassName={"page-link"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default App;
