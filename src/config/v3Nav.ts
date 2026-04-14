import type { NavItem } from '@/types/nav';

export const v3NavItems: NavItem[] = [
  {
    label: 'Platform',
    children: [
      { label: 'Overview', path: '/platform/overview' },
      { label: 'Studio', path: '/platform/studio/v3' },
    ],
  },
  {
    label: 'Solutions',
    children: [
      { label: 'By Function', path: '/solutions/horizontal' },
      { label: 'IQA', path: '/platform/iqa' },
    ],
  },
  {
    label: 'Resources',
    children: [
      { label: 'Blog', path: '/resources/blog' },
    ],
  },
];
