import Link from 'next/link';
import {getKindeServerSession} from "@kinde-oss/kinde-auth-nextjs/server";
import {LoginLink, LogoutLink} from "@kinde-oss/kinde-auth-nextjs/components";
export default async function Navbar() {
  const { isAuthenticated } = getKindeServerSession();
  const user = await isAuthenticated();

  return (
    <div className="flex flex-row items-center justify-evenly p-4 mb-5">
  {user ? (
    <>
      <Link
        href="/"
        className="border border-gray-500 p-2 rounded-full hover:bg-gray-600 hover:text-white transition-all duration-200"
      >
        Home
      </Link>

      <Link
        href="/audience"
        className="border border-gray-500 p-2 rounded-full hover:bg-gray-600 hover:text-white transition-all duration-200"
      >
        Add Customer
      </Link>

      <Link
        href="/create-campaign"
        className="border border-gray-500 p-2 rounded-full hover:bg-gray-600 hover:text-white transition-all duration-200"
      >
        Add Campaign
      </Link>

      <Link
        href="/vendor"
        className="border border-gray-500 p-2 rounded-full hover:bg-gray-600 hover:text-white transition-all duration-200"
      >
        Send Campaign
      </Link>
      <LogoutLink
        className="border border-gray-500 p-2 rounded-full hover:bg-gray-600 hover:text-white transition-all duration-200"
      >
        Log out
      </LogoutLink>

    </>
  ) : (
    <LoginLink
      postLoginRedirectURL="/"
      className="border border-gray-500 p-2 rounded-full hover:bg-red-600 hover:text-white transition-all duration-200"
    >
      Login
    </LoginLink>
  )}
</div>
  );
}
