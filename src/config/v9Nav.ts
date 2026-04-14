import type { NavItem } from '@/types/nav';

/** Navigation for Home v9 only — mirrors v4 destinations; logo points to /v9 */
export const v9NavItems: NavItem[] = [
  {
    label: 'Platform',
    children: [
      { label: 'Overview', path: '/platform/overview' },
      { label: 'Studio', path: '/platform/studio/v3' },
      { label: 'IQA', path: '/platform/iqa' },
    ],
  },
  {
    label: 'Solutions',
    children: [
      { label: 'By Function', path: '/solutions/horizontal' },
      { label: 'Demo', path: '/solutions/demo' },
    ],
  },
  {
    label: 'Resources',
    children: [{ label: 'Blog', path: '/resources/blog' }],
  },
];
