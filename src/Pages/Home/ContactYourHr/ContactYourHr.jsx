import { Card } from "flowbite-react";
import { Fade } from "react-awesome-reveal";
import { HiOutlineUserGroup } from "react-icons/hi";

export default function ContactYourHr() {
  return (
    <div className="pt-32 flex items-center justify-center dark:bg-gray-900">
      <Fade cascade>
        <Card className="w-full max-w-md text-center shadow-2xl border bg-white/5 backdrop-blur-lg border-cyan-500">
          <div className="flex flex-col items-center gap-6 p-8">
            <div className="bg-cyan-500/10 p-4 rounded-full shadow-md">
              <HiOutlineUserGroup className="text-6xl text-cyan-400 drop-shadow-lg" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 dark:text-cyan-400">
              You're not part of a team yet
            </h1>
            <p className="text-gray-800 dark:text-white">
              Please contact your HR to be added to a team and start using the
              platform.
            </p>
          </div>
        </Card>
      </Fade>
    </div>
  );
}
