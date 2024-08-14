import { useLoaderData } from "react-router-dom";

const ViewShopping = () => {
  const item = useLoaderData();
  const { checkedItems } = item;
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <td>Name</td>
              <td>Quantity</td>
            </tr>
          </thead>
          <tbody>
            {checkedItems.map((item) => (
              <tr key={item.name}>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td>Name</td>
              <td>Quanity</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
};

export default ViewShopping;
