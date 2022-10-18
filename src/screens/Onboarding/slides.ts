import React, { FC } from 'react'
import { SvgProps } from 'react-native-svg'
import WomanJournaling from '../../assets/images/WomanJournaling.svg'

export interface ISlideInfo {
  id: string,
  title: string,
  description: string,
  image: FC<SvgProps>,
}

export const SLIDES: ISlideInfo[] = [
  {
    id: '1',
    title: 'Welcome to Journal!',
    description: 'Bunch of text here about why this app is cool. Bunch of text here about why this app is cool. Bunch of text here about why this app is cool.',
    image: WomanJournaling,
  },
  {
    id: '2',
    title: 'Enter your name.',
    description: 'Bunch of text here about why this app is cool. Bunch of text here about why this app is cool. Bunch of text here about why this app is cool.',
    image: WomanJournaling,
  },
]