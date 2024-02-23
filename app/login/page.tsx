"use client"

import { Button } from '@radix-ui/themes';
import { useAuthStore } from "../store";

const LoginPage = () => {
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);

  const username = user?.goggleFirstName;

  const openGoogleLoginPage = () => {
    const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const scope = [
      'https://www.googleapis.com/auth/userinfo.email',
      'https://www.googleapis.com/auth/userinfo.profile',
    ].join(' ');

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_CLIENT_ID!,
      redirect_uri: `${process.env.NEXT_PUBLIC_REACT_APP_GOGGLE_REDIRECT_URL_ENDPOINT}/google`,
      prompt: 'select_account',
      access_type: 'offline',
      scope,
    });

    window.location.href = `${googleAuthUrl}?${params}`;
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {!username ? (
        <Button
          onClick={openGoogleLoginPage}
          className="bg-white text-gray-800 font-bold py-2 px-4 border rounded shadow focus:outline-none mb-8"
        >
          Sign in with Google
        </Button>
      ) : (
        <div className="text-center">
          <p className="text-primary-600">User is logged as: {username}</p>
          <Button
            onClick={logout}
            className="bg-red-400 hover:bg-red-200 text-white font-semibold py-2 px-4 rounded mt-2"
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
