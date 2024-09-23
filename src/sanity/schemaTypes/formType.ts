import {defineArrayMember, defineField, defineType} from 'sanity'
import {BillIcon} from '@sanity/icons'

export const formType = defineType({
  name: 'form',
  title: 'Form',
  type: 'document',
  icon: BillIcon,
  fields: [
    defineField({
        name: 'internal_title',
        title: 'Internal Title',
        type: 'string',
      }),
      defineField({
        name: 'steps',
        title: 'Steps',
        type: 'array',
        options: {
            sortable: false
        },
        of: [defineArrayMember({
            type: 'object',
            fields: [
                {
                    name: 'id',
                    type: 'number'
                },
                {
                    name: 'question',
                    type: 'blockContent'
                },
                {
                    name: 'options',
                    type: 'array',
                    of: [defineArrayMember({
                        type: 'object',
                        fields: [
                            {
                                name: 'icon',
                                type: 'image'
                            },
                            {
                                name: 'label',
                                type: 'string'
                            }
                        ]
                    })]
                },
            ],
            preview: {
                select: {
                    title: 'question'
                }
            }
        })]
      }),
  ],
  preview: {
    select: {
      title: 'title'
    }
  },
})
