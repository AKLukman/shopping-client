import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "../../../hooks/usePublicAxios";
import { Link } from "react-router-dom";

const AllShopping = () => {
  const axisosPublic = usePublicAxios();
  const { data: shopping = [], isLoading } = useQuery({
    queryKey: ["shopping"],
    queryFn: async () => {
      const res = await axisosPublic.get("/shopping");
      return res.data;
    },
  });
  if (isLoading)
    return (
      <div>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Date</th>
              <th>share</th>
              <th>view</th>
              <th>delete</th>
            </tr>
          </thead>
          <tbody>
            {shopping.map((item, i) => (
              <tr key={item._id}>
                <th>{i + 1}</th>
                <td>{item.date}</td>
                <td>share</td>
                <td>
                  <Link to={`/viewShoppinglist/${item._id}`}>view</Link>
                </td>
                <td>
                  {/* <button onClick={() => handledelete(item._id)}>delete</button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllShopping;
