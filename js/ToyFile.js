/**
 * Created by Doma on 15/12/10.
 */

function ToyFile(name, content, id, isNew) {
    this.isNewFile = undefined !== isNew ? isNew : true;
    this.name = undefined !== name ? name.replace(/(\.toy)+$/, "") : "untitled";
    this.content = content || "";
    this.id = id || _randomString(8)
}

ToyFile.prototype.extension = ".toy";

ToyFile.prototype.fileName = function () {
    return this.isNewFile ? this.name : this.name + this.extension;
};

ToyFile.prototype.serialize = function () {
    return JSON.stringify({
        name: this.name,
        content: this.content,
        id: this.id
    });
};