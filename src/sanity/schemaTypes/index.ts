import { type SchemaTypeDefinition } from 'sanity'

import { blockContentType } from './blockContentType'
import { sectionType } from './sectionType'
import { pageType } from './pageType'
import { formType } from './formType'
import { ctaType } from './ctaType'
import { navigationType } from './navigationType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContentType, sectionType, pageType, formType, ctaType, navigationType],
}
