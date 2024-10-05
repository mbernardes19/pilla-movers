/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
        name: 'title',
        title: 'Title',
        type: 'string',
      }),
      defineField({
        name: 'slug',
        type: 'slug',
        options: {
          source: 'title',
        },
      }),
      defineField({
        name: 'hero',
        title: 'Hero',
        type: 'reference',
        to: [{type: 'section'}]
      }),
      defineField({
        name: 'sections',
        title: 'Sections',
        type: 'array',
        of: [
            defineArrayMember({type: 'reference', to: {type: 'section'}})
        ]
      }),
  ],
  preview: {
    select: {
      title: 'title'
    }
  },
})
