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
    <div>
      <ReactHelmet title={"Add Asset"}></ReactHelmet>
      <ToastContainer />
      <div className="my-20 w-4/5 mx-auto">
        <div className="lg:flex justify-evenly gap-6">
          <div className=" flex flex-col items-center justify-center mb-6">
            <h1 className="text-center text-3xl font-bold">
              <Typewriter
                options={{
                  strings: ["Add a New Asset"],
                  autoStart: true,
                  loop: true,
                }}
              />
            </h1>
            <Fade>
            <p className="font-medium">
              Add a new asset to the system with ease and efficiency.
            </p>
            </Fade>
          </div>
          <div className="flex-1">
            <Card className="">
              <form onSubmit={handleAddAsset} className="flex flex-col gap-4">
                <div className="lg:flex gap-6">
                  {/* produt name */}
                  <div className="flex-1 mb-3">
                    <div className="mb-2 block">
                      <Label value="Product Name" />
                    </div>
                    <TextInput
                      type="text"
                      name="productName"
                      placeholder="Product Name"
                      required
                    />
                  </div>
                  {/* Quantity */}
                  <div className="flex-1">
                    <div className="mb-2 block">
                      <Label value="Product Quantity" />
                    </div>
                    <TextInput
                      type="number"
                      name="quantity"
                      placeholder="Quantity"
                      required
                    />
                  </div>

                  {/* Product Type */}
                  <div className="flex-1">
                    <div className="mb-2 block">
                      <Label value="Product Type" />
                    </div>
                    <Select
                      defaultValue={"default"}
                      name="productType"
                      required
                    >
                      <option value={"default"} disabled>
                        Select Type
                      </option>
                      <option value={"Returnable"}>Returnable</option>
                      <option value={"Non-Returnable"}>Non-Returnable</option>
                    </Select>
                  </div>
                </div>
                <CustomBtn text={"Add Asset"} type="submit"></CustomBtn>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAsset;
