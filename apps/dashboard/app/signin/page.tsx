import { SignInScreen } from "../../components/auth/SignInScreen";
import { featureFlags } from "../../lib/featureFlags";

type PageProps = {
  searchParams?: {
    mode?: string | string[];
  };
};

export default function SignInPage({ searchParams }: PageProps) {
  const mode =
    typeof searchParams?.mode === "string"
      ? searchParams.mode
      : searchParams?.mode?.[0];

  const initialMode = mode === "signup" ? "signUp" : "signIn";

  return (
    <SignInScreen
      initialMode={initialMode}
      magicLinkEnabled={featureFlags.magicLinkAuth}
    />
  );
}
