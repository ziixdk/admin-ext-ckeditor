"use strict"

CKEDITOR.plugins.setLang( 'btgrid', 'da', {
	selNumCols: 'Vælg antal kolonner (ignoreres hvis brugerdefineret layout er angivet)',
  genNrRows: 'Antal rækker der skal genereres',
	infoTab: 'Info',
	createBtGrid: 'Opret et Bootstrap-grid',
	editBtGrid: 'Rediger Bootstrap-grid',
	numColsError:  'Vælg venligst antal kolonner.',
	numRowsError: 'Indtast venligst en numerisk værdi for antal rækker.',
	customLayout: 'Brugerdefineret kolonne-layout (f.eks. 4-4-4 eller 5-2-5, skal summe til ≤ 12)',
	layoutPlaceholder: 'f.eks. 3-6-3',
	layoutError: 'Hver værdi skal være et tal mellem 1 og 12.',
	layoutSumError: 'Kolonnebredderne skal summe til 12 eller mindre.',
} );
