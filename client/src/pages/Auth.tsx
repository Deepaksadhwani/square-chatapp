import Victory from "@/assets/victory.svg";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
const Auth = () => {
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
            <Tabs>
              <TabsList>
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Signup</TabsTrigger>
              </TabsList>
              <TabsContent value="login"></TabsContent>
              <TabsContent value="singup"></TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
