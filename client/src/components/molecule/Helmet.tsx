import React from 'react';
import { DefaultSeo, NextSeo } from 'next-seo';
import { defaultHelmet, HelmetProps, HelmetType } from 'common/helmet';

export const DefaultHelmet = (): React.ReactElement => {
  const { title, description, image, url }: HelmetType = defaultHelmet;
  return (
    <DefaultSeo
      nofollow={false}
      noindex={false}
      title={title}
      description={description}
      canonical={url}
      openGraph={{
        url,
        title,
        description,
        images: [
          {
            url: image,
            width: 1200,
            height: 627,
            alt: 'thumbnail',
          },
        ],
        site_name: title,
      }}
      twitter={{
        cardType: 'summary_large_image',
        site: '@boilerplate',
        handle: '@boilerplate',
      }}
    />
  );
};

export function Helmet({ helmet, index = true, follow = true }: HelmetProps): JSX.Element {
  const { title, description, image, url } = helmet;

  return (
    <NextSeo
      nofollow={!follow}
      noindex={!index}
      title={title}
      description={description}
      canonical={url}
      openGraph={{
        url,
        title,
        description,
        images: [
          {
            url: image,
            width: 1200,
            height: 627,
            alt: 'thumbnail',
          },
        ],
        site_name: title,
      }}
      twitter={{
        cardType: 'summary_large_image',
        site: '@alpoxdev',
        handle: '@alpoxdev',
      }}
    />
  );
}
