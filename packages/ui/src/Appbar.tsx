import { Button } from "./button";

interface AppbarProps {
  user?: {
    name?: string | null;
  },
  onSignin: () => void,
  onSignout: () => void
}

export const Appbar = ({
  user,
  onSignin,
  onSignout
}: AppbarProps) => {
  return (
    <div className="flex justify-between border-b px-4 border-[#6a51a6]">
      <div className="text-3xl md:mt-0 font-bold text-zinc-800 p-2">
        PayU
      </div>
      <div className="flex flex-col justify-center pt-2">
        <Button onClick={user ? onSignout : onSignin}>
          {user ? "Logout" : "Login"}
        </Button>
      </div>
    </div>
  );
};

