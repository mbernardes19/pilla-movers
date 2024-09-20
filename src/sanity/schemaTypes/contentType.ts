import {DocumentIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const contentType = defineType({
  name: 'content',
  title: 'Content',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'content',
      type: 'blockContent',
    }),
  ],
  preview: {
    select: {
      title: 'content'
    }
  },
})
