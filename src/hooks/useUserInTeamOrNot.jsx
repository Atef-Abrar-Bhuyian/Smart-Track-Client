import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import useAxiosPublic from "./useAxiosPublic";

const useUserInTeamOrNot = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [cUser, setCUser] = useState();

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

  return [cUser];
};

export default useUserInTeamOrNot;
