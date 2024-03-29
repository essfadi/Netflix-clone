import Input from "@/components/Input";
import React from "react";
import axios from "axios";
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Auth = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [variant, setVariant] = React.useState('login')

  const toggleVariant = React.useCallback(() => {
    setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login')
  }, [])

  const login = React.useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/profiles'
      });
    } catch(e) {
      console.error(e);
    }
  }, [email, password]);
  
  const register = React.useCallback(
    async () => {
      try {    
        await axios.post('/api/register', {
          email,
          name,
          password
        });

        login();
      } catch (e) {
        console.error(e)
      }
    }, [email, login, name, password]
  );


  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <img src="/images/logo.png" alt="Netflix Logo" className="h-12" />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === 'login' ? 'Sign in' : 'Register'}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === 'register' && (
                <Input id="name" type="text" label="Username" onChange={(e: any) => setName(e.target.value)} value={name} />)}
              <Input id="email" type="email" label="Email" onChange={(e: any) => setEmail(e.target.value)} value={email} />
              <Input id="password" type="text" label="Password" onChange={(e: any) => setPassword(e.target.value)} value={password} />
            </div>
            <button onClick={variant === 'login'? login: register} className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
              {variant === 'login' ? 'Log In' : 'Sign up'}
            </button>
            <div className="flex flex-row items-center mt-8 justify-center gap-4">
                <div onClick={() => signIn('google', {callbackUrl: '/profiles'})} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                  <FcGoogle size={30} />
                </div>
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                  <FaGithub onClick={() => signIn('github', {callbackUrl: '/profiles'})} size={30} />
                </div>
            </div>
            <p className="text-neutral-500 mt-12">
              {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
              <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                {variant === 'login' ? 'Create an account' : 'Login'}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;