var mapdata = {
    // "Role" : 1,
    // ".card-cover" : 2,
    // ".card-avatar" : 3,
    ".card-fullname" : 4,
    ".card-jobtitle" : 5,
    // ".card-desc" : 6,
    ".card-social-fb" :7 ,
    ".card-social-tw" : 8,
    ".card-social-ins" : 9,
    ".card-social-lnk" : 10,
    // ".card-loc" : 11,
    // ".card-phn" : 12,
    // ".card-email" : 13,
    // ".card-worktg" : 14,
    // Delete : 15,
}

var sf = "https://docs.google.com/spreadsheets/d/11Tb777PaN4opl0Oazqf9UznrOixbBbNb4vMsltJ2yBQ/gviz/tq?tqx=out:json";

$.ajax({url: sf, type: 'GET', dataType: 'text'})
.done(function(data) {
    const r = data.match(/google\.visualization\.Query\.setResponse\(([\s\S\w]+)\)/);
    if (r && r.length == 2) {
        const obj = JSON.parse(r[1]);
        const table = obj.table;
        const header = table.cols.map(({label}) => label);
        const rows = table.rows.map(({c}) => c.map(e => e ? (e.v || "") : "")); // Modified from const rows = table.rows.map(({c}) => c.map(({v}) => v));

        // console.log(header);
        // console.log(rows);

        var orignal=$('.secy-profiles')[0].innerHTML;
        $('.secy-profiles')[0].innerHTML="";
        rows.forEach(row => {
            if(row[15]!='Yes'){
                var role=(row[1]=="Cordi")?".cordi-profiles":'.secy-profiles';
                var content=$(orignal);
                var found = row[2].match( /d\/([A-Za-z0-9\-_]+)/ );

                if ( found&&found[1].length ) {
                    row[2] = 'https://drive.google.com/uc?export=view&id=' + found[1];
                }
                found = row[3].match( /d\/([A-Za-z0-9\-_]+)/ );
                if ( found&&found[1].length ) {
                    row[3] = 'https://drive.google.com/uc?export=view&id=' + found[1];
                }
                if(row[2])content.find('.card-cover').css("background-image", "url(" + row[2] + ")");
                if(row[3])content.find('.card-avatar').attr('src',row[3]);
                $.each(mapdata,function(k,v){
                    content.find(k).text(row[v]);
                });
                $(role).append(content);
                console.log(content);
                console.log('Added Team-mem : '+row[4]);
            }
        });
    //     $(".secy-profiles").slick({
    //         slidesToShow: 4,
    //         slidesToScroll: 1,
    //         autoplay: true,
    //         autoplaySpeed: 2000,
    // //         prevArrow: '<button class="slide-arrow prev-arrow"></button>',
    // // nextArrow: '<button class="slide-arrow next-arrow"></button>',
    //         // variableWidth: true,
    //         // centerMode:true,
    //         dots:false,
    //         infinite:false,
    //         pauseOnFocus:false,
    //         // arrows:true,
    //         // nextArrow:$('.nxtproj'),
    //         // prevArrow:$('.prevproj'),
    //         responsive : [
    //             {
    //                 breakpoint: 600,
    //                 settings: {
    //                     slidesToShow: 1,
    //                 },
    //             }
    //         ],
    //     });
        const buttons = document.querySelectorAll(".profile-outer .card-buttons button");
        // const sections = document.querySelectorAll(".profile-outer .card-section");
        // const cards = document.querySelector(".profile-outer .card");

        const handleButtonClick = (e) => {
            const targetSection = e.target.getAttribute("data-section");
            const card = e.target.closest('.card');
            const section = card.querySelector(targetSection);
            const sections = card.querySelectorAll('.card-section');
            targetSection !== "#about"
            ? card.classList.add("is-active")
            : card.classList.remove("is-active");
            card.setAttribute("data-state", targetSection);
            sections.forEach((s) => s.classList.remove("is-active"));
            card.querySelectorAll(".card-buttons button").forEach((b) => b.classList.remove("is-active"));
            e.target.classList.add("is-active");
            section.classList.add("is-active");
        };
        $(function(){
            buttons.forEach((btn) => {
                btn.addEventListener("click", handleButtonClick);
            });
        });

    }
})
.fail((e) => console.log(e.status));
