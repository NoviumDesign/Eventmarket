// Foundation JavaScript
// Documentation can be found at: http://foundation.zurb.com/docs
$(document).foundation({
  accordion: {
    multi_expand: true
  }
});
// jsTree kundkort
$(function () {
  // 6 create an instance when the DOM is ready
  $('#jstree').jstree({
    'core': {
      'themes': {
        'variant': 'small'
      }
    },
    'plugins': ['checkbox']
  });
  // 7 bind to events triggered on the tree
  $('#jstree').on("changed.jstree", function (e, data) {
    console.log(data.selected);
  });
  // 8 interact with the tree - either way is OK
  $('button').on('click', function () {
    $('#jstree').jstree(true).select_node('child_node_1');
    $('#jstree').jstree('select_node', 'child_node_1');
    $.jstree.reference('#jstree').select_node('child_node_1');
  });
});
// jsTree Profilsida
$(function () {
  // 6 create an instance when the DOM is ready
  $('#jstree-profil').jstree({
    'core': {
      'themes': {
        'variant': 'small'
      }
    },
    'plugins': ['checkbox']
  });
  // 7 bind to events triggered on the tree
  $('#jstree-profil').on("changed.jstree", function (e, data) {
    console.log(data.selected);
  });
  // 8 interact with the tree - either way is OK
  $('button').on('click', function () {
    $('#jstree-profil').jstree(true).select_node('child_node_1');
    $('#jstree-profil').jstree('select_node', 'child_node_1');
    $.jstree.reference('#jstree-profil').select_node('child_node_1');
  });
});
//Dynatable global settings
$.dynatableSetup({
  inputs: {
    paginationPrev: 'Föregående',
    paginationNext: 'Nästa',
    recordCountText: 'Visar ',
  },
  datasets: {
    perPageDefault: 100,
  }
});
// Individual Dynatables
$('#my-table').dynatable({
  features: {
    search: false,
    perPageSelect: false,
    recordCount: false,
    paginate: false
  }
});
// Profilsida
if ($('body').hasClass('admin-profilsida')) {
  function s3_upload(){
    var s3upload = new S3Upload({
        file_dom_selector: 'logofile',
        s3_sign_put_url: '/sign_s3',
        s3_object_name: $('#LogoURLname').val(),
        onProgress: function(percent, message) {
            $('#status').html('Upload progress: ' + percent + '% ' + message);
        },
        onFinishS3Put: function(public_url) {
            $('#status').html('Upload completed. Uploaded to: '+ public_url);
            $("#LogoURL").val(public_url);
            $("#preview").html('<img src="'+public_url+'" style="width:300px;" />');
        },
        onError: function(status) {
            $('#status').html('Upload error: ' + status);
        }
    });
  }
  /*
  * Listen for file selection:
  */
  $(document).ready(function() {
      $('#logofile').on("change", s3_upload);
  });
  
  function convertToSlug(Text)
  {
      return Text
          .toLowerCase()
          .replace(/-+/g,' ')
          .replace(new RegExp('å', 'g'), 'a')
          .replace(new RegExp('ä', 'g'), 'a')
          .replace(new RegExp('ö', 'g'), 'o')
          .replace(/[^\w ]+/g,'')
          .replace(/ +/g,'-')
          ;
  }
  $('input[name="seoUrl"]').on('keyup change', function() {
    $(this).val(convertToSlug($(this).val()));
  });
  $('#cat-tree')
    .on('changed.jstree', function (e, data) {
      var i, j, r = [];
      for(i = 0, j = data.selected.length; i < j; i++) {
        r.push(data.instance.get_node(data.selected[i]).id);
      }
      $('#newCategory').val(JSON.stringify(r));
    })
    .jstree({ 'core' : {'data' : JSON.parse($('#cat-data').html()) }, "plugins" : [ "checkbox" ] });
}
// Söka personer under kundkort
if ($('body').hasClass('admin-kundkort')) {
  /**
   * Add personal
   * @param  {[type]} personalId [description]
   * @return {[type]}            [description]
   */
  function appendPersonal(personalId) {
    var hidPers = $('#hiddenPersonal').val().split(',');
    hidPers.push(personalId);
    $('#hiddenPersonal').val(hidPers.join(','));
    $('#kundkort').submit();
  };
  $('#person-table').dynatable({
    dataset: {
      ajax: true,
      ajaxUrl: '/api/person',
      ajaxOnLoad: true,
      records: []
    },
    writers: {
      _cellWriter: function (index, rowData) {
        if (index.id == "FirstName" || index.id == "LastName") {
          return '<td><a onclick="appendPersonal(\''+rowData['_id']+'\');">'+rowData[index.id]+'</a></td>';
        } else {
          return '<td>'+rowData[index.id]+'</td>';
        }
      }
    }
  });
  var OwnerCard = $('#OwnerCard').val();
  //console.log(OwnerCard);
  $('#customer-table').dynatable({
    dataset: {
      ajax: true,
      ajaxUrl: '/api/prstpage/OwnerCard/'+OwnerCard,
      ajaxOnLoad: true,
      records: [],
      queries: { 'OwnerCard': OwnerCard }
    },
    features: {
      perPageSelect: false
    },
    writers: {
      _cellWriter: function (index, rowData) {
        if (index.id == "Visible") {
          if (rowData[index.id] == '1') {
            return '<td><div class="green-ball"></div></td>';
          } else {
            return '<td><div class="red-ball"></div></td>';
          }
        } else {
          return '<td onclick="window.location.href=\'/admin/profilsida/id/'+rowData._id+'\'; return false;">'+rowData[index.id]+'</td>';
        }
      }
    }
  });
} // Endif kundkort
// Kundkortlistan
if ($('body').hasClass('admin-kundkortlista')) {
  var afterLoadHook = function(){
    $(document).foundation('reflow');
  };
  $('#group-table').dynatable({
    dataset: {
      ajax: true,
      ajaxUrl: '/api/customercards',
      ajaxOnLoad: true,
      records: []
    },
    features: {
      paginate: true,
      search: true,
      recordCount: true,
      perPageSelect: false
    },
    inputs: {
      queries: $('#search-group, #search-activity, #search-responsible') //, $('#search-activity'), $('#search-responsible')]
    },
    writers: {
      _cellWriter: function (index, rowData) {
        if (index.id == 'ResponsibleFullText') {
          if (rowData[index.id] == undefined) {
            return '<td onclick="window.location.href=\'/admin/kundkort/id/'+rowData._id+'\'; return false;">-- Ingen --</td>';
          } else {
            return '<td onclick="window.location.href=\'/admin/kundkort/id/'+rowData._id+'\'; return false;">'+rowData[index.id]+'</td>';
          }
        }
        if (index.id == 'LogTimeIndexed') {
          if (rowData[index.id] == undefined) {
            return '<td onclick="window.location.href=\'/admin/kundkort/id/'+rowData._id+'\'; return false;">Aldrig</td>';
          } else {
            return '<td onclick="window.location.href=\'/admin/kundkort/id/'+rowData._id+'\'; return false;">'+rowData[index.id]+'</td>';
          }
        }
        if (index.id == 'quickInfo') {
          var ret = '<td><a class="button" data-reveal-id="quickInfo'+rowData['_id']+'">Snabbinfo</a>';
          ret += JST['client/templates/kundkortlistapopup'](rowData);
          ret += '</td>';
          return ret;
        }
        if (index.id == "name") {
          return '<td><a href="/admin/editnewcategory/id/'+rowData['_id']+'">'+rowData[index.id]+'</a></td>';
        } else {
          return '<td onclick="window.location.href=\'/admin/kundkort/id/'+rowData._id+'\'; return false;">'+rowData[index.id]+'</td>';
        }
      }
    }
  }).bind('dynatable:afterUpdate', afterLoadHook);
}

// Add class to dynatable rows
$('tbody').each(function(){
  $(this).find('tr').addClass('clickableRow');
});
// Clickable tr
jQuery(document).ready(function($) {
  $(".clickableRow").click(function() {
    window.document.location = $(this).data('url');
  });
});
// Datepicker
$(document).ready(function() {
  $('#profile-period-start').Zebra_DatePicker({
    show_icon: false,
    direction: true,
    offset: [-160, -5],
    pair: $('#profile-period-end')
  });
  $('#profile-period-end').Zebra_DatePicker({
    show_icon: false,
    direction: true,
    offset: [-160, -5]
  });
  $('#top-placement-start').Zebra_DatePicker({
    show_icon: false,
    direction: true,
    offset: [-160, -5],
    pair: $('#top-placement-end')
  });
  $('#top-placement-end').Zebra_DatePicker({
    show_icon: false,
    direction: true,
    offset: [-160, -5]
  });
  $('#latest-answer-date').Zebra_DatePicker({
    show_icon: false,
    direction: 10,
    offset: [-160, -5]
  });
 });

/**
 * https://github.com/tadruj/s3upload-coffee-javascript
 * 
 */
(function() {

  window.S3Upload = (function() {

    S3Upload.prototype.s3_object_name = 'default_name';

    S3Upload.prototype.s3_sign_put_url = '/signS3put';

    S3Upload.prototype.file_dom_selector = 'file_upload';

    S3Upload.prototype.onFinishS3Put = function(public_url) {
      return console.log('base.onFinishS3Put()', public_url);
    };

    S3Upload.prototype.onProgress = function(percent, status) {
      return console.log('base.onProgress()', percent, status);
    };

    S3Upload.prototype.onError = function(status) {
      return console.log('base.onError()', status);
    };

    function S3Upload(options) {
      if (options == null) options = {};
      for (option in options) {
        this[option] = options[option];
      }
      this.handleFileSelect(document.getElementById(this.file_dom_selector));
    }

    S3Upload.prototype.handleFileSelect = function(file_element) {
      var f, files, output, _i, _len, _results;
      this.onProgress(0, 'Upload started.');
      files = file_element.files;
      output = [];
      _results = [];
      for (_i = 0, _len = files.length; _i < _len; _i++) {
        f = files[_i];
        _results.push(this.uploadFile(f));
      }
      return _results;
    };

    S3Upload.prototype.createCORSRequest = function(method, url) {
      var xhr;
      xhr = new XMLHttpRequest();
      if (xhr.withCredentials != null) {
        xhr.open(method, url, true);
      } else if (typeof XDomainRequest !== "undefined") {
        xhr = new XDomainRequest();
        xhr.open(method, url);
      } else {
        xhr = null;
      }
      return xhr;
    };

    S3Upload.prototype.executeOnSignedUrl = function(file, callback) {
      var this_s3upload, xhr;
      this_s3upload = this;
      xhr = new XMLHttpRequest();
      xhr.open('GET', this.s3_sign_put_url + '?s3_object_type=' + file.type + '&s3_object_name=' + this.s3_object_name, true);
      xhr.overrideMimeType('text/plain; charset=x-user-defined');
      xhr.onreadystatechange = function(e) {
        var result;
        if (this.readyState === 4 && this.status === 200) {
          try {
            result = JSON.parse(this.responseText);
          } catch (error) {
            this_s3upload.onError('Signing server returned some ugly/empty JSON: "' + this.responseText + '"');
            return false;
          }
          return callback(decodeURIComponent(result.signed_request), result.url);
        } else if (this.readyState === 4 && this.status !== 200) {
          return this_s3upload.onError('Could not contact request signing server. Status = ' + this.status);
        }
      };
      return xhr.send();
    };

    S3Upload.prototype.uploadToS3 = function(file, url, public_url) {
      var this_s3upload, xhr;
      this_s3upload = this;
      xhr = this.createCORSRequest('PUT', url);
      if (!xhr) {
        this.onError('CORS not supported');
      } else {
        xhr.onload = function() {
          if (xhr.status === 200) {
            this_s3upload.onProgress(100, 'Upload completed.');
            return this_s3upload.onFinishS3Put(public_url);
          } else {
            return this_s3upload.onError('Upload error: ' + xhr.status);
          }
        };
        xhr.onerror = function() {
          return this_s3upload.onError('XHR error.');
        };
        xhr.upload.onprogress = function(e) {
          var percentLoaded;
          if (e.lengthComputable) {
            percentLoaded = Math.round((e.loaded / e.total) * 100);
            return this_s3upload.onProgress(percentLoaded, percentLoaded === 100 ? 'Finalizing.' : 'Uploading.');
          }
        };
      }
      xhr.setRequestHeader('Content-Type', file.type);
      xhr.setRequestHeader('x-amz-acl', 'public-read');
      return xhr.send(file);
    };

    S3Upload.prototype.uploadFile = function(file) {
      var this_s3upload;
      this_s3upload = this;
      return this.executeOnSignedUrl(file, function(signedURL, publicURL) {
        return this_s3upload.uploadToS3(file, signedURL, publicURL);
      });
    };

    return S3Upload;

  })();

}).call(this);
