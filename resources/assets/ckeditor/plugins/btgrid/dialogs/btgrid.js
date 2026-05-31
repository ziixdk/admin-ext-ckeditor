CKEDITOR.dialog.add( 'btgrid', function( editor ) {
  var lang = editor.lang.btgrid;

  function validatorNum(msg) {
    return function() {
      var value = this.getValue(),
        pass = !!(CKEDITOR.dialog.validate.integer()(value) && value > 0);
      if (!pass) {
        alert(msg); // jshint ignore:line
      }
      return pass;
    };
  }

  function validatorLayout(msg) {
    return function() {
      var value = this.getValue();
      if (!value) return true; // optional field
      var parts = value.split('-');
      var sum = 0;
      for (var i = 0; i < parts.length; i++) {
        var n = parseInt(parts[i], 10);
        if (isNaN(n) || n < 1 || n > 12) {
          alert(msg); // jshint ignore:line
          return false;
        }
        sum += n;
      }
      if (sum > 12) {
        alert(lang.layoutSumError); // jshint ignore:line
        return false;
      }
      return true;
    };
  }

  return {
    title: lang.editBtGrid,
    minWidth: 600,
    minHeight: 300,
    onShow: function() {
      var selection = editor.getSelection();
      var command = this.getName();

      var rowsInput = this.getContentElement('info', 'rowCount'),
        colsInput = this.getContentElement('info', 'colCount'),
        layoutInput = this.getContentElement('info', 'customLayout');

      if (command == 'btgrid') {
        var grid = selection.getSelectedElement();
        if (grid) {
          this.setupContent(grid);
          rowsInput && rowsInput.disable();
          colsInput && colsInput.disable();
          layoutInput && layoutInput.disable();
        }
      }
    },
    contents: [
      {
        id: 'info',
        label: lang.infoTab,
        accessKey: 'I',
        elements: [
          {
            id: 'customLayout',
            type: 'text',
            label: lang.customLayout,
            'default': '',
            setup: function( widget ) {
              this.setValue( widget.data.customLayout || '' );
            },
            commit: function( widget ) {
              var val = this.getValue().trim();
              widget.setData( 'customLayout', val || null );
            },
            validate: validatorLayout(lang.layoutError)
          },
          {
            id: 'colCount',
            type: 'select',
            required: true,
            label: lang.selNumCols,
            items: [
              [ '1', 1],
              [ '2', 2],
              [ '3', 3],
              [ '4', 4],
              [ '6', 6],
              [ '12', 12],
            ],
            validate: validatorNum(lang.numColsError),
            setup: function( widget ) {
              this.setValue(widget.data.colCount);
            },
            commit: function( widget ) {
              var layout = this.getDialog().getContentElement('info', 'customLayout').getValue().trim();
              if (!layout) {
                widget.setData( 'colCount', this.getValue());
              }
            }
          },
          {
            id: 'rowCount',
            type: 'text',
            width: '50px',
            required: true,
            label: lang.genNrRows,
            validate: validatorNum(lang.numRowsError),
            setup: function( widget ) {
              this.setValue( widget.data.rowCount );
            },
            commit: function( widget ) {
              widget.setData( 'rowCount', this.getValue());
            }
          }
        ]
      }
    ],
  };
});
