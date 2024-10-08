/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import {BlockElementIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const sectionType = defineType({
  name: 'section',
  title: 'Section',
  type: 'document',
  icon: BlockElementIcon,
  fields: [
    defineField({
        name: 'internal_title',
        title: 'Internal Title',
        type: 'string',
      }),
    defineField({
      name: 'headline',
      type: 'string',
    }),
    defineField({
        name: 'subheadline',
        type: 'string',
    }),
    defineField({
        name: 'background_color',
        title: 'Background Color',
        type: 'string',
        initialValue: 'primary',
        options: {
            list: [
                {title: 'Primary', value: 'primary'},
                {title: 'Secondary', value: 'secondary'}
            ]
        }
    }),
    defineField({
        name: 'mainImage',
        type: 'image',
        options: {
          hotspot: true,
        },
        fields: [
          {
            name: 'alt',
            type: 'string',
            title: 'Alternative text',
          }
        ]
    }),
    defineField({
        name: 'video_background',
        title: 'Video Background',
        type: 'file',
        options: {
            accept: 'video/*'
        }
    }),
    defineField({
        name: 'content',
        type: 'object',
        fields: [
            {
                name: 'render_as',
                title: 'Render As',
                type: 'string',
                initialValue: 'text',
                options: {
                    list: [
                        {title: 'Text', value: 'text'},
                        {title: 'Cards', value: 'cards'},
                        {title: 'Slider', value: 'slider'},
                        {title: 'Testimonials', value: 'testimonials'},
                    ]
                }
            },
            {
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
            }
        ]
    }),
    defineField({
        name: 'ctas',
        title: 'CTAs',
        type: 'array',
        of: [
            defineArrayMember({type: 'reference', to: {type: 'cta'}})
        ]
      }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    })
  ],
  preview: {
    select: {
        title: 'internal_title',
        subtitle: 'headline'
    }
  },
})
