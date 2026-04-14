/**
 * Version routes for pages with multiple versions.
 * Versions are displayed in descending order in the version selector.
 */

export interface VersionRoute {
  path: string;
  label: string;
}

export interface PageVersionConfig {
  /** Path prefix to match (e.g. '/' for home, '/platform/studio' for studio) */
  pathPrefix: string;
  /** Exact path for root/default (e.g. '/' or '/platform/studio') */
  rootPath: string;
  /** Page name for dropdown label */
  pageName: string;
  /** Versions in descending order (newest first) */
  versions: VersionRoute[];
}

/**
 * Check if path matches this config's versioned routes
 */
const matchesPath = (config: PageVersionConfig, pathname: string): boolean => {
  if (config.pathPrefix === '/') {
    return pathname === '/' || pathname.startsWith('/v');
  }
  return pathname === config.rootPath || pathname.startsWith(config.pathPrefix + '/v');
};

/**
 * Get the version config for the current path, if any
 */
export const getVersionConfigForPath = (pathname: string): PageVersionConfig | null => {
  for (const config of VERSION_CONFIGS) {
    if (matchesPath(config, pathname)) {
      return config;
    }
  }
  return null;
};

/**
 * All versioned page configs.
 * Versions array is in descending order (newest first).
 */
export const VERSION_CONFIGS: PageVersionConfig[] = [
  {
    pathPrefix: '/',
    rootPath: '/',
    pageName: 'Home',
    versions: [
      { path: '/v4', label: 'v4' },
      { path: '/v3', label: 'v3' },
    ],
  },
  {
    pathPrefix: '/platform/studio',
    rootPath: '/platform/studio',
    pageName: 'Studio',
    versions: [
      { path: '/platform/studio/v3', label: 'v3' },
      { path: '/platform/studio/v1', label: 'v1' },
    ],
  },
  {
    pathPrefix: '/developers',
    rootPath: '/developers',
    pageName: 'Developers',
    versions: [
      { path: '/developers/v2', label: 'v2' },
    ],
  },
  {
    pathPrefix: '/prelaunch',
    rootPath: '/prelaunch',
    pageName: 'Prelaunch',
    versions: [
      { path: '/prelaunch/v8', label: 'v8' },
      { path: '/prelaunch/v7', label: 'v7' },
      { path: '/prelaunch/v6', label: 'v6' },
      { path: '/prelaunch/v5', label: 'v5' },
      { path: '/prelaunch/v4', label: 'v4' },
      { path: '/prelaunch/v3', label: 'v3' },
      { path: '/prelaunch/v2', label: 'v2' },
      { path: '/prelaunch/v1', label: 'v1' },
      { path: '/prelaunch/v0', label: 'v0' },
    ],
  },
];
