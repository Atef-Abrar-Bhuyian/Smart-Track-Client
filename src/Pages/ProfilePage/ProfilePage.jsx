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
    updateUserProfile(newName, newPhoto)
      .then(() => {
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
    <div className="my-16 px-4">
      <ReactHelmet title="My Profile" />
      
      <div className="relative max-w-lg mx-auto">
        <div className="bg-gradient-to-r from-cyan-500 to-cyan-700 h-36 rounded-lg"></div>
        
        <div className="bg-white shadow-lg rounded-lg p-6 -mt-14 flex flex-col items-center relative">
          <img
            src={cUser?.photo}
            alt="Profile"
            className="h-24 w-24 rounded-full border-4 border-white shadow-md"
          />
          <h1 className="text-xl font-semibold mt-3">Full Name: {cUser?.name}</h1>
          <p className="text-gray-600">Email: {cUser?.email}</p>

          <Button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 bg-cyan-600 text-white hover:bg-cyan-700 px-6 py-2 rounded-lg transition"
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Modal.Header>Update Profile</Modal.Header>
        <Modal.Body>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="New Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-500"
            />
            <input
              type="text"
              placeholder="New Photo URL"
              value={newPhoto}
              onChange={(e) => setNewPhoto(e.target.value)}
              className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-cyan-500"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button color="gray" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleUpdateProfile}
            className="bg-cyan-600 text-white hover:bg-cyan-700"
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProfilePage;
