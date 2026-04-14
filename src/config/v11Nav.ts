import type { NavItem } from '@/types/nav';

/** Home v11 — light layout; logo → /v11 */
export const v11NavItems: NavItem[] = [
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
