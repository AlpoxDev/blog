import React from 'react';

import { Text } from 'components/atom';

const isDEV = process.env.NODE_ENV === 'development';

const Page = (): React.ReactElement | null => {
  if (!isDEV) return null;

  return (
    <>
      <Text.H1 location={{ padding: { top: '2rem' } }}>H1</Text.H1>
      <Text.H2 location={{ top: '.5rem' }}>H2</Text.H2>
      <Text.H3 location={{ top: '.5rem' }}>H3</Text.H3>
      <Text.H4 location={{ top: '.5rem' }}>H4</Text.H4>
      <Text.H5 location={{ top: '.5rem' }}>H5</Text.H5>
      <Text.Content location={{ top: '.5rem' }}>Content</Text.Content>
      <Text.Label location={{ top: '.5rem' }}>Label</Text.Label>

      <Text.Content location={{ top: '1rem', padding: { left: '1rem' } }}>
        This is <Text.Accent>Alpox</Text.Accent>
      </Text.Content>

      <Text.Content location={{ top: '1rem', padding: { left: '1rem' } }} fontFamily="inter">
        This is <Text.Accent>Alpox</Text.Accent>
      </Text.Content>
    </>
  );
};

export default Page;
