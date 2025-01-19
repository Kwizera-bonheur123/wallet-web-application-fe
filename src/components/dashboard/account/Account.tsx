import { RiAddCircleFill } from "react-icons/ri";
import { useEffect, useState } from "react";
import {
  fetchAccounts,
  manipulateModelVisiblity,
} from "../../../redux/features/AccountSlice";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks/hooks";
import { FiEdit3 } from "react-icons/fi";
import AccountForm from "./AccountForm";
import { accountSchemaType } from "../../../validations/Account.validation";
import { HashLoader } from "react-spinners";
import ReactPaginate from "react-paginate";
import { GrNext, GrPrevious } from "react-icons/gr";

const Account = () => {
  const [accountData, setAccountData] = useState<accountSchemaType | null>(
    null
  );
  const { isLoading, accounts, isAccountModelOpen } = useAppSelector(
    (state) => state.accounts
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAccounts()).unwrap();
  }, [dispatch]);

  const onClose = () => {
    dispatch(manipulateModelVisiblity());
    setAccountData(null);
  };

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 8;

  const categoriesArray = Array.isArray(accounts) ? accounts : [];
  const offset = currentPage * itemsPerPage;
  const currentCategories = categoriesArray.slice(
    offset,
    offset + itemsPerPage
  );
  const pageCount = Math.ceil(categoriesArray.length / itemsPerPage);
  const handlePageClick = (event: { selected: number }) => {
    setCurrentPage(event.selected);
  };
  return (
    <>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          <HashLoader
            color="#256490"
            role="progressbar"
            aria-label="single_product_loder"
          />
        </div>
      ) : (
        <div className="mobile:ml-[2%] overflow-y-scroll overflow-hidden pb-4 mt-4 h-[200%]">
          <div className="tableWrapper mt-1 text-[1rem] mx-5 laptop:mx-2 bg-neutral-white p-4 rounded-md w-full max-w-[90%] mobile:max-w-[100%]">
            <div className="flex justify-between items-center mx-10">
              <h1 className="mb-5 font-semibold">Accounts</h1>
              <button
                onClick={() => {
                  dispatch(manipulateModelVisiblity());
                }}
                className="md:mx-3 px-4 py-1 laptop:py-2 text-neutral-white font-semibold rounded-lg flex items-center space-x-2 bg-custom-gradient"
              >
                <span>Add new</span>
                <RiAddCircleFill className="text-xl" />
              </button>
            </div>
            <table className=" pt-2 p-3 overflow-hidden overflow-x-scroll w-[92%] mx-10 mt-4">
              <thead className="bg-[#256490] text-neutral-white text-left overflow-hidden h-12">
                <tr className="rounded-xl text-sm">
                  <th className="text-center">No</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Number of transactions</th>
                  <th className="expand">Action</th>
                </tr>
              </thead>
              <tbody className="text-slate-700">
                {currentCategories &&
                  currentCategories.map((item, idx) => (
                    <tr
                      key={item.id}
                      className={`relative text-sm h-12 ${
                        idx % 2 !== 0 ? "bg-[#DDDD]" : ""
                      }`}
                    >
                      <td className="text-center">{idx + 1 + offset}</td>
                      <td>{item.name}</td>
                      <td>{item.type}</td>
                      <td className="pl-14">{item.transactions.length}</td>
                      <td className="flex gap-4">
                        <button
                          onClick={() => {
                            setAccountData({
                              id: item.id,
                              name: item.name,
                              type: item.type,
                            });
                            dispatch(manipulateModelVisiblity());
                          }}
                          className=" p-2 bg-green-700 rounded-md text-white"
                        >
                          <FiEdit3 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {isAccountModelOpen && (
            <AccountForm accountData={accountData} onClose={onClose} />
          )}
          <div className="flex items-center justify-center">
            <ReactPaginate
              previousLabel={<GrPrevious />}
              nextLabel={<GrNext />}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              activeClassName={"active"}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Account;
