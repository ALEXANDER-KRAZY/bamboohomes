"use client";

import axios from 'axios';
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

const RegisterModal = () => {
    const registerModal = useRegisterModal(); //where we shall get our controls
    //lets add our login states
    const loginModal = useLoginModal();
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
            name: '',
            email: '',
            password: ''
        }
    });

const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    //initiate axios post through the register endpoint
    axios.post('/api/register', data)
    //we'll close the register modal after succesful registered
    .then(() => {
        toast.success('Registered');
        registerModal.onClose();
        loginModal.onOpen();
    })
    .catch((error) => {
        toast.error("Something went wrong");
    })
    .finally(() => {
        setIsLoading(false);
    })
}

//close the register modal and open the login
const toggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
}, [loginModal, registerModal]);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
            title="Welcome to Bamboo Homes"
            subtitle="Create an account" />
        <Input 
        id='email'
        label='Email'
        disabled={isLoading}
        required
        errors={errors}
        register={register}
        />
        <Input 
        id='name'
        label='Name'
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
            <div className="justify-center flex flex-row items-center gap-2"><div>Already have an Account?</div>
            <div 
            onClick={toggle}
            className='
            text-neutral-800
            cursor-pointer
            hover:underline'>Log in</div></div>
            </div>
        </div>
    )

  return (
    //create the fields
    <Modal
    disabled={isLoading}
    isOpen={registerModal.isOpen}
    title="Register"
    actionLabel="Continue"      
    onClose={registerModal.onClose}
    onSubmit={handleSubmit(onSubmit)}
    body={bodyContent}
    footer={footerContent}
    />
  );
}

export default RegisterModal;
