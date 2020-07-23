<template>
  <div class="editor">
    <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
      <div class="menubar">
        <div class="menubar__group">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bold() }"
            @click="commands.bold"
          >
            <font-awesome-icon icon="bold" size="sm" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.italic() }"
            @click="commands.italic"
          >
            <font-awesome-icon icon="italic" size="sm" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.underline() }"
            @click="commands.underline"
          >
            <font-awesome-icon icon="underline" size="sm" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.strike() }"
            @click="commands.strike"
          >
            <font-awesome-icon icon="strikethrough" size="sm" />
          </button>
        </div>
        <div class="menubar__group">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.paragraph() }"
            @click="commands.paragraph"
          >
            <font-awesome-icon icon="paragraph" size="sm" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 1 }) }"
            @click="commands.heading({ level: 1 })"
          >
            H1
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 2 }) }"
            @click="commands.heading({ level: 2 })"
          >
            H2
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.heading({ level: 3 }) }"
            @click="commands.heading({ level: 3 })"
          >
            H3
          </button>
        </div>
        <div class="menubar__group">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.subscript() }"
            @click="commands.subscript"
          >
            <font-awesome-icon icon="subscript" size="sm" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.superscript() }"
            @click="commands.superscript"
          >
            <font-awesome-icon icon="superscript" size="sm" />
          </button>
        </div>
        <div class="menubar__group">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.bullet_list() }"
            @click="commands.bullet_list"
          >
            <font-awesome-icon icon="list-ul" size="sm" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.ordered_list() }"
            @click="commands.ordered_list"
          >
            <font-awesome-icon icon="list-ol" size="sm" />
          </button>

          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.blockquote() }"
            @click="commands.blockquote"
          >
            <font-awesome-icon icon="quote-right" size="sm" />
          </button>
        </div>
        <div class="menubar__group">
          <button
            class="menubar__button"
            :class="{ 'is-active': isActive.code_block() }"
            @click="commands.code_block"
          >
            <font-awesome-icon icon="code" size="sm" />
          </button>

          <button class="menubar__button" @click="commands.horizontal_rule">
            __
          </button>

          <button class="menubar__button" @click="commands.undo">
            <font-awesome-icon icon="undo" size="sm" />
          </button>

          <button class="menubar__button" @click="commands.redo">
            <font-awesome-icon icon="redo" size="sm" />
          </button>
        </div>
        <div class="menubar__group">
          <button
            class="menubar__button"
            @click="
              commands.createTable({
                rowsCount: 3,
                colsCount: 3,
                withHeaderRow: false
              })
            "
          >
            <font-awesome-icon icon="table" size="sm" />
          </button>
          <span v-if="isActive.table()">
            <button class="menubar__button" @click="commands.deleteTable">
              <font-awesome-icon icon="delete_table" size="sm" />
            </button>
            <button class="menubar__button" @click="commands.addColumnBefore">
              <font-awesome-icon icon="add_column_before" size="sm" />
            </button>
            <button class="menubar__button" @click="commands.addColumnAfter">
              <font-awesome-icon icon="add_column_after" size="sm" />
            </button>
            <button class="menubar__button" @click="commands.deleteColumn">
              <font-awesome-icon icon="delete_column" size="sm" />
            </button>
            <button class="menubar__button" @click="commands.addRowBefore">
              <font-awesome-icon icon="add_row_before" size="sm" />
            </button>
            <button class="menubar__button" @click="commands.addRowAfter">
              <font-awesome-icon icon="add_row_after" size="sm" />
            </button>
            <button class="menubar__button" @click="commands.deleteRow">
              <font-awesome-icon icon="delete_row" size="sm" />
            </button>
            <button class="menubar__button" @click="commands.toggleCellMerge">
              <font-awesome-icon icon="combine_cell" size="sm" />
            </button>
          </span>
        </div>
      </div>
    </editor-menu-bar>
    <editor-content :editor="editor" class="editor__content" />
  </div>
</template>

<script>
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough,
  faParagraph,
  faListUl,
  faListOl,
  faQuoteRight,
  faCode,
  faUndo,
  faRedo,
  faSubscript,
  faSuperscript,
  faLink,
  faTimes,
  faSpinner,
  faTable
} from '@fortawesome/free-solid-svg-icons'
import { faDeleteTable } from './Icon/faDeleteTable'
import { faAddColumnBefore } from './Icon/faAddColumnBefore'
import { faAddColumnAfter } from './Icon/faAddColumnAfter'
import { faDeleteColumn } from './Icon/faDeleteColumn'
import { faAddRowBefore } from './Icon/faAddRowBefore'
import { faAddRowAfter } from './Icon/faAddRowAfter'
import { faDeleteRow } from './Icon/faDeleteRow'
import { faCombineCell } from './Icon/faCombineCell'
import Subscript from './tiptap/Subscript'
import Superscript from './tiptap/Superscript'
library.add(
  faBold,
  faItalic,
  faUnderline,
  faStrikethrough,
  faParagraph,
  faListUl,
  faListOl,
  faQuoteRight,
  faCode,
  faUndo,
  faRedo,
  faSubscript,
  faSuperscript,
  faLink,
  faTimes,
  faSpinner,
  faTable,
  faDeleteTable,
  faAddColumnBefore,
  faAddColumnAfter,
  faDeleteColumn,
  faAddRowBefore,
  faAddRowAfter,
  faDeleteRow,
  faCombineCell
)
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Table,
  TableHeader,
  TableCell,
  TableRow
} from 'tiptap-extensions'

export default {
  props: {
    content: String,
    editable: Boolean
  },
  name: 'GymProblemView',
  components: {
    EditorContent,
    EditorMenuBar,
    'font-awesome-icon': FontAwesomeIcon
  },
  data() {
    return {
      editor: new Editor({
        editable: this.editable,
        content: this.content,
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Subscript(),
          new Superscript(),
          new Table({
            resizable: true
          }),
          new TableHeader(),
          new TableCell(),
          new TableRow()
        ],
        onUpdate: ({ getHTML }) => {
          const newContent = getHTML()
          this.$emit('onDataUpdate', newContent)
        }
      })
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Ubuntu&display=swap');
.editor {
  font-family: Ubuntu, Helvetica, sans-serif;
  .menubar {
    width: 100%;
    // height: 30px;
    display: inline-block;
    position: relative;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    // overflow-x: scroll;
    // white-space: nowrap;
    .menubar__group {
      display: inline-block;
      margin: 0 0.5rem;
      padding: 0.5rem 0;
      .menubar__button {
        padding: 0.2rem 0.5rem;
        color: #000;
        border: 0;
        border-radius: 3px;
        margin-right: 0.2rem;
        cursor: pointer;
        font: 400 14px system-ui;
        background-color: rgba(0, 0, 0, 0);
      }
      .menubar__button.is-active {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
  }
  .editor__content {
    padding: 0.5rem 0.5rem;
    .resize-cursor {
      cursor: col-resize;
    }
    table {
      border-collapse: collapse;
      table-layout: fixed;
      width: 90%;
      margin: 0;
      overflow: hidden;
      margin: 0 auto;
      th {
        font-weight: 700;
        text-align: left;
        min-width: 1em;
        border: 2px solid #ddd;
        padding: 3px 5px;
        vertical-align: top;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;
      }
      td {
        min-width: 1em;
        border: 2px solid #ddd;
        padding: 3px 5px;
        vertical-align: top;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        position: relative;

        .column-resize-handle {
          position: absolute;
          right: -2px;
          top: 0;
          bottom: 0;
          width: 4px;
          z-index: 20;
          background-color: #adf;
          pointer-events: none;
        }
      }
      .selectedCell::after {
        z-index: 2;
        position: absolute;
        content: '';
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: rgba(200, 200, 255, 0.4);
        pointer-events: none;
      }
    }
    blockquote {
      border-left: 3px solid rgba(0, 0, 0, 0.1);
      color: rgba(0, 0, 0, 0.8);
      padding-left: 0.8rem;
      font-style: italic;
      p {
        margin: 0;
      }
    }
  }
}
</style>
