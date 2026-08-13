import type { CmsBundle } from '~/types/cms'
import { cmsBundle } from '~/data/cms'

/**
 * Static site copy. Not stored in useState so it is not duplicated in the SSR payload.
 */
export function useCmsBundle() {
  const cms = shallowRef<CmsBundle>(cmsBundle)
  return { cms }
}
