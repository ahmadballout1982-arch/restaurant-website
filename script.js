"use strict";


/* =========================
   MOBILE MENU
========================= */

const menuToggle = document.getElementById("menuToggle");
const nav = document.getElementById("nav");

if (menuToggle && nav) {

    menuToggle.addEventListener("click", () => {

        const isOpen = nav.classList.toggle("open");

        menuToggle.setAttribute(
            "aria-expanded",
            isOpen.toString()
        );

        document.body.classList.toggle(
            "menu-open",
            isOpen
        );

    });


    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            nav.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            document.body.classList.remove(
                "menu-open"
            );

        });

    });

}


/* =========================
   HEADER ON SCROLL
========================= */

const header = document.getElementById("header");

function updateHeader() {

    if (!header) {
        return;
    }

    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

}

window.addEventListener(
    "scroll",
    updateHeader,
    { passive: true }
);

updateHeader();


/* =========================
   ACTIVE NAV LINK
========================= */

const sections = document.querySelectorAll(
    "main section[id]"
);

const navigationLinks = document.querySelectorAll(
    ".nav-link"
);

function updateActiveNavigation() {

    let currentSection = "";

    const scrollPosition =
        window.scrollY + 180;

    sections.forEach((section) => {

        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {
            currentSection = section.id;
        }

    });

    navigationLinks.forEach((link) => {

        link.classList.remove("active");

        const href = link.getAttribute("href");

        if (href === `#${currentSection}`) {
            link.classList.add("active");
        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

updateActiveNavigation();


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");

const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================
   BACK TO TOP
========================= */

const backToTop =
    document.getElementById("backToTop");

function updateBackToTop() {

    if (!backToTop) {
        return;
    }

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}

window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
);

if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}

updateBackToTop();


/* =========================
   CONTACT FORM
========================= */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


if (contactForm && formMessage) {

    contactForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();

            const name =
                document.getElementById("name").value.trim();

            const email =
                document.getElementById("email").value.trim();

            const service =
                document.getElementById("service").value;

            const message =
                document.getElementById("message").value.trim();


            if (
                !name ||
                !email ||
                !service ||
                !message
            ) {

                formMessage.textContent =
                    "يرجى تعبئة جميع الحقول المطلوبة.";

                formMessage.className =
                    "form-message error";

                return;

            }


            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(email)) {

                formMessage.textContent =
                    "يرجى إدخال بريد إلكتروني صحيح.";

                formMessage.className =
                    "form-message error";

                return;

            }


            formMessage.textContent =
                "تم استلام رسالتك بنجاح. شكرًا لتواصلك معنا.";

            formMessage.className =
                "form-message success";


            contactForm.reset();


            setTimeout(() => {

                formMessage.textContent = "";

                formMessage.className =
                    "form-message";

            }, 5000);

        }
    );

}


/* =========================
   CURRENT YEAR
========================= */

const currentYear =
    document.getElementById("currentYear");

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================
   CLOSE MENU WITH ESCAPE
========================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            nav &&
            nav.classList.contains("open")
        ) {

            nav.classList.remove("open");

            if (menuToggle) {

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

            document.body.classList.remove(
                "menu-open"
            );

        }

    }
);