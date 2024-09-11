import Victory from "@/assets/victory.svg";
import Background from "@/assets/login2.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/store/app-store";
import { setUserData } from "@/store/slices/user-slice";
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>()
  const validateSignup = () => {
    if (!email.length) {
      toast.error("Email is required.");
      return false;
    }
    if (!password.length) {
      toast.error("Password is required.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Password and confirm password   should be same.");
      return false;
    }
    return true;
  };
  const longinHandler = async () => {
    try {
      const res = await apiClient.post(
        "/user/login",
        { email, password },
        { withCredentials: true },
      );
      if (res.data.id) {
        dispatch(setUserData(res.data))
        if (res.data.profileSetup) navigate("/chat");
        else navigate("/profile");
      }
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
  const signupHandler = async () => {
    if (validateSignup()) {
      try {
        const res = await apiClient.post(
          "/user/signup",
          { email, password },
          { withCredentials: true },
        );
        if (res.status === 201) {
           dispatch(setUserData(res.data))
          navigate("/profile");
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="grid h-[80vh] w-[80vw] rounded-3xl border-2 border-white bg-white text-opacity-90 shadow-2xl md:w-[90vw] lg:w-[70vw] xl:w-[60vw] xl:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col items-center justify-center">
            <div className="flex items-center justify-center">
              <h1 className="text-5xl font-bold md:text-6xl">Welcome</h1>
              <img src={Victory} alt="Victory Emoji" className="h-[100px]" />
            </div>
            <p className="text-center font-medium">
              Fill in the details to get started with best chat app!
            </p>
          </div>
          <div className="flex w-full items-center justify-center">
            <Tabs className="w-3/4" defaultValue="login">
              <TabsList className="w-full rounded-none bg-transparent">
                <TabsTrigger
                  className="w-full rounded-none border-b-2 p-3 text-black text-opacity-90 transition-all duration-300 data-[state=active]:border-b-purple-500 data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:text-black"
                  value="login"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  className="w-full rounded-none border-b-2 p-3 text-black text-opacity-90 transition-all duration-300 data-[state=active]:border-b-purple-500 data-[state=active]:bg-transparent data-[state=active]:font-semibold data-[state=active]:text-black"
                  value="signup"
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent className="flex flex-col gap-5" value="login">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button onClick={longinHandler} className="rounded-full p-6">
                  Login
                </Button>
              </TabsContent>
              <TabsContent className="flex flex-col gap-5" value="signup">
                <Input
                  placeholder="Email"
                  type="email"
                  className="rounded-full p-6"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder="password"
                  type="password"
                  className="rounded-full p-6"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  placeholder="Confirm Password"
                  type="password"
                  className="rounded-full p-6"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button onClick={signupHandler} className="rounded-full p-6">
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="hidden items-center justify-center xl:flex">
          <img src={Background} alt="Background loin" className="h-[500px]" />
        </div>
      </div>
    </div>
  );
};

export default Auth;
