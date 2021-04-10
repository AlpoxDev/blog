export type HelmetType = {
  title: string;
  description?: string;
  image?: string;
  url?: string;
};

export interface HelmetProps {
  helmet: HelmetType;
  index?: boolean;
  follow?: boolean;
}

export const defaultHelmet: HelmetType = {
  title: 'Hi, This is Alpox.',
  description: 'Tech Blog',
  image: '',
  url: 'https://alpox.dev',
};

export const customHelmet = (props: HelmetType): HelmetType => ({
  title: props.title || defaultHelmet.title,
  description: props.description || defaultHelmet.description,
  image: props.image || defaultHelmet.image,
  url: props.url || defaultHelmet.url,
});
