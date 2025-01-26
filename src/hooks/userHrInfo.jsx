import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const userHrInfo = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: userHr = [] } = useQuery({
    queryKey: ["hrInfo"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/adminInfo/${user?.email}`);
      return res.data;
    },
  });
  return [userHr];
};

export default userHrInfo;
