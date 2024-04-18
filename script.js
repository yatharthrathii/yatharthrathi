function homeAnimation() {
    gsap.from(".nav-bar img", {
        y: -100,
        opacity: 0,
        delay: 0.5,
        duration: 0.9,
        stagger: 0.4,
    })

    gsap.from(".nav-bar a", {
        y: -100,
        opacity: 0,
        delay: 0.5,
        duration: 0.9,
        stagger: 0.4,
    })

    gsap.from(".middle h1", {
        x: -100,
        opacity: 0,
        delay: 2,
        duration: 0.9,
        stagger: 0.6,
    })
}
homeAnimation()

function onScrollAnimation() {
    let tl = gsap.timeline({
        scrollTrigger: {
            trigger: "#home",
            start: "30% 0%",
            end: "70% 0%",
            scrub: 1,
            duration: 1,
        }
    })
    tl.to("#main", {
        backgroundColor: "#0d1b2a",
        color: "#778da9",
    })


    let tl1 = gsap.timeline({
        scrollTrigger: {
            trigger: "#about",
            start: "40% 0%",
            end: "90% 0%",
            scrub: 1,
            duration: 1,
        }
    })
    tl1.to("#main", {
        // backgroundColor: "#774c60",
        backgroundColor: "#49243E",
        // color: "#1a1423",
        color: "#DBAFA0",
    })
    tl1.to(".project .project1 , .project .project2", {
        // backgroundColor: "#51283a9d",
        // backgroundColor: "#85586F",
        backgroundColor: "#704264",
        // color: "black",
        color: "#DBAFA0",
    })


    let tl2 = gsap.timeline({
        scrollTrigger: {
            trigger: "#projects",
            // markers: true,
            start: "50% 0%",
            end: "90% 0%",
            scrub: 1,
            duration: 1,
        }
    })
    tl2.to("#main", {
        backgroundColor: "black",
    })
}
onScrollAnimation()


function sendEmail() {
    var submitButton = document.querySelector(".form-submit-btn");
    var originalText = submitButton.innerHTML;
    submitButton.innerHTML = "Sending...";

    Email.send({
        SecureToken: "d076983f-8ff9-480a-a8e0-a4edd20dc3d9",
        // Host: "smtp.elasticemail.com",
        // Username: "ap2518422@gmail.com",
        // Password: "742C22C7012BDC88406729047AA734BF44CF",
        To: 'yatharthmaheshwari01@gmail.com',
        From: document.getElementById("email").value,
        Subject: "New One",
        Body: ` Name: ${document.getElementById("name").value} <br> E-mail: ${document.getElementById("email").value} <br> Message: ${document.getElementById("textarea").value}`
    }).then(function () {
        submitButton.innerHTML = "Email Sent";
        setTimeout(function () {
            submitButton.innerHTML = originalText;
        }, 2000);
    }).catch(function (error) {
        console.error("Error sending email:", error);
        submitButton.innerHTML = originalText;
        alert("Error sending email. Please try again later.");
    });
}

document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("myForm");
    form.addEventListener("submit", function (event) {
        event.preventDefault();
        sendEmail();
    });
});

// $(function() {
//     $('a[href*=#]').on('click', function(e) {
//       e.preventDefault();
//       $('html, body').animate({ scrollTop: $($(this).attr('href')).offset().top}, 500, 'linear');
//     });
//   });
