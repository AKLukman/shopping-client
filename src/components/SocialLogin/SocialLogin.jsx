import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import usePublicAxios from "../../hooks/usePublicAxios";

const SocialLogin = () => {
  const { signInwithGoogle } = useAuth();
  const axiosPublic = usePublicAxios();
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/";
  const handleGoogleSignIn = () => {
    signInwithGoogle()
      .then((result) => {
        console.log(result.user);
        const userInfo = {
          email: result.user?.email,
          name: result.user?.displayName,
        };
        axiosPublic.post("/users", userInfo).then((res) => {
          console.log(res.data);
          navigate(from, { replace: true });
        });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="form-control mt-6">
      <button onClick={handleGoogleSignIn} className="btn">
        <FcGoogle />
        Sign in with Google
      </button>
    </div>
  );
};

export default SocialLogin;
