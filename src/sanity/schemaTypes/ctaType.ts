/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {BlockElementIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const ctaType = defineType({
  name: 'cta',
  title: 'CTA',
  type: 'document',
  icon: BlockElementIcon,
  fields: [
    defineField({
        name: 'text',
        type: 'string'
    }),
    defineField({
        name: 'link',
        type: 'url',
        validation: (Rule) => Rule.uri({
            allowRelative: true,
            scheme: ['https', 'tel']
        }),
    }),
    defineField({
        name: 'icon',
        type: 'image'
    }),
    defineField({
        name: 'type',
        type: 'string',
        initialValue: 'primary',
        options: {
            list: [
                {title: 'Primary', value: 'primary'},
                {title: 'Secondary', value: 'secondary'},
            ]
        }
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    })
  ],
  preview: {
    select: {
        title: 'text'
    }
  },
})
