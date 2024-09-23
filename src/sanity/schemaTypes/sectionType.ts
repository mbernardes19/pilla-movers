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
        name: 'title',
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
        name: 'content',
        type: 'object',
        fields: [
            {
                name: 'render_as',
                title: 'Render As',
                type: 'string',
                initialValue: 'cards',
                options: {
                    list: [
                        {title: 'Cards', value: 'cards'},
                        {title: 'Slider', value: 'slider'},
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
      of: [defineArrayMember({
        type: 'object',
        name: 'cta',
        title: 'CTA',
        fields: [
            {
                name: 'text',
                type: 'string'
            },
            {
                name: 'link',
                type: 'url',
                validation: (Rule) => Rule.uri({
                    allowRelative: true
                })
            },
            {
                name: 'icon',
                type: 'image'
            }
        ]
    })],
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
