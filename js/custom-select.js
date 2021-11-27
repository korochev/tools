    var hg = document.querySelector('.select-box__list');
    var sg = document.querySelector('.select-box__icon');
    var cg = document.querySelector('.select-box__current');
    var og = document.querySelectorAll('.select-box__option');

    cg.classList.remove('select-box__change-js');

    function toggleElement(e, h, s) {
        e.classList.toggle(h);
        if (s) {
            toggleElement(e, s);
        }
    }
      
    function customSelectBox (e) {
        toggleElement (hg, 'toggle-select-box-item');
        toggleElement (sg, 'toggle-select-box-icon');
        if (hg.classList[1]) {
            var t = e.getAttribute('data-target');
            if (t == 'none') {
                t = 'sb-radio-wd';
            }
            document.querySelector("[for=\'"+t+"\']").focus();
        }
        else {
            cg.focus();
        }
      }

    document.querySelectorAll('.select-box__input').forEach( function(e) { 
        e.addEventListener('change', function(event) {
          var h = event.target.getAttribute('id');
          cg.setAttribute('data-target', h);
        })
    })

    cg.addEventListener('keydown', function(event) { 
        if (event.key == 'Enter') {
            customSelectBox(this);
        }
    })


    og.forEach( function(e) { 
        e.addEventListener('keydown', function(event) {
            if (event.key == 'ArrowDown') {
                var h = this.parentNode.nextSibling.nextSibling;
                if (h) {
                h = h.childNodes[1];
                }
                else {
                h = og[0];
                }
                h.focus();
            }
            if (event.key == 'ArrowUp') {
                var h = this.parentNode.previousSibling.previousSibling;
                if (h) {
                    h = h.childNodes[1];
                }
                else {
                    h = og[5];
                }
                h.focus();
            }
            if (event.key == 'Enter') {
                var m = this.getAttribute('for');
                document.querySelector('#'+ m).checked = true;
                cg.setAttribute('data-target', m);
                customSelectBox();
            }
        })
    })
      
    document.querySelector('.select-box').addEventListener('focusout', function (event) { 
        if (!this.contains(event.relatedTarget)) {
            var e = hg.classList;
            if (e[1]) {
                e.remove('toggle-select-box-item');
                sg.classList.remove('toggle-select-box-icon');
            }
        }
    });