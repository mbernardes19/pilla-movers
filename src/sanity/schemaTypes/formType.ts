/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
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
            name: 'step',
            title: 'Step',
            type: 'object',
            fields: [
                defineField({
                    name: 'id',
                    type: 'number'
                }),
                defineField({
                    name: 'question',
                    type: 'blockContent'
                }),
                defineField({
                    name: 'options',
                    type: 'array',
                    of: [defineArrayMember({
                        name: 'option',
                        type: 'object',
                        fields: [
                            defineField({
                                name: 'icon',
                                type: 'image'
                            }),
                            defineField({
                                name: 'label',
                                type: 'string'
                            })
                        ]
                    })]
                }),
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
