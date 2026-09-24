import PhoneAuthFlow from "@/components/auth/phone-auth-flow";
import Logo from "@/components/landing-page/logo";

const page = async () => {
  // const session = await auth.api.getSession({ headers: await headers() });
  // if (session) {
  //   redirect("/");
  // }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-10">
      <Logo />

      <PhoneAuthFlow />
    </div>
  );
};

export default page;
