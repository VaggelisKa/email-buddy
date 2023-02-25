import { AuthenticatedTemplate, useMsal } from "@azure/msal-react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Header: React.FC = () => {
  const [username, setUsername] = useState("");
  const { instance } = useMsal();
  const router = useRouter();

  useEffect(() => {
    const user = instance.getActiveAccount();

    if (user && user.name) {
      const firstName = user.name.split(" ")[0];

      setUsername(firstName ?? "");
    }
  }, [instance]);

  const handleLogout = async () => {
    try {
      await instance.logoutPopup();
      await router.push("/login");
    } catch {
      console.log("Logout failed");
    }
  };

  return (
    <div className="navbar bg-base-200 p-4">
      <div className="flex-1">
        <span className="text-xl font-bold normal-case">
          {username.length > 0 ? `Welcome, ${username}` : "Email Buddy"}
        </span>
      </div>
      <div className="dropdown-end dropdown  shadow-2xl drop-shadow-2xl">
        <label
          tabIndex={0}
          className="btn-ghost btn-circle avatar btn rounded-full"
        >
          <Image
            className="rounded-full"
            width={38}
            height={38}
            src="https://th.bing.com/th/id/R.28674b3ec8aa1a32aa098ba1ce19a65a?rik=tSlhj5yOjXXeBw&pid=ImgRaw&r=0"
            alt=""
          />
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box menu-compact mt-3 w-52 bg-base-100 p-2 shadow"
        >
          <li>
            <a onClick={handleLogout}>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="footer items-center bg-neutral p-4 text-neutral-content">
      <div className="grid-flow-col items-center">
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fillRule="evenodd"
          clipRule="evenodd"
          className="fill-current"
        >
          <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
        </svg>
        <p>
          Created by Vaggelis ©{new Date().getFullYear()} - Powered by ChatGPT-3
        </p>
      </div>
      <div className="grid-flow-col gap-4 md:place-self-center md:justify-self-end">
        {/* TODO FIX LINKS */}
        <a>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
          </svg>
        </a>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <AuthenticatedTemplate>
        <Header />
      </AuthenticatedTemplate>
      <main className="flex flex-grow flex-col items-center justify-center px-8 pt-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};
