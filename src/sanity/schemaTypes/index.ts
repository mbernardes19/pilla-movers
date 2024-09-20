import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { sectionType } from './sectionType'
import { ctaType } from './ctaType'
import { contentType } from './contentType'
import { pageType } from './pageType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, ctaType, sectionType, contentType, pageType],
}
