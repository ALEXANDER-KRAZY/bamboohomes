"use client";

import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import { useCallback, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import useRegisterModal from '@/app/hooks/useRegisterModal';
import useLoginModal from '@/app/hooks/useLoginModal';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import { toast } from 'react-hot-toast';
import Button from '../Button';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginModal = () => {
    const router =useRouter();

    const registerModal = useRegisterModal();//where we shall get our controls
    const loginModal = useLoginModal();  //lets add our login states

    const [ isLoading, setIsLoading] = useState(false);
    //use form
    const {
        register,
        handleSubmit,
        formState: {//where we are going to extract errors which will be equal to use form which will accept field values type
            //imported from react form which is a function which will have an object of default values where we will
            //set our default values which are name, email, password
            errors,
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    
    signIn('credentials', {
        ...data,
        redirect: false,
    })
    .then((callback) => {
        setIsLoading(false);

        if (callback?.ok) {
            toast.success('Logged in');
            router.refresh();
            loginModal.onClose();
        }
        if (callback?.error) {
            toast.error(callback.error);
        }
    })
}
    //close the login modal and open the register
    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
            title="Welcome back"
            subtitle="Login to your account" />
        <Input 
        id='email'
        label='Email'
        disabled={isLoading}
        required
        errors={errors}
        register={register}
        />
        <Input 
        id='password'
        type='password'
        label='Password'
        disabled={isLoading}
        required
        errors={errors}
        register={register}
        />
        </div>

    );
    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr />
            <Button
            outline
            label="Continue with Google"
            icon={FcGoogle}
            onClick={() => signIn('google')}
            />
            <Button
            outline
            label="Continue with Github"
            icon={AiFillGithub}
            onClick={() => signIn('github')}
            />
            <div className='
            text-neutral-500
            text-center
            mt-4
            font-light'>
            <div className="justify-center flex flex-row items-center gap-2"><div>First time in Bamboo Homes?</div>
            <div 
            onClick={toggle}
            className='
            text-neutral-800
            cursor-pointer
            hover:underline'>Create an account</div></div>
            </div>
        </div>
    )

  return (
    //create the fields
    <Modal
    disabled={isLoading}
    isOpen={loginModal.isOpen}
    title="Login"
    actionLabel="Continue"
    onClose={loginModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  );
}

export default LoginModal
