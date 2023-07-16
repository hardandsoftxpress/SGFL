import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CircleLoader } from "react-spinners";

import { useAppContext } from "../context/AppContext";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const [emptyInput, setEmptyInput] = useState(true);
  const { user } = useAppContext();
  const { isLoading, errorMessage, successMessage, loginUser } = useAuth();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user]);

  useEffect(() => {
    let hasEmptyInput = false;

    const values = Object.values(inputs);

    values.forEach((value) => {
      if (value.length === 0) {
        hasEmptyInput = true;
      }
    });

    setEmptyInput(hasEmptyInput);
  }, [inputs]);

  const handleLoginUser = async (e) => {
    e.preventDefault();

    await loginUser(inputs);

    if (errorMessage) {
      toast.error(errorMessage);
    }

    if (successMessage) {
      toast.success(successMessage);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }

    if (successMessage) {
      toast.success(successMessage);
    }
  }, [errorMessage, successMessage]);

  return (
    <div className="flex-1 flex justify-center">
      <div className="flex flex-col mt-8">
        <h1 className="font-bold text-2xl uppercase text-right my-4">
          Connexion
        </h1>

        <form className="flex flex-col w-96 gap-3" onSubmit={handleLoginUser}>
          <input
            value={inputs.email}
            onChange={(e) =>
              setInputs({
                ...inputs,
                email: e.target.value,
              })
            }
            type="text"
            placeholder="Entrez votre email"
            className="input input-bordered input-primary w-full"
          />
          <input
            value={inputs.password}
            onChange={(e) =>
              setInputs({
                ...inputs,
                password: e.target.value,
              })
            }
            type="password"
            autoComplete="true"
            placeholder="Entrez votre password"
            className="input input-bordered input-primary w-full"
          />
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={emptyInput}
          >
            {isLoading ? <CircleLoader /> : <span>Connexion</span>}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
