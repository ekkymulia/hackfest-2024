"use client"
import UserCard from '@/components/ui/user/usercard'
import { auth } from '@/utils/firebase'
// import { Box } from '@/components/ui/styles/box'
// import { Flex } from '@/components/ui/styles/flex'
import { Button } from '@nextui-org/react'
import { useSessionStorage } from '@uidotdev/usehooks'
import { FirebaseError } from 'firebase/app'
import firebase from 'firebase/auth'
import React, { useEffect, useState } from 'react'

const page = () => {
  return (
    <div>Ini Halaman Dashboard</div>
  )
}

export default page