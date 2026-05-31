"use strict"

CKEDITOR.plugins.setLang( 'btgrid', 'en', {
	selNumCols: 'Select number of columns (ignored if custom layout is set)',
  genNrRows: 'Add number of rows to generate',
	infoTab: 'Info',
	createBtGrid: 'Create a Bootstrap grid',
	editBtGrid: 'Edit Bootstrap grid',
	numColsError:  'Please select number of columns.',
	numRowsError: 'Please insert numeric value for Number of rows.',
	customLayout: 'Custom column layout (e.g. 4-4-4 or 5-2-5, must sum to ≤ 12)',
	layoutError: 'Each value must be a number between 1 and 12.',
	layoutSumError: 'Column widths must sum to 12 or less.',
} );
