import type { NavItem } from '@/types/nav';

/** Navigation for Home v10 — logo points to /v10 (latest) */
export const v10NavItems: NavItem[] = [
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
