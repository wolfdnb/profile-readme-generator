import dynamic from 'next/dynamic';

import { textSectionParser } from './parser';
import { defaultTextSectionConfig } from './default-config';

import { events } from '@events';
import { PanelsEnum, Sections } from 'types';

const feature = {
  id: 'text',

  presentation: {
    [PanelsEnum.NEW_SECTION]: {
      icon: 'type',
      onClick: () => events.canvas.add(Sections.TEXT),
      name: 'Text',
    },

    sections: {
      component: dynamic(() =>
        import('./section').then(
          mod => mod.TextSection,
          () => () => null
        )
      ),
      parser: {
        readme: textSectionParser,
      },
      defaultConfig: defaultTextSectionConfig,
    },

    panels: dynamic(() =>
      import('./panel').then(
        mod => mod.TextEditPanel,
        () => () => null
      )
    ),
  },
};

events.extensions.register(feature);
