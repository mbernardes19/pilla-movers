import {BlockElementIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const sectionType = defineType({
  name: 'section',
  title: 'Section',
  type: 'document',
  icon: BlockElementIcon,
  fields: [
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
                options: {
                    list: [
                        {title: 'Cards', value: 'cards'},
                        {title: 'Slider', value: 'slider'}
                    ]
                }
            },
            {
                name: 'content_blocks',
                title: 'Content Blocks',
                type: 'array',
                of: [defineArrayMember({type: 'reference', to: {type: 'content'}})]
            }
        ]
    }),
    defineField({
      name: 'ctas',
      title: 'CTAs',
      type: 'array',
      of: [defineArrayMember({type: 'reference', to: {type: 'cta'}})],
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    })
  ],
  preview: {
    select: {
        title: 'title',
        subtitle: 'headline'
    }
  },
})
