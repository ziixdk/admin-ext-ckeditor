/**
 * @license Copyright (c) 2003-2023, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
    config.removeButtons = 'Form,Checkbox';
    config.filebrowserBrowseUrl = 'https://'+location.hostname+'/admin/files';
};

CKEDITOR.config.filebrowserBrowseUrl= 'https://'+location.hostname+'/admin/files';
CKEDITOR.config.pasteFromWordRemoveStyles=false;
CKEDITOR.config.pasteFromWordRemoveFontStyles = false;
CKEDITOR.config.pasteFromWordRemoveStyles = false;
CKEDITOR.config.fillEmptyBlocks = false;
CKEDITOR.config.allowedContent = true;
