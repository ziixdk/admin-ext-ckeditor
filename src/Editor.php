<?php

namespace ZiiX\Admin\CKEditor;

use ZiiX\Admin\Form\Field\Textarea;

class Editor extends Textarea
{
    protected $view = 'ziix-admin-ext-ckeditor::editor';

    public function setupImageBrowse()
    {
        $this->options['filebrowserBrowseUrl'] = '/admin/media/?select=true&close=true';
        $this->options['filebrowserImageBrowseUrl'] = '/admin/media?select=true&close=true';
    }

    public function render()
    {
        $config = (array) CKEditor::config('config');
        $this->setupImageBrowse();

        $config = json_encode(array_merge($config, $this->options));

        $this->script = <<<JS
var editor = CKEDITOR.replace('{$this->id}', $config);
function CKupdate() {
    for (instance in CKEDITOR.instances){
        CKEDITOR.instances[instance].updateElement();
    }
}
admin.form.addSaveCallback(CKupdate);
JS;

        return parent::render();
    }
}
