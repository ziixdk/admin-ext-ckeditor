(function(){
  CKEDITOR.plugins.add('btgrid', {
      lang: 'en,ru,fr,nl',
      requires: 'widget,dialog',
      icons: 'btgrid',
      init: function(editor) {
       var maxGridColumns = 12;
       var lang = editor.lang.btgrid;

       CKEDITOR.dialog.add('btgrid',  this.path + 'dialogs/btgrid.js');

       editor.addContentsCss( this.path + 'styles/editor.css');
       // Add widget
       editor.ui.addButton('btgrid', {
         label: lang.createBtGrid,
         command: 'btgrid',
         icon: this.path + 'icons/btgrid.png'
       });
       editor.widgets.add('btgrid',
         {
           allowedContent: 'div(!btgrid);div(!row,!row-*);div(!col-*-*);div(!content)',
           requiredContent: 'div(btgrid)',
           parts: {
             btgrid: 'div.btgrid',
           },
           editables: {
             content: '',
           },
           template:
                   '<div class="btgrid">' +
                   '</div>',
           dialog: 'btgrid',
           defaults: {},
           upcast: function(element) {
             return element.name == 'div' && element.hasClass('btgrid');
           },
           // Rebuild editables after copy-paste by detecting actual column count per row
           init: function() {
             var rowNumber = 1;
             var rowCount = this.element.getChildCount();
             for (rowNumber; rowNumber <= rowCount; rowNumber++) {
               var rowEl = this.element.getChild(rowNumber - 1);
               var colCount = rowEl ? rowEl.getChildCount() : maxGridColumns;
               this.createEditable(colCount, rowNumber);
             }
           },
           data: function() {
             if (this.element.getChildCount() < 1) {
               var cols = this.data.customLayout || this.data.colCount;
               if (!cols) return;
               var rowCount = this.data.rowCount;
               var row = this.parts['btgrid'];
               for (var i = 1; i <= rowCount; i++) {
                 this.createGrid(cols, row, i);
               }
             }
           },
           // Create grid — cols can be a number (equal columns) or a "4-4-4" string
           createGrid: function(cols, row, rowNumber) {
             var widths = [];
             if (typeof cols === 'string' && cols.indexOf('-') !== -1) {
               var parts = cols.split('-');
               for (var j = 0; j < parts.length; j++) {
                 widths.push(parseInt(parts[j], 10));
               }
             } else {
               var count = parseInt(cols, 10);
               var w = maxGridColumns / count;
               for (var k = 0; k < count; k++) {
                 widths.push(w);
               }
             }

             var content = '<div class="row row-' + rowNumber + '">';
             for (var i = 0; i < widths.length; i++) {
               content = content + '<div class="col col-md-' + widths[i] + '">' +
                                   '  <div class="content">' +
                                   '    <p>Col ' + (i + 1) + ' content area</p>' +
                                   '  </div>' +
                                   '</div>';
             }
             content = content + '</div>';
             row.appendHtml(content);
             this.createEditable(widths.length, rowNumber);
           },
           createEditable: function(colCount, rowNumber) {
             for (var i = 1; i <= colCount; i++) {
               this.initEditable( 'content'+ rowNumber + i, {
                  selector: '.row-'+ rowNumber +' > div:nth-child('+ i +') div.content'
                } );
              }
            }
          }
        );
      }
    }
  );

})();
