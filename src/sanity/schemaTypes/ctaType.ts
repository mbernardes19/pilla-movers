/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {CheckmarkCircleIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export const ctaType = defineType({
  name: 'cta',
  title: 'CTA',
  type: 'document',
  icon: CheckmarkCircleIcon,
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
            scheme: ['http', 'https', 'tel', 'mailto']
        }),
    }),
    defineField({
        name: 'iconOnly',
        title: 'Display only the icon',
        type: 'boolean'
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
