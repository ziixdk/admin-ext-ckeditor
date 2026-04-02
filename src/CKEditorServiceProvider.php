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
            $this->loadViewsFrom($views, 'ziix-admin-ext-ckeditor');
        }

        if ($this->app->runningInConsole() && $assets = $extension->assets()) {
            $this->publishes(
                [$assets => public_path('vendor/ziix-admin-ext-ckeditor')],
                'ziix-admin-ext-ckeditor'
            );
        }
        Admin::booting(function () {
            Admin::js('vendor/ziix-admin-ext-ckeditor/ckeditor.js', false); // prevent minifying (last arg)
            Form::extend('ckeditor', Editor::class);
        });
    }
}
