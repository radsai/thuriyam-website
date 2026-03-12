import type { NavItem } from '@/components/Layout/MainNavigation';

export const v3NavItems: NavItem[] = [
  {
    label: 'Platform',
    children: [
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
