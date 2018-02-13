<template>
  <div>
    <!-- 图片上传组件辅助-->
    <el-input v-model="title">
    </el-input>
    <el-upload
      class="avatar-uploader"
      :action="serverUrl"
      :data="token"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :before-upload="beforeUpload"
    >
    </el-upload>
    <!--富文本编辑器组件-->
    <el-row>
      <quill-editor
        v-model="detailContent"
        ref="myQuillEditor"
        :options="editorOption"
      >
      </quill-editor>
    </el-row>
    <el-button>保存</el-button>
  </div>
</template>
<script>

  import Sender from '../../Sender/sender'
  import cfg from '../../../.cfg'

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{'header': 1}, {'header': 2}],               // custom button values
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
    [{'direction': 'rtl'}],                         // text direction

    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
    [{'header': [1, 2, 3, 4, 5, 6, false]}],

    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
    [{'font': []}],
    [{'align': []}],
    ['link', 'image', 'video'],
    ['clean']                                         // remove formatting button
  ]
  export default {
    data() {
      let me = this;
      return {
        token: {
          token: '',
        },
        i: 0,
        title: '',
        quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
        serverUrl: 'http://up-z2.qiniup.com',  // 这里写你要上传的图片服务器地址
        detailContent: '', // 富文本内容
        editorOption: {
          placeholder: '',
          theme: 'snow',  // or 'bubble'
          modules: {
            toolbar: {
              container: toolbarOptions,  // 工具栏
              handlers: {
                'image': function (value) {
                  if (value) {
                    // 触发input框选择图片文件
                    document.querySelector('.avatar-uploader input').click()
                  } else {
                    this.quill.format('image', false);
                  }
                }
              }
            }
          }
        }
      }
    },
    methods: {
      // 上传图片前
      beforeUpload(res, file) {
      },
      // 上传图片成功
      uploadSuccess(res, file) {
        let img_path = 'http://ovygmwfnp.bkt.clouddn.com/' + res.hash;
        let el_img = `<img src="${img_path}">`;
        this.detailContent += el_img;
      },
      // 上传图片失败
      uploadError(res, file) {
      }
    },
    created: function () {
      this.$store.dispatch('is_login');
      let me = this;
      Sender.post(cfg.api + '/api/house/qiniu')
        .then(function (data) {
          me.token.token = data;
        })
    },
    watch: {
      detailContent: function () {
        this.i++;
        if (Number.isInteger(this.i / 50)) {
          console.log("保存一次");
          Sender.post(cfg.api + '/api/story/add', this.story)
            .then(function (data) {
              console.log("data", data);
            })
        }


        //  获取当前时间,在界面渲染,最后一次的保存时间
      }
    },
    computed: {
      user_id: function () {
        return this.$store.getters['get_user'].id;
      },
      story: function () {
        let story = {};
        story.user_id = this.user_id;
        story.title = this.title;
        story.content = this.detailContent;
        return story;
      }
    }
  }
</script>
