"use client";

import React from 'react';
import Container from "../Container";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";
import { SafeUser } from '@/app/types';
import Categories from './Categories';
import { MdOutlineConstruction } from "react-icons/md";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser
}) => {
  return (
    <div className='fixed w-full bg-white z-10 shadow-sm'>
      <div className='
      py-4
      border-b-[1px]'>
        <Container>
          <div
          className='
          flex
          flex-row
          items-center
          justify-between
          gap-3
          md:gap-0'>
            <Logo />
            <Search/>
            <div className="
            p-2
            bg-orange-500
            rounded-full
            text-white">
            <MdOutlineConstruction size={50}/>
            </div>
            <div className="hidden sm:block bg-red-500 text-white rounded-full">
                Site under Construction !!!
            </div>
            <UserMenu currentUser={currentUser}/>
            </div>
        </Container>
      </div>
      <Categories/>
    </div>
  )
}

export default Navbar
