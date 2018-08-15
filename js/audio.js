$(document).ready(function(){
    var volume={
        volume_status:"normal",
        volume_count:0.5,
    };

    function set_volume(){
        var width=volume.volume_count*100+"%";
        $(".volume_bar").css("width",width);
        $("#audio").get(0).volume=volume.volume_count;
    }


    $("#volume").click(function(){
        if(volume.volume_status=="normal"){
            $(this).attr("src","./static/img/silence.png");
            $("#audio").get(0).muted=true;
            volume.volume_status="silent";
            $(".volume_bar").css("width","0%");
        }else if(volume.volume_status=="silent"){
            $(this).attr("src","./static/img/volume.png");
            $("#audio").get(0).muted=false;
            volume.volume_status="normal";
            set_volume();
        }
    });

    $(".volume_content").click(function(e){
        if(volume.volume_status=="normal"){
            var content_width=$(this).width();
            
            if((e.pageX-$(this).offset().left)/content_width>1){
                volume.volume_count=1;
            }else if((e.pageX-$(this).offset().left)/content_width<0){
                volume.volume_count=0;
            }else{
                volume.volume_count=(e.pageX-$(this).offset().left)/content_width;
            }
            set_volume();
        }
    });

    var play={
        play_status:"stop",
        duration:0,
        playing:0,
        loaded:0
    }

    $(".play_btn").click(function(){
        var audio_dom=$("#audio").get(0);
        if(play.play_status=="playing"){
            audio_dom.pause();
            $(this).attr("src","./static/img/stop.png");
            play.play_status="stop";
            
        }else if(play.play_status=="stop"){
            audio_dom.play();
            $(this).attr("src","./static/img/play.png");
            play.play_status="playing";
        }else if(play.play_status=="end"){
            $(this).attr("src","./static/img/play.png");
            media_audio.currentTime=0;
            play.play_status="playing";
            audio_dom.play();
        }
    });

    $(".process").click(function(e){
        var set_curr=(e.pageX-$(this).offset().left)/$(this).width();
        $("#audio").get(0).currentTime=Math.floor(set_curr*play.duration);
        
    });

    

    var media_audio=$("#audio").get(0);
    media_audio.addEventListener("timeupdate",function(){
        
        $("#playing_time").css("width",(this.currentTime/this.duration*100)+"%");
        var minter=Math.floor(this.currentTime/60);
        var second=Math.floor(this.currentTime)%60;
        minter=minter>=10?minter.toString():("0"+minter.toString());
        second=second>=10?second.toString():("0"+second.toString());
        $("#time").html(minter+":"+second); 

    });

    media_audio.addEventListener("ended",function(){
        $(".play_btn").attr("src","./static/img/stop.png");
        play.play_status="end";
    });

    media_audio.addEventListener("loadedmetadata",function(){
        //console.log(this.duration);
        var length=Math.floor(this.duration);
        play.duration=length;
        var minter=Math.floor(length/60);
        var second=length%60;
        minter=minter>=10?minter.toString():("0"+minter.toString());
        second=second>=10?second.toString():("0"+second.toString());
        $("#duration").html("/"+minter+":"+second);               
    });

   /* media_audio.addEventListener("loadstart",function(){
        console.log("start to load data");
        console.log(this.networkState);
    });
    media_audio.addEventListener("progress",function(){
        console.log(this.buffered.length);
        if(this.buffered.length){
            console.log(this.buffered.start(0));
            console.log(this.buffered.end(0));
        }
    });

    media_audio.addEventListener("canplay",function(){
        console.log(this.seekable.end(0));
    });*/

    $(".audio_item").click(function(){
        var src="./static/audio/"+$(this).html()+".mp3";
        $("#audio").attr("src",src);
       // $("#audio").get(0).load();
        $("#audio").get(0).play();
        play.play_status="playing";
        $(".play_btn").attr("src","./static/img/play.png");

        $(".audio_text").children("h3").html($(this).html());
    });

});