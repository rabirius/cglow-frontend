import { Mark } from 'tiptap'
import { toggleMark } from 'tiptap-commands'

export default class Subscript extends Mark {
  get name() {
    return 'subscript'
  }

  get schema() {
    return {
      parseDOM: [{ tag: 'sub' }],
      toDOM: () => ['sub', 0]
    }
  }

  commands({ type }) {
    return () => toggleMark(type)
  }

  // eslint-disable-next-line no-unused-vars
  inputRules({ type }) {
    return []
  }
}
