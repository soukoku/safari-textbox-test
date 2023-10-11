<template>
  <div class="relative flex w-full h-full rounded-none">
    <textarea v-if="isMultiline" ref="textarea" :style="textboxStyle"
      class="w-full h-full placeholder-gray-700 border-0 rounded-none resize-none focus:border-none focus:outline-none safari-fix"
      :class="{
        'cursor-pointer': true,
        'select-none': displayOnly
      }" :readonly="displayOnly" @input="handleTextChange" :placeholder="field.tip" :title="field.tip"
      @focus="selectField" :disabled="disabled" />
    <input :style="textboxStyle"
      class="w-full h-full placeholder-gray-700 border-0 rounded-none focus:border-none focus:outline-none safari-fix"
      :class="{
        'cursor-pointer': true,
        'select-none': displayOnly
      }" ref="input" :readonly="displayOnly" @change="handleTextChange" type="text" :placeholder="placeholder"
      :title="placeholder" v-cleave="cleaveOptions" :disabled="disabled" @click.stop="handleClick" @keydown="handleKey" />

    <!-- <span>cur prop value = {{field.textProps?.value}}</span> -->
    <div class="absolute inset-y-0 flex items-center right-1" v-if="isEditableDate">
      <!-- <df-calendar-button ref="calButton" :format="field.textProps?.format || 'MM/dd/yyyy'"
        :model-value="field.textProps?.value || ''" :icon-size="calendarIconSize" @update:model-value="handlePickerChange"
        placement="bottom-end" /> -->
    </div>
  </div>
</template>
<script>
import { clamp } from '../formatters'
import { defineComponent } from 'vue'

import Cleave from 'cleave.js'
// import CleavePhone from 'cleave.js/dist/addons/cleave-phone.us.js'

// make use of imported cleave phone somehow
// or it'll get excluded in build
// const dummy = CleavePhone.toString()

const cleave = {
  mounted: (el, binding) => {
    if (binding.value) el.cleave = new Cleave(el, binding.value)
  },
  // updated: (el) => {
  //   if (el.cleave) {
  //     const event = new Event('input', { bubbles: true })
  //     setTimeout(function () {
  //       el.value = el.cleave.properties.result
  //       el.dispatchEvent(event)
  //     }, 100)
  //   }
  // },
  beforeUnmount: el => {
    // console.log('should destroy')
    el.cleave?.destroy()
  }
}

// const CleaveSSN = {
//   numericOnly: true,
//   delimiter: '-',
//   blocks: [3, 2, 4]
// }
// const CleavePhoneUS = {
//   phone: true,
//   phoneRegionCode: 'US',
//   delimiter: '-'
// }

export default defineComponent({
  directives: {
    cleave
  },
  props: {
    disabled: Boolean,
    placeholder: String
  },
  computed: {
    displayOnly() { return false },
    isMultiline() { return false },
    textboxStyle() {
      return {
        fontFamily: this.fontNameCss,
        fontSize: this.fontSizeCss,
        // lineHeight: this.lineHeightCss,
        fontStyle: this.fontStyleCss,
        fontWeight: this.fontWeightCss,
        color: this.colorCss,
        backgroundColor: this.backColorCss,
        textAlign: this.textAlignCss,
        padding: '1px'
        // marginRight: this.isEditableDate ? '2.5rem' : '0'
      }
    },
    isFilled() {
      return !!this.field.textProps?.value
    },
    fontNameCss() {
      return 'Helvetica, sans-serif'
      // const font = this.field.appr.font
      // return font && font.name ? font.name + ',sans-serif' : 'sans-serif'
    },
    fontSizeCss() {
      return '13.8562px'
    },
    calendarIconSize() {
      let proposed = 24
      // const fieldH = (this.field.appr?.h || 0) * this.pageSize.scale / window.devicePixelRatio
      // if (fieldH) {
      //   proposed = fieldH - 10
      // }
      return clamp(proposed, 12, 24)
    },
    // lineHeightCss() {
    //   const font = this.field.appr.font
    //   if (font && font.h) {
    //     // needs to recalc based on page size
    //     const ftRatio = font.h / this.pageSize.height
    //     const ftPix = this.pagePixelSize.height * ftRatio
    //     return ftPix + 'px'
    //   }
    //   return 'inherit'
    // },
    fontStyleCss() {
      // const font = this.field.appr.font
      // return font && (font.style & FontStyle.Italic) > 0 ? 'italic' : 'normal'
      return 'normal'
    },
    fontWeightCss() {
      // const font = this.field.appr.font
      // return font && (font.style & FontStyle.Bold) > 0 ? 'bold' : 'normal'
      return 'normal'
    },
    colorCss() {
      // return this.field.appr.fg || 'inherit'
      return 'rgb(0,0,0)'
    },
    backColorCss() {
      // return (
      //   this.field.appr.bg ||
      //   (this.displayOnly ? 'inherit' : 'rgba(250,250,250,.8)')
      // )
      return 'rgba(0,0,0,.11)'
    },
    textAlignCss() {
      // if (this.field.textProps?.hAlign) {
      //   switch (this.field.textProps.hAlign) {
      //     case HAlign.Center:
      //       return 'center'
      //     case HAlign.Right:
      //       return 'right'
      //     case HAlign.Justify:
      //       return 'justify'
      //   }
      // }
      return 'left'
    },
    isEditableDate() {
      return false
      // return (
      //   this.field.type === FieldType.Text &&
      //   !this.field.readOnly &&
      //   this.field.textProps?.textType === TextType.Date
      // )
    },
    isNumber() {
      return false
      // return this.field.textProps?.textType === TextType.Number
    },
    cleaveOptions() {
      // switch (this.field.textProps?.textType) {
      //   case TextType.Number:
      //     return {
      //       numeral: true,
      //       numeralThousandsGroupStyle: 'thousand',
      //       numeralIntegerScale: Number.MAX_SAFE_INTEGER.toString().length
      //     }
      //   case TextType.Date:
      //     const pattern = this.field.textProps.format || 'MM/dd/yyyy'
      //     return {
      //       date: true,
      //       delimiter: '/',
      //       datePattern: pattern.split('/').map(part => {
      //         switch (part) {
      //           case 'MM':
      //             return 'm'
      //           case 'dd':
      //             return 'd'
      //           case 'yyyy':
      //             return 'Y'
      //         }
      //       })
      //     }
      //   case TextType.PhoneUS:
      //     return CleavePhoneUS
      //   case TextType.SSN:
      //     return CleaveSSN
      //   case TextType.SingleLineText:
      //     const mask = this.field.textProps?.mask
      //     if (mask) {
      //       switch (mask) {
      //         // migrate old mask to new subtype
      //         case '(###) ###-####':
      //           return CleavePhoneUS
      //         case '###-##-####':
      //           return CleaveSSN
      //       }
      //     }
      //     break
      // }
      return null
    }

    //   const mask = this.field.textProps?.mask
    //   return {
    //     mask,
    //     blocks: {
    //       '#': {
    //         mask: MaskedRange,
    //         from: 0,
    //         to: 9
    //       }
    //     }
    //   }
    // }
  },
  methods: {
    handleClick() {
    },
    showCalendar() {
      const picker = this.$refs.calButton
      if (picker) picker.showPicker()
    },
    handlePickerChange(value) {
      // if (this.field.textProps) this.field.textProps.value = value
    },
    handleKey(e) {
      if (this.isEditableDate && (e.key === 'F4' || e.key === ' ')) {
        e.preventDefault()
        this.showCalendar()
      }
    },
    handleTextChange(e) {
      // console.log('text change e=', e)
      // if (this.field.textProps) {
      //   const input = e.target
      //   const newVal = input?.value.trim()
      //   // console.log('text change e=', newVal)
      //   this.field.textProps.value = newVal

      //   // if date only allow if valid in case it's a manual input
      //   if (this.field.textProps.textType === TextType.Date && newVal) {
      //     try {
      //       const parsed = parseDate(
      //         newVal,
      //         this.field.textProps?.format || 'MM/dd/yyyy',
      //         new Date()
      //       )
      //       // 10 for additional requirment of all digits being filled
      //       if (!isValid(parsed) || newVal.length !== 10) {
      //         console.log('invalid date, clearing')
      //         this.field.textProps.value = ''
      //         return
      //       }
      //     } catch {
      //       console.log('invalid date, clearing')
      //       this.field.textProps.value = ''
      //       return
      //     }
      //   }
      // }
    },
    selectField(e) {
      // const input = e.target as HTMLInputElement
      // if (input) input.select()
    },
    focus() {
      const el = this.$refs.textArea
      if (el) {
        el.focus()
      }
    }
  }
})
</script>
