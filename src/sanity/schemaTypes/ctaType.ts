import {LinkIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const ctaType = defineType({
  name: 'cta',
  title: 'CTA',
  type: 'document',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'text',
      type: 'string',
    }),
    defineField({
        name: 'link',
        type: 'url',
    })
  ],
  preview: {
    select: {
      title: 'text'
    }
  },
})
