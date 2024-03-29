import { type ChangeEvent, useState, type FormEvent } from "react";
import { useAdmin } from "~/context/AdminContext";
import { type LoginResStatus } from "~/interfaces/admin";
import { api } from "~/utils/api";

interface LoginCredentials {
  username: string;
  password: string;
}

const LoginPage = () => {
  const { authorizeClient } = useAdmin();

  const [formData, setFormData] = useState<LoginCredentials>({
    username: "",
    password: "",
  });

  const loginQuery = api.admin.login.useQuery({
    user: formData.username,
    password: formData.password,
  });

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    const loginRes = loginQuery.data as {
      status: LoginResStatus;
      adminSession: {
        id: string;
        expires: Date;
      };
    };

    if (!!!loginRes) return;

    if (loginRes.status === "success") {
      authorizeClient({
        adminSession: {
          token: loginRes.adminSession.id,
          expires: loginRes.adminSession.expires,
        },
      });

      window.location.replace("/");
      return;
    }
  };

  return (
    <div className="h-full w-full items-center justify-center p-16">
      <form
        onSubmit={submitHandler}
        className="flex h-full w-full flex-col justify-between"
      >
        <div className="w-full">
          <div className="my-3 flex w-full justify-start gap-4">
            <div className="w-full">
              <label
                htmlFor="username"
                className="mb-2 block text-sm font-medium text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-600 focus:border-blue-500 focus:ring-blue-500"
                placeholder="username"
                required
                value={formData.username}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFormData((prevFormData) => {
                    return {
                      ...prevFormData,
                      username: e.target.value,
                    };
                  })
                }
              />
            </div>
          </div>
          <div className="w-full">
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-600 focus:border-blue-500 focus:ring-blue-500"
              placeholder="password"
              required
              value={formData.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setFormData((prevFormData) => {
                  return {
                    ...prevFormData,
                    password: e.target.value,
                  };
                })
              }
            />
          </div>
          <input
            type="submit"
            className="my-12 w-full cursor-pointer rounded-lg bg-green-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300"
          />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
