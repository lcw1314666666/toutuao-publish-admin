<template>
  <div
    :class="{fullscreen: fullscreen}"
    class="tinymce-container"
    :style="{width: containerWidth, height: containerHeight}"
  >
    <tinymce-editor
      :id="id"
      v-model="tinymceContent"
      :init="initOptions"
    />
  </div>
</template>

<script>
import 'tinymce/tinymce'
// Default icons are required for TinyMCE 5.3 or above
import 'tinymce/icons/default'
// Import themes
import 'tinymce/themes/silver'
import 'tinymce/themes/mobile'
// Any plugins you want to use has to be imported
import 'tinymce/plugins/advlist'
import 'tinymce/plugins/anchor'
import 'tinymce/plugins/autoresize'
import 'tinymce/plugins/autolink'
import 'tinymce/plugins/autosave'
import 'tinymce/plugins/charmap'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/directionality'
import 'tinymce/plugins/emoticons'
import 'tinymce/plugins/fullpage'
import 'tinymce/plugins/fullscreen'
import 'tinymce/plugins/help'
import 'tinymce/plugins/hr'
import 'tinymce/plugins/image'
import 'tinymce/plugins/imagetools'
import 'tinymce/plugins/insertdatetime'
import 'tinymce/plugins/link'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/media'
import 'tinymce/plugins/nonbreaking'
import 'tinymce/plugins/noneditable'
import 'tinymce/plugins/pagebreak'
import 'tinymce/plugins/paste'
import 'tinymce/plugins/preview'
import 'tinymce/plugins/print'
import 'tinymce/plugins/save'
import 'tinymce/plugins/searchreplace'
import 'tinymce/plugins/spellchecker'
import 'tinymce/plugins/tabfocus'
import 'tinymce/plugins/table'
import 'tinymce/plugins/template'
import 'tinymce/plugins/textpattern'
import 'tinymce/plugins/visualblocks'
import 'tinymce/plugins/visualchars'
import 'tinymce/plugins/wordcount'

import TinymceEditor from '@tinymce/tinymce-vue' // TinyMCE vue wrapper
import { plugins, toolbar } from './config'

const defaultId = () => 'vue-tinymce-' + +new Date() + ((Math.random() * 1000).toFixed(0) + '')

export default {
  name: 'Tinymce',
  components: {
    TinymceEditor
  },
  props: {
    value: {
      type: String,
      default: '',
      required: true
    },
    id: {
      type: String,
      default: defaultId
    },
    toolbar: {
      type: Array,
      default: () => []
    },
    menubar: {
      type: String,
      default: 'file edit insert view format table'
    },
    height: {
      type: [String, Number],
      default: '360px'
    },
    width: {
      type: [String, Number],
      default: 'auto'
    }
  },

  data() {
    return {
      hasChange: false,
      hasInit: false,
      fullscreen: false,
      // https://www.tiny.cloud/docs/configure/localization/#language
      // and also see langs files under public/tinymce/langs folder
      languageTypeList: {
        en: 'en',
        zh: 'zh_CN',
        es: 'es',
        ja: 'ja',
        ko: 'ko_KR',
        it: 'it'
      },
      tinymceInit: {
        content_style: `
            *                         { padding:0; margin:0; }
            body                      { padding: 10px; font-size: 14px; line-height: 20px; font-family: 微软雅黑; }
            img                       { max-width:100%; display:block; height:auto; }
            a                         { text-decoration: none; }
            iframe                    { width: 100%; }
            p                         { line-height:1.6; margin: 0px; }
            table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
            .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
            ul,ol                     { list-style-position:inside; }
          `,
        style_formats: [
          {
            title: '首行缩进',
            block: 'p',
            styles: { 'text-indent': '2em' }
          },
          {
            title: '行高',
            items: [
              { title: '1', styles: { 'line-height': '1' }, inline: 'span' },
              { title: '1.5', styles: { 'line-height': '1.5' }, inline: 'span' },
              { title: '2', styles: { 'line-height': '2' }, inline: 'span' },
              { title: '2.5', styles: { 'line-height': '2.5' }, inline: 'span' },
              { title: '3', styles: { 'line-height': '3' }, inline: 'span' }
            ]
          }
        ],
        fontsize_formats: '10px 11px 12px 14px 16px 18px 20px 24px',
        font_formats: `
            微软雅黑=微软雅黑;
            宋体=宋体;
            黑体=黑体;
            仿宋=仿宋;
            楷体=楷体;
            隶书=隶书;
            幼圆=幼圆;
            Andale Mono=andale mono,times;
            Arial=arial, helvetica,
            sans-serif;
            Arial Black=arial black, avant garde;
            Book Antiqua=book antiqua,palatino;
            Comic Sans MS=comic sans ms,sans-serif;
            Courier New=courier new,courier;
            Georgia=georgia,palatino;
            Helvetica=helvetica;
            Impact=impact,chicago;
            Symbol=symbol;
            Tahoma=tahoma,arial,helvetica,sans-serif;
            Terminal=terminal,monaco;
            Times New Roman=times new roman,times;
            Trebuchet MS=trebuchet ms,geneva;
            Verdana=verdana,geneva;
            Webdings=webdings;
            Wingdings=wingdings,zapf dingbats`,
        tabfocus_elements: ':prev,:next'
      }
    }
  },

  computed: {
    language: {
      get() {
        return this.languageTypeList.zh
      }
    },
    uploadButtonColor: {
      get() {
        return '#3484FF'
      }
    },
    tinymceContent: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    },
    containerWidth: {
      get() {
        const width = this.width
        // Test matches `100`, `'100'`
        if (/^[\d]+(\.[\d]+)?$/.test(width.toString())) {
          return `${width}px`
        }
        return width
      }
    },
    containerHeight: {
      get() {
        const height = this.height
        // Test matches `100`, `'100'`
        if (/^[\d]+(\.[\d]+)?$/.test(height.toString())) {
          return `${height}px`
        }
        return height
      }
    },
    initOptions: {
      get() {
        return {
          selector: `#${this.id}`,
          height: this.height,
          body_class: 'panel-body',
          object_resizing: false,
          toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
          menubar: this.menubar,
          plugins: plugins,
          language: this.language,
          content_css: `${(process.env.VUE_APP_OSS_BUILD === 'production' && 'https://meikejiance-institution.oss-cn-qingdao.aliyuncs.com/dist/') || process.env.BASE_URL}tinymce/skins/content.min.css`,
          language_url: this.language === 'en' ? '' : `${(process.env.VUE_APP_OSS_BUILD === 'production' && 'https://meikejiance-institution.oss-cn-qingdao.aliyuncs.com/dist/') || process.env.BASE_URL}tinymce/langs/${this.language}.js`,
          skin_url: `${(process.env.VUE_APP_OSS_BUILD === 'production' && 'https://meikejiance-institution.oss-cn-qingdao.aliyuncs.com/dist/') || process.env.BASE_URL}tinymce/skins`,
          emoticons_database_url: `${(process.env.VUE_APP_OSS_BUILD === 'production' && 'https://meikejiance-institution.oss-cn-qingdao.aliyuncs.com/dist/') || process.env.BASE_URL}tinymce/emojis.min.js`,
          end_container_on_empty_block: true,
          powerpaste_word_import: 'clean',
          code_dialog_height: 450,
          code_dialog_width: 1000,
          advlist_bullet_styles: 'square',
          advlist_number_styles: 'default',
          default_link_target: '_blank',
          link_title: false,
          // inserting nonbreaking space &nbsp; need Nonbrelanguage_urlaking Space Plugin
          nonbreaking_force_tab: true,
          // https://www.tiny.cloud/docs-3x/reference/configuration/Configuration3x@convert_urls/
          // https://stackoverflow.com/questions/5196205/disable-tinymce-absolute-to-relative-url-conversions
          convert_urls: false,
          init_instance_callback: (editor) => {
            if (this.value) {
              editor.setContent(this.value)
            }
            this.hasInit = true
            editor.on('NodeChange Change KeyUp SetContent', () => {
              this.hasChange = true
              this.$emit('input', editor.getContent())
            })
          },
          setup: (editor) => {
            editor.on('FullscreenStateChanged', (e) => {
              this.fullscreen = e.state
            })
          },
          image_advtab: true,
          image_title: true, // 是否开启图片标题设置的选择，这里设置否
          automatic_uploads: true,
          images_upload_handler: (blobInfo, success, failure) => {
            const formData = new FormData()
            formData.append('file', blobInfo.blob(), blobInfo.filename())
            this.$http.uploadoss(formData).then((res) => {
              if (res.result) {
                success(res.obj)
              } else {
                failure('图片上传失败')
              }
            }).catch(() => {
              failure('图片上传失败')
            })
          }
        }
      }
    }
  },

  watch: {
    language() {
      const tinymceManager = window.tinymce
      const tinymceInstance = tinymceManager.get(this.id)
      if (this.fullscreen) {
        tinymceInstance.execCommand('mceFullScreen')
      }
      if (tinymceInstance) {
        tinymceInstance.destroy()
      }
      this.$nextTick(() => tinymceManager.init(this.initOptions))
    }
  }
}
</script>

<style lang="scss" scoped>
.tinymce-container {
  position: relative;
  line-height: normal;

  .mce-fullscreen {
    z-index: 10000;
  }
  /deep/ .tox-tinymce {
    .tox-menubar, .tox-toolbar {
      background-color: #F8F8F8;
    }
  }
}

.editor-custom-btn-container {
  position: absolute;
  right: 6px;
  top: 6px;
  z-index: 1002;
}

.fullscreen .editor-custom-btn-container {
  z-index: 10000;
  position: fixed;
}

.editor-upload-btn {
  display: inline-block;
}

textarea {
  visibility: hidden;
  z-index: -1;
}
</style>
