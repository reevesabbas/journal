import React, { FC } from 'react'
import { SvgProps } from 'react-native-svg'

import WomanJournaling from '../../assets/images/WomanJournaling.svg'
import WomanLooking from '../../assets/images/WomanLooking.svg'
import BoysPushing from '../../assets/images/BoysPushing.svg'
import { TextInput } from 'react-native'

export interface ISlideInfo {
  id: number,
  title: string,
  description: string,
  image: FC<SvgProps>,
}

export const SLIDES: ISlideInfo[] = [
  {
    id: 1,
    title: 'Welcome to Journal!',
    description: 'A simple journaling app made with React Native, Expo & Tailwind CSS.',
    image: WomanJournaling,
  },
  {
    id: 2,
    title: 'What is your name?',
    description: 'You can change this later.',
    image: WomanLooking,
  },
  {
    id: 3,
    title: 'Get started!',
    description: 'Start Journaling your exciting days, and even boring ones.',
    image: BoysPushing,
  },
]