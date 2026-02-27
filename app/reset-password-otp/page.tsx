
import ResetPassword from "./resetPassword";

interface PageProps {
  searchParams: {
    email: string;
  };
}

const Page = async ({ searchParams }: PageProps) => {
  const params = await searchParams;
  const email = params.email;

  return (
    <>
      <ResetPassword email={email} />
    </>
  );
};

export default Page;
