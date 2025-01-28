import React, { useContext, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import ReactHelmet from "../../Components/ReactHelmet/ReactHelmet";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../provider/AuthProvider";

// Flowbite Modal Component
import { Modal, Button } from "flowbite-react";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [cUser, setCUser] = useState({});
  const { updateUserProfile } = useContext(AuthContext);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal open state
  const [newName, setNewName] = useState(cUser?.name || "");
  const [newPhoto, setNewPhoto] = useState(cUser?.photo || "");

  useEffect(() => {
    if (user?.email) {
      axiosPublic
        .get(`/users/${user.email}`)
        .then((res) => {
          setCUser(res.data);
        })
        .catch((err) => {
          // console.error("Error fetching user data:", err);
        });
    }
  }, [user, axiosPublic]);

  const handleUpdateProfile = (name, photo) => {
    updateUserProfile(name, photo)
      .then(() => {
        axiosPublic
          .patch(`/usersUpdate/${user?.email}`, {
            name,
            photo,
          }, {
            headers: {
              'Authorization': `Bearer ${user?.token}`, 
            }
          })
          .then(() => {
            Swal.fire({
              icon: "success",
              title: "Profile Updated",
              showConfirmButton: false,
              timer: 1500,
              background: "#003333",
            color: "#fff",
            });
            setCUser((prev) => ({
              ...prev,
              name,
              photo,
            }));
            setIsModalOpen(false);
          })
          .catch((err) => {
            // console.error("Error updating profile in the backend:", err);
          });
      })
      .catch((err) => {
        // console.error("Error updating profile in Firebase:", err);
      });
  };
  

  return (
    <div className="mb-32">
      <ReactHelmet title={"My Profile"}></ReactHelmet>
      <div className="relative">
        <div className="bg-blue-100 w-full h-36 my-10"></div>
        <div className="bg-white h-48 w-4/6 mx-auto rounded-2xl border border-cyan-700 absolute left-1/2 transform -translate-x-1/2 top-[90%] -translate-y-1/2 flex gap-3 p-10 flex-col">
          <div>
          <img
            src={cUser?.photo}
            alt=""
            className="h-20 w-20 rounded-xl mx-auto"
          />
          <div className="text-center flex items-center justify-center flex-col">
            <h1 className="text-xl font-bold">{cUser?.name}</h1>
            <p>{cUser?.email}</p>
          </div>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex w-full justify-center rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:focus:ring-cyan-900 hover:animate-pulse"
          >
            Edit Profile
          </button>
        </div>
      </div>

      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Update Profile</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="New Name"c
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-cyan-500"
            />
            <input
              type="text"
              placeholder="New Photo URL"
              value={newPhoto}
              onChange={(e) => setNewPhoto(e.target.value)}
              className="w-full rounded-lg border border-gray-300 p-2 focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => handleUpdateProfile(newName, newPhoto)}
            className="bg-cyan-600 text-white"
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfilePage;
