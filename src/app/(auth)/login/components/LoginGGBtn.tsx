import { useDisplay } from "@/app/hooks/useDisplay";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";

function LoginGGBtn({
  onSuccess,
}: {
  onSuccess: (res: CredentialResponse) => void;
}) {
  const { width, sm } = useDisplay();

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GG_CLIENT_ID}>
      <GoogleLogin
        onSuccess={onSuccess}
        useOneTap
        text="continue_with"
        use_fedcm_for_prompt
        width={sm ? Math.min(width, 400) - 16 * 2 - 20 * 2 : 360}
      />
    </GoogleOAuthProvider>
  );
}

export default LoginGGBtn;
