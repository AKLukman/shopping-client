import { Controller, useFieldArray, useForm } from "react-hook-form";
import Swal from "sweetalert2";
// import jsPDF from "jspdf";
import { format } from "date-fns";
import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "../../hooks/usePublicAxios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ShoppingList = () => {
  const [search, setSearch] = useState("");

  // console.log(search);
  const navigate = useNavigate();

  const axisosPublic = usePublicAxios();
  const { data: shoppingList = [], isLoading } = useQuery({
    queryKey: ["shoppingList"],
    queryFn: async () => {
      const res = await axisosPublic.get(`/shoppingList`);
      return res.data;
    },
  });
  console.log(shoppingList);

  const { control, register, watch, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      meats: shoppingList,
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "meats",
  });
  useEffect(() => {
    if (shoppingList.length > 0) {
      reset({
        meats: shoppingList,
      });
    }
  }, [shoppingList, reset]);

  // search
  const filteredFields = fields.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // full form
  const onSubmit = (data) => {
    console.log(data);
    try {
      const checkedItems = data.meats.filter((meat) => meat.checked);
      const formattedDate = format(new Date(), "dd/MM/yy");

      // // Generate PDF Blob
      // const pdfBlob = generatePDFBlob(checkedItems, formattedDate);

      // // Create Blob URL
      // const pdfUrl = URL.createObjectURL(pdfBlob);

      // // Trigger download
      // downloadPDF(pdfUrl, pdfBlob);
      const checkedData = {
        checkedItems,
        date: formattedDate,
      };

      axisosPublic.post("/shopping", checkedData).then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Items processed successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          reset();
          navigate("/shoppinglist");
        }
      });
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Something went wrong",
        text: error.message,
        showConfirmButton: true,
      });
    }
  };

  // const generatePDFBlob = (items, date) => {
  //   const doc = new jsPDF();
  //   doc.text("Shopping List", 10, 10);
  //   doc.text(`Date: ${date}`, 10, 20);

  //   let y = 30;
  //   items.forEach((item) => {
  //     doc.text(`${item.name}: ${item.quantity} kg`, 10, y);
  //     y += 10;
  //   });

  //   return doc.output("blob");
  // };

  // const downloadPDF = (pdfUrl, pdfBlob) => {
  //   // Trigger the file download
  //   // const link = document.createElement("a");
  //   // link.href = pdfUrl;
  //   // link.download = "shopping_list.pdf";
  //   // link.click();

  //   // Clean up
  //   URL.revokeObjectURL(pdfUrl);

  //   const file = new File([pdfBlob], "shopping_list.pdf", {
  //     type: "application/pdf",
  //   });

  //   if (navigator.share) {
  //     try {
  //       navigator.share({
  //         files: [file],
  //         title: "Shopping List",
  //         text: "Check out my shopping list!",
  //       });
  //       console.log("PDF shared successfully.");
  //     } catch (error) {
  //       console.error("Error sharing PDF:", error);
  //     }
  //   } else {
  //     console.error("Web Share API not supported.");
  //   }
  // };

  const increaseQuantity = (index) => {
    const currentQuantity = watch(`meats.${index}.quantity`);
    setValue(
      `meats.${index}.quantity`,
      currentQuantity + fields[index].quantity
    );
  };

  const decreaseQuantity = (index) => {
    const currentQuantity = watch(`meats.${index}.quantity`);
    if (currentQuantity > fields[index].quantity) {
      setValue(
        `meats.${index}.quantity`,
        currentQuantity - fields[index].quantity
      );
    }
  };

  const checkedMeats = watch("meats").filter((meat) => meat.checked);

  if (isLoading)
    return (
      <div>
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="m-4">
      <div role="tablist" className="tabs tabs-lifted ">
        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Meat & Fish"
          defaultChecked
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          <label className="input input-bordered flex items-center gap-2 my-4">
            <input
              value={search}
              type="text"
              className="grow"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2  gap-4">
            {filteredFields.map((item, index) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-4 border rounded-md scroll"
              >
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    {...register(`meats.${index}.checked`)}
                    className="form-checkbox h-5 w-5 text-indigo-600"
                  />
                  <span className="text-gray-700">{item.name}</span>
                </label>
                {watch(`meats.${index}.checked`, item.checked) && (
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => decreaseQuantity(index)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      -
                    </button>
                    <Controller
                      name={`meats.${index}.quantity`}
                      control={control}
                      render={({ field }) => (
                        <>
                          <input
                            type="number"
                            {...field}
                            value={field.value}
                            readOnly
                            className="w-16 text-center border rounded"
                          />
                          <span className="ml-2">kg</span>
                        </>
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => increaseQuantity(index)}
                      className="px-2 py-1 bg-green-500 text-white rounded"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Tab 2"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          Tab content 2
        </div>

        <input
          type="radio"
          name="my_tabs_2"
          role="tab"
          className="tab"
          aria-label="Tab 3"
        />
        <div
          role="tabpanel"
          className="tab-content bg-base-100 border-base-300 rounded-box p-6"
        >
          Tab content 3
        </div>
      </div>
      <button
        type="submit"
        disabled={checkedMeats.length === 0}
        className="w-full btn btn-primary mt-2"
      >
        Submit
      </button>
    </form>
  );
};

export default ShoppingList;
