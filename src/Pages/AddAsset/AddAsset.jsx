import { Card, Label, Select, TextInput } from "flowbite-react";
import React from "react";
import CustomBtn from "../Shared/CustomBtn/CustomBtn";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import Typewriter from "typewriter-effect";
import { useNavigate } from "react-router-dom";
import ReactHelmet from "../../Components/ReactHelmet/ReactHelmet";
import { Fade } from "react-awesome-reveal";
import HeaderSection from "../../Components/HeaderSection/HeaderSection";
import GradientUI from "../../Components/GradientUI/GradientUI";

const AddAsset = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const assetAddedDate = new Date();

  const axiosSecure = useAxiosSecure();
  const handleAddAsset = (e) => {
    e.preventDefault();

    const hrEmail = user?.email;
    const form = e.target;
    const productName = form.productName.value;
    const quantity = parseInt(form.quantity.value);
    const productType = form.productType.value;
    const assetInfo = {
      productName,
      quantity,
      productType,
      hrEmail,
      assetAddedDate,
    };

    if (quantity === 0 || quantity < 0) {
      return toast.error("Quantity Should Be Greater Than 0");
    }

    axiosSecure.post("/assets", assetInfo).then((res) => {
      if (res.data.insertedId === null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Asset Already Exists",
          background: "#003333",
          color: "#fff",
          confirmButtonColor: "#001919",
        });
      }
      if (res.data.insertedId) {
        navigate("/assetList");
        Swal.fire({
          title: `${productName} Added Successfully`,
          background: "#003333",
          color: "#fff",
          confirmButtonColor: "#001919",
          showClass: {
            popup: `
                          animate__animated
                          animate__fadeInUp
                          animate__faster
                        `,
          },
          hideClass: {
            popup: `
                          animate__animated
                          animate__fadeOutDown
                          animate__faster
                        `,
          },
        });
      }
    });
  };

  return (
    <div className="py-16 px-6 dark:bg-gray-900 min-h-screen relative overflow-hidden">
      <GradientUI />
      <ReactHelmet title={"Add Asset"} />
      <ToastContainer />

      <div className="flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mt-10">
          <HeaderSection
            title="Add New Asset"
            description="Add your new assets effortlessly to the system."
          />
        </div>

        {/* Glassmorphism Card */}
        <div className="w-full max-w-4xl backdrop-blur-xl bg-white/50 dark:bg-white/0 dark:bg-gradient-to-br dark:from-white/5 dark:via-cyan-400/10 dark:to-blue-500/10 border border-gray-700 rounded-3xl shadow-xl p-10">
        
          <form onSubmit={handleAddAsset} className="space-y-8">
            {/* Input Group */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Product Name */}
              <div className="flex flex-col">
                <Label className="text-cyan-500 font-semibold mb-1">
                  Product Name
                </Label>
                <TextInput
                  type="text"
                  name="productName"
                  placeholder="Enter product name"
                  required
                  className="w-full bg-gray-700/50 text-white placeholder-gray-400 border border-gray-600 rounded-xl focus:ring-cyan-500 transition"
                />
              </div>

              {/* Quantity */}
              <div className="flex flex-col">
                <Label className="text-cyan-500 font-semibold mb-1">
                  Quantity
                </Label>
                <TextInput
                  type="number"
                  name="quantity"
                  placeholder="Enter quantity"
                  required
                  className="w-full bg-gray-700/50 text-white placeholder-gray-400 border border-gray-600 rounded-xl focus:ring-cyan-500 transition"
                />
              </div>
            </div>

            {/* Product Type */}
            <div className="flex flex-col">
              <Label className="text-cyan-500 font-semibold mb-1">
                Product Type
              </Label>
              <Select
                defaultValue="default"
                name="productType"
                required
                className="bg-gray-700/50 text-white placeholder-gray-400 border border-gray-600 rounded-xl transition"
              >
                <option value="default" disabled>
                  Select Product Type
                </option>
                <option value="Returnable">Returnable</option>
                <option value="Non-Returnable">Non-Returnable</option>
              </Select>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center pt-6">
              <CustomBtn
                text="Add Asset"
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-cyan-600 to-indigo-600 text-white font-semibold rounded-2xl hover:opacity-90 transition duration-300"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAsset;
