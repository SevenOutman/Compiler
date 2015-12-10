/**
 * Created by Doma on 15/12/10.
 */

function ToyFile(name, content, isNew) {
    this.isNewFile = undefined !== isNew ? isNew : true;
    this.name = name.replace(/(\.toy)+$/, "") || "untitled";
    this.content = content || "";
}

ToyFile.prototype.extension = ".toy";

ToyFile.prototype.fileName = function () {
    return this.isNewFile ? this.name : this.name + this.extension;
};