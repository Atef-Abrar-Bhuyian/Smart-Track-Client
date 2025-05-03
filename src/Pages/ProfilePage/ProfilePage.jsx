import React, { useContext, useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import ReactHelmet from "../../Components/ReactHelmet/ReactHelmet";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { AuthContext } from "../../provider/AuthProvider";
import { Modal, Button } from "flowbite-react";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { updateUserProfile } = useContext(AuthContext);

  const [cUser, setCUser] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhoto, setNewPhoto] = useState("");

  useEffect(() => {
    if (user?.email) {
      axiosPublic.get(`/users/${user.email}`).then((res) => {
        setCUser(res.data);
        setNewName(res.data?.name || "");
        setNewPhoto(res.data?.photo || "");
      });
    }
  }, [user, axiosPublic]);

  const handleUpdateProfile = () => {
    updateUserProfile(newName, newPhoto).then(() => {
      axiosPublic
        .patch(
          `/usersUpdate/${user?.email}`,
          { name: newName, photo: newPhoto },
          { headers: { Authorization: `Bearer ${user?.token}` } }
        )
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Profile Updated",
            showConfirmButton: false,
            timer: 1500,
            background: "#003333",
            color: "#fff",
          });
          setCUser((prev) => ({ ...prev, name: newName, photo: newPhoto }));
          setIsModalOpen(false);
        });
    });
  };

  return (
    <div className="dark:bg-gray-900 pt-44 pb-32">
      <ReactHelmet title="My Profile" />

      <div className="flex justify-center items-center">
        <div className="relative w-full max-w-md">
          {/* Background blob */}
          <div className="absolute -inset-4 blur-2xl opacity-30 bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 rounded-3xl"></div>

          {/* Glass Card */}
          <div className="relative backdrop-blur-xl bg-white/60 dark:bg-white/10 shadow-2xl rounded-3xl p-8 pt-20 border border-white/30 dark:border-white/20">
            {/* Profile image */}
            <div className="absolute -top-14 left-1/2 transform -translate-x-1/2">
              <img
                src={cUser?.photo}
                alt="Profile"
                className="w-28 h-28 rounded-full border-4 border-white dark:border-gray-900 object-cover shadow-lg"
              />
            </div>

            {/* Profile Info */}
            <div className="text-center">
              <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
                {cUser?.name}
              </h1>
              <p className="text-gray-700 dark:text-gray-300 mt-1">
                {cUser?.email}
              </p>
            </div>

            {/* Button */}
            <div className="mt-6 flex justify-center">
              <Button
                onClick={() => setIsModalOpen(true)}
                className="bg-gradient-to-r from-cyan-500 to-indigo-500 text-white px-6 py-2 rounded-full shadow-lg hover:scale-105 transition-transform"
              >
                Edit Profile
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)} size="md">
        <Modal.Header>
          <span className="text-lg font-semibold text-gray-800 dark:text-white">
            Edit Your Profile
          </span>
        </Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">
                Full Name
              </label>
              <input
                type="text"
                placeholder="New Name"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-cyan-500"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm text-gray-600 dark:text-gray-300">
                Profile Photo URL
              </label>
              <input
                type="text"
                placeholder="New Photo URL"
                value={newPhoto}
                onChange={(e) => setNewPhoto(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleUpdateProfile}
            className="bg-gradient-to-r from-cyan-600 to-indigo-600 text-white hover:brightness-110"
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfilePage;
