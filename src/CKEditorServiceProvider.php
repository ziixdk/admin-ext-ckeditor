<?php

namespace ZiiX\Admin\CKEditor;

use Illuminate\Support\ServiceProvider;
use ZiiX\Admin\Admin;
use ZiiX\Admin\Form;

class CKEditorServiceProvider extends ServiceProvider
{
    /**
     * {@inheritdoc}
     */
    public function boot(CKEditor $extension)
    {
        if (!CKEditor::boot()) {
            return;
        }

        if ($views = $extension->views()) {
            $this->loadViewsFrom($views, 'admin-ext-ckeditor');
        }

        if ($this->app->runningInConsole() && $assets = $extension->assets()) {
            $this->publishes(
                [$assets => public_path('vendor/ziixdk/admin-ext-ckeditor')],
                'admin-ext-ckeditor'
            );
        }
        Admin::booting(function () {
            Admin::js('vendor/ziixdk/admin-ext-ckeditor/ckeditor.js', false); // prevent minifying (last arg)
            Form::extend('ckeditor', Editor::class);
        });
    }
}
