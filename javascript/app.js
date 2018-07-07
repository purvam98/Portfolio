$(document).ready(function() {

//========== HAMBURGER MENU =============

    $(".cross").hide();
    $(".menu").hide();
    $(".hamburger").click(function() {
        $(".menu").slideToggle("slow", function() {
            $(".hamburger").hide();
            $(".cross").show();
        });
    });

    $(".cross").click(function() {
        $(".menu").slideToggle("slow", function() {
            $(".cross").hide();
            $(".hamburger").show();
        });
    });

    $(".menu").click(function() {
        $(".menu").slideToggle("slow", function() {
            $(".cross").hide();
            $(".hamburger").show();
        });
    });

//========== HOVER INFO =============

    $('[data-toggle="tooltip"]').tooltip({container: 'body'});

//========== DYNAMIC MODAL INFO =============

    $('img').on('click', function(event) {
        event.preventDefault();
        $("#showImg").empty();
        $("#showTitle").empty();
        $("#showBody").empty();
        $("#showTech").empty();
        var image = $(this).attr("src");
        var title = $(this).data("title");
        var body = $(this).data("text");
        var tech = $(this).data("tech");
        var link = $(this).data("link");
        var git = $(this).data("git");
        $("#showImg").append("<img class='img-responsive' src='" + image + "' />");
        $("#showTitle").html(title);
        $("#showBody").append("<h3>Description:</h3>" + body);
        $("#showTech").append("<h3>Technologies Used:</h3>" + tech);
        $("#previewSite").attr("href", link);
        $("#previewGit").attr("href", git);
    });

//========== MODAL HOVER =============

// loop through each image that is a link
  $( 'data img' ).each(function(){

     // wrap the image link in a div
     $( this ).parent().wrap( '<div class="img-link-wrapper" style="display: inline-block; text-align: center;"></div>' );

     // set the height of the div to the height of the image
     var imgHeight = $( this ).height();
     var imgWidth = $( this ).width();
     $( this ).parents( 'div.img-link-wrapper' )
       .css({ 'height' : imgHeight,
              'width' : imgWidth
            });

     // set the rest of the initial css
    $( this ).css({ 'height' : '94%',
                    'width' : 'auto',
                    'margin' : '3% 0'
                  });

  });

  // set up a .hovered class
  $( 'body' ).append( '<style>img.img-link-hovered{ margin-top: 0 !important; margin-bottom: 0 !important; height: 100% !important; }</style>' );

  // add/remove the class on hover
  $( 'data img' ).hover(
    function() {
    $( this ).addClass( 'img-link-hovered' );
    }, function() {
      $( this ).removeClass( 'img-link-hovered' );
    }
  );

//========== TYPEWRITER FOR HOME COVER PAGE =============

function setupTypewriter(t) {
    var HTML = t.innerHTML;

    t.innerHTML = "";

    var cursorPosition = 0,
        tag = "",
        writingTag = false,
        tagOpen = false,
        typeSpeed = 100,
      tempTypeSpeed = 0;

    var type = function() {

        if (writingTag === true) {
            tag += HTML[cursorPosition];
        }

        if (HTML[cursorPosition] === "<") {
            tempTypeSpeed = 0;
            if (tagOpen) {
                tagOpen = false;
                writingTag = true;
            } else {
                tag = "";
                tagOpen = true;
                writingTag = true;
                tag += HTML[cursorPosition];
            }
        }
        if (!writingTag && tagOpen) {
            tag.innerHTML += HTML[cursorPosition];
        }
        if (!writingTag && !tagOpen) {
            if (HTML[cursorPosition] === " ") {
                tempTypeSpeed = 0;
            }
            else {
                tempTypeSpeed = (Math.random() * typeSpeed) + 50;
            }
            t.innerHTML += HTML[cursorPosition];
        }
        if (writingTag === true && HTML[cursorPosition] === ">") {
            tempTypeSpeed = (Math.random() * typeSpeed) + 50;
            writingTag = false;
            if (tagOpen) {
                var newSpan = document.createElement("span");
                t.appendChild(newSpan);
                newSpan.innerHTML = tag;
                tag = newSpan.firstChild;
            }
        }

        cursorPosition += 1;
        if (cursorPosition < HTML.length - 1) {
            setTimeout(type, tempTypeSpeed);
        }

    };

    return {
        type: type
    };
}

var typer = document.getElementById('typewriter');

typewriter = setupTypewriter(typewriter);

typewriter.type();

//========== TYPEWRITER FOR TECHNOLOGIES =============

      var TxtType = function(el, toRotate, period) {
        this.toRotate = toRotate;
        this.el = el;
        this.loopNum = 0;
        this.period = parseInt(period, 10) || 2000;
        this.txt = '';
        this.tick();
        this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
        var i = this.loopNum % this.toRotate.length;
        var fullTxt = this.toRotate[i];

        if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
        }

        this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

        var that = this;
        var delta = 200 - Math.random() * 100;

        if (this.isDeleting) { delta /= 2; }

        if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
        } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
        }

        setTimeout(function() {
        that.tick();
        }, delta);
    };

        var elements = document.getElementsByClassName('typewrite');
        for (var i=0; i<elements.length; i++) {
            var toRotate = elements[i].getAttribute('data-type');
            var period = elements[i].getAttribute('data-period');
            if (toRotate) {
              new TxtType(elements[i], JSON.parse(toRotate), period);
            }
        }
        // INJECT CSS
        var css = document.createElement("style");
        css.type = "text/css";
        css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
        document.body.appendChild(css);

});