import React from 'react';
import ReactDOM from 'react-dom';

import _ from 'lodash';
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import { toBlob } from 'html-to-image';
import { IPost } from 'common/models';
import { PostThumbnail } from 'components/organism';

export const getRandomArbitrary = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

export const getRandomInt = (min: number, max: number): number => {
  return Math.floor(getRandomArbitrary(min, max));
};

export const parseDate = (date: Date | string): string => {
  return dayjs(date).format('YYYY년 MM월 DD일');
};

export const parseHtmlToBlob = async (id: string): Promise<Blob | null> => {
  if (typeof window === 'undefined') return null;

  const node = document.getElementById(id);

  const response: Blob = await toBlob(node);
  return response;
};
