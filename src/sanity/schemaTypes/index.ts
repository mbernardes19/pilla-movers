import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { sectionType } from './sectionType'
import { pageType } from './pageType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, sectionType, pageType],
}
