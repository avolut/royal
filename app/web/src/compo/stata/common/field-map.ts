import { FieldSelect } from '../field/select'
import { FieldText } from '../field/text'
import { FieldUnknown } from '../field/unknown'

export type FieldKeyType = keyof typeof FieldMapping
export const FieldMapping = {
  string: FieldText,
  password: FieldText,
  int: FieldText,
  select: FieldSelect,
  unknown: FieldUnknown,
  datetime: FieldUnknown,
  date: FieldUnknown,
  time: FieldUnknown,
  'view-row': FieldUnknown
}

export type FieldProps = {
  type: 'string' | 'text'
  required?: boolean
  placeholder?: string
}
