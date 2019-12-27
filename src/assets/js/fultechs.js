import $ from 'jquery'


function FulTechs(){
    $(document).on("click", "a.disabled,a:disabled",function(e) {
        return false;
   });

   /*****Load function start*****/
    $(window).on("load",function(){
        $(".preloader-it").delay(500).fadeOut("slow");
    });
    /*****Load function* end*****/

    /*Variables*/
    // var height,width,
    var $wrapper = $(".hk-wrapper")
    // $nav = $(".hk-nav"),
    // $vertnaltNav = $(".hk-wrapper.hk-vertical-nav,.hk-wrapper.hk-alt-nav"),
    // $horizontalNav = $(".hk-wrapper.hk-horizontal-nav"),
    // $navbar= $(".hk-navbar");



    

    /*Navbar Toggle*/
    $(document).on('click', '#navbar_toggle_btn', function (e) {
        $wrapper.toggleClass('hk-nav-toggle');
        $(window).trigger( "resize" );
        return false;
    });
    $(document).on('click', '#hk_nav_backdrop,#hk_nav_close', function (e) {
        $wrapper.removeClass('hk-nav-toggle');
        return false;
    });



    /*Search form Collapse*/
	$(document).on('click', '#navbar_search_btn', function (e) {
		$('html,body').animate({ scrollTop: 0 }, 'slow');
		$(".navbar-search input").focus();
		$wrapper.addClass('navbar-search-toggle');
		$(window).trigger( "resize" );
	});
	$(document).on('click', '#navbar_search_close',function (e) {
		$wrapper.removeClass('navbar-search-toggle');
		$(window).trigger( "resize" );
		return false;
    });
    

    /*Slimscroll*/
	// $('.nicescroll-bar').slimscroll({height:'100%',color: '#d6d9da', disableFadeOut : true,borderRadius:0,size:'6px',enableKeyNavigation: true,opacity:.8});
	// $('.notifications-nicescroll-bar').slimscroll({height:'330px',size: '6px',color: '#d6d9da',disableFadeOut : true,borderRadius:0,enableKeyNavigation: true,opacity:.8});
	
	
	/*Slimscroll Key Control*/
	$(".slimScrollDiv").hover(function() {
		$(this).find('[class*="nicescroll-bar"]').focus();
	},function() {
		$(this).find('[class*="nicescroll-bar"]').blur();
	});

    var fTechs = function(){
        /*Feather Icon*/
        // var featherIcon = $('.feather-icon');
        // if( featherIcon.length > 0 ){
        //     featherIcon.replace();
        // }

        /*Counter Animation*/
        // var counterAnim = $('.counter-anim');
        // if( counterAnim.length > 0 ){
        //     counterAnim.counterUp({ delay: 10,
        //     time: 1000});
        // }

    }

    fTechs();
    
    }

export default FulTechs;


