var CASEW = 1050;
var snapX = 0;
var R = .999;
var S = .01;
var tf = 0;
var vi = 0;
var animStart = 0;
var isMoving = false;
var LOGR = Math.log(R);

//localStorage.getItem('volumeRoulette') = localStorage.getItem('volumeRoulette');


function snapRender(t, e) {
    CASEW = $('#case').width();
    if (!isMoving) {
        if (t == undefined) view(snapX);
        else {
            for (var a = [1, 14, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8], n = 0, i = 0; i < a.length; i++) {
                if (t == a[i]) {
                    n = i;
                    break;
                }
            }
            var s = 32;
            var o = -32;
            var l = Math.floor(e * (s - o + 1) + o);
            var c = 70 * n + 36 + l;
            c += 5250;
            snapX = c;
            view(snapX);
        }
    }
}
function spin(t) {
    var e = t.roll;
    if(localStorage.getItem('volumeRoulette') == 'disabled') {

    } else {
        play_sound('roll');
    }
    
    for (var a = [1, 14, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8], n = 0, i = 0; i < a.length; i++) {
        if (e == a[i]) {
            n = i;
            break;
        }
    }
    var s = 32;
    var o = -32;
    let wobble = t.wobble;//Math.random() * (1 - 0) + 0;
    var l = Math.floor(wobble * (s - o + 1) + o);
    var c = 70 * n + 36 + l;
    c += 5250;
    animStart = (new Date).getTime();
    vi = getVi(c);
    tf = getTf(vi);
    isMoving = true;
    setTimeout(function() {
        if(localStorage.getItem('volumeRoulette') == 'disabled') {

        } else {
            play_sound("finish");
        }
        $('#button_black').prop("disabled", false);
        $('#button_red').prop("disabled", false);
        $('#button_green').prop("disabled", false);
    }, tf);
    render();
}
function d_mod(t, e) {
    return t * (Math.pow(R, e) - 1) / LOGR;
}
function getTf(t) {
    return (Math.log(S) - Math.log(t)) / LOGR;
}
function getVi(t) {
    return S - t * LOGR;
}
function v(t, e) {
    return t * Math.pow(R, e);
}
function render() {
    var t = (new Date).getTime() - animStart;
    if (t > tf) t = tf;
    var e = d_mod(vi, t);
    view(e);
    if (tf > t) requestAnimationFrame(render);
    else {
        snapX = e;
        isMoving = false;
    }
}
function view(t) {
    t = -((t + 1050 - CASEW / 2) % 1050);
    $('#case').css("background-position", t + "px 0px");
}

$(window).resize(function() {
    snapRender();
});

var sounds_rolling = new Audio(window.OLTEANUadv.url+"/rolling.wav");
var sounds_tone = new Audio(window.OLTEANUadv.url+"/tone.wav");

function play_sound(data) {
    if (data == 'roll') {
        
/*        document.getElementById("sursa_audio").src = window.OLTEANUadv.url+"/rolling.wav";
        let player = document.getElementById("player");
        player.load();*/
        sounds_rolling.play();
    }
    else if (data == 'finish') {
        
        sounds_rolling.pause();
        /*document.getElementById("sursa_audio").src = window.OLTEANUadv.url+"/tone.wav";
        let player = document.getElementById("player");
        player.load();*/
        sounds_tone.play();
    }
}

/*export default {
    data: () => ({
        current_number: 0,
        CASEW: 1050,
        snapX: 0,
        R: .999,
        S: .01,
        tf: 0,
        vi: 0,
        animStart: 0,
        isMoving: false,
        LOGR: Math.log(.999)
    }),
    created(){
        if(this.$root.$data.auth.check == false) {
            showToast('error', 'You are not logged in!');
            return this.$router.push('/login');
        }
    },
    mounted(){
         
    },
    created(){
        
    },
    ready(){
         
    },
    methods: {
        tryRandom: function() {
            let t = this;
            t.current_number = Math.floor(Math.random() * 14);
            spin({roll:t.current_number,wobble: Math.random() * (1 - 0) + 0});
        },
        snapRender: function(t, e) {
            console.log('snap_render');
            let th = this;
            th.CASEW = $('#case').width();
            if (!th.isMoving) {
                if (t == undefined)
                    th.view(th.snapX);
                else {
                    for (var a = [1, 14, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8], n = 0, i = 0; i < a.length; i++) {
                        if (t == a[i]) {
                            n = i;
                            break;
                        }
                    }
                    var s = 32;
                    var o = -32;
                    var l = Math.floor(e * (s - o + 1) + o);
                    var c = 70 * n + 36 + l;
                    c += 5250;
                    th.snapX = c;
                    th.view(th.snapX);
                }
            }
        },
        spin: function(t) {
            //wobble = Math.random() * (1 - 0) + 0;
            let th = this;
            var e = t.roll;
            console.log(t);
            for (var a = [1, 14, 2, 13, 3, 12, 4, 0, 11, 5, 10, 6, 9, 7, 8], n = 0, i = 0; i < a.length; i++) {
                if (e == a[i]) {
                    n = i;
                    break;
                }
            }
            var s = 32;
            var o = -32;
            let wobble = t.wobble;
            var l = Math.floor(wobble * (s - o + 1) + o);
            var c = 70 * n + 36 + l;
            c += 5250;
            th.animStart = (new Date).getTime();
            th.vi = th.getVi(c);
            th.tf = th.getTf(th.vi);
            th.isMoving = true;
            th.render();
        },
        d_mod: function(t, e) {
            let th = this;
            return t * (Math.pow(th.R, e) - 1) / th.LOGR;
        },
        getTf: function(t) {
            let th = this;
            return (Math.log(th.S) - Math.log(t)) / th.LOGR;
        },
        getVi: function(t) {
            let th = this;
            return th.S - t * th.LOGR;
        },
        v: function(t, e) {
            let th = this;
            return t * Math.pow(th.R, e);
        },
        render: function() {
            let th = this;
            var t = (new Date).getTime() - th.animStart;
            if (t > th.tf) t = th.tf;
            var e = th.d_mod(th.vi, t);
            th.view(e);
            if (th.tf > t) requestAnimationFrame(th.render);
            else {
                th.snapX = e;
                th.isMoving = false;
            }
        },
        view: function(t) {
            let th = this;
            t = -((t + 1050 - th.CASEW / 2) % 1050);
            $('#case').css("background-position", t + "px 0px");
        }
    }
}*/
