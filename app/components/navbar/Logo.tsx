"use client";

import Image from "next/image";

import Link from "next/link";
import { useRouter } from "next/navigation";
import React from 'react'

const Logo = () => {
    const router = useRouter();
  return (
      <Link href="/" className="flex- gap-2 flex-center">
    <Image
    onClick={() => router.push('/')} //reset categories
    alt="logo"
    className="hidden md:block cursor-pointer"
    height="32"
    width="32"
    src="/images/bamboo.svg"/>
    <h6 className='logo_text'>Bamboo Homes</h6>
      </Link>
  )
}

export default Logo;
