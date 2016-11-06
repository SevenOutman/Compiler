/**
 * Created by Doma on 2016/10/19.
 */
import Vue from 'vue'

function $defined(v) {
  return v !== undefined
}
function File(name, content, isNew) {
  return new Vue({
    data: {
      isNew: $defined(isNew) ? isNew : true,
      name: $defined(name) ? name.replace(/(\.toy)$/, "") : "untitled",
      content: content || ""
    },
    computed: {
      fileName() {
        return this.isNew ? this.name : this.name + ".toy"
      }
    },
    methods: {
      serialize() {
        return JSON.stringify({
          name: this.name,
          content: this.content
        })
      }
    }
  })
}

File.example = function () {
  return new File("example",
    "{\n" +
    "    int a;\n" +
    "    real b;\n" +
    "    a = 1;\n" +
    "    b = 2.0;\n" +
    "    if (a > b) then {\n" +
    "        b = a;\n" +
    "    } else {\n" +
    "        b = b - a;\n" +
    "    }\n" +
    "}", false);
};
export default File
