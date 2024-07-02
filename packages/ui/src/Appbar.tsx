import { Button } from "./button";

interface AppbarProps {
  user?: {
    name?: string | null;
  },
  // TODO: can u figure out what the type should be here?
  onSignin: any,
  onSignout: any
}

export const Appbar = ({
  user,
  onSignin,
  onSignout
}: AppbarProps) => {
  return <div className="flex justify-between border-b px-4 border-[#6a51a6]">
    <div className="text-xl md:mt-0
            font-bold bg-clip-text text-transparent 
            bg-gradient-to-b from-neutral-50 to-neutral-400 p-2">
      PayU
    </div>
    <div className="flex flex-col justify-center pt-2">
      <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
    </div>
  </div>
}
