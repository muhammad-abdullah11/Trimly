import VerifyAccountClient from "./VerifyAccountClient";

interface VerifyAccountProps {
  params: Promise<{ email: string }>;
}

const VerifyAccount = async ({ params }: VerifyAccountProps) => {
  const { email } = await params;

  return <VerifyAccountClient email={email} />;
};

export default VerifyAccount;