/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {DocumentIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const navigationType = defineType({
  name: 'navigation',
  title: 'Navigation',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
        name: 'internal_title',
        title: 'Internal Title',
        type: 'string'
    }),
    defineField({
        name: 'logo',
        title: 'Logo',
        type: 'image'
    }),
    defineField({
        name: 'pages',
        title: 'Pages',
        type: 'array',
        of: [
            defineArrayMember({type: 'reference', to: {type: 'page'}})
        ]
    }),
    defineField({
        name: 'content_blocks',
        title: 'Content Blocks',
        type: 'array',
        of: [defineArrayMember({
            type: 'object',
            name: 'content_block',
            title: 'Content Block',
            fields: [{
                name: 'content',
                type: 'blockContent',
            }],
            preview: {
                select: {
                    title: 'content'
                }
            }
        })]
    }),
  ],
  preview: {
    select: {
      title: 'internal_title'
    }
  },
})