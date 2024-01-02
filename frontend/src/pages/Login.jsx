import Login from "../components/auth/Login";
import axios from "axios";
import { redirect } from "react-router-dom";

function LoginPage() {
  return <Login />;
}

export default LoginPage;

export async function action({ request }, handleApiError) {
  const formData = await request.formData();
  const emailValue = formData.get("email");
  const passwordValue = formData.get("password");
  try {
    const login = await axios({
      method: "post",
      url: "https://movimint-api.onrender.com/api/v1/auth/login",
      data: {
        email: emailValue,
        password: passwordValue,
      },
    });

    const responseType = await axios.get(
      "https://movimint-api.onrender.com/api/v1/auth/type",
      {
        params: {
          email: emailValue,
        },
      }
    );
    localStorage.setItem("token", login.data.token);
    localStorage.setItem("type", responseType.data.type);
    return redirect("/homepage");
  } catch (error) {
    if (error.request.status === 401) {
    }
  }
}
