document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTS
    ========================== */

    const header = document.getElementById("header");
    const menuToggle = document.getElementById("menuToggle");
    const mainNav = document.getElementById("mainNav");

    const navLinks = document.querySelectorAll(".nav-link");

    const menuTabs = document.querySelectorAll(".menu-tab");
    const menuCards = document.querySelectorAll(".menu-card");
    const showFullMenu = document.getElementById("showFullMenu");

    const reservationForm = document.getElementById("reservationForm");
    const dateInput = document.getElementById("date");
    const phoneInput = document.getElementById("phone");

    const notification = document.getElementById("notification");
    const closeNotification = document.getElementById("closeNotification");


    /* =========================
       MOBILE MENU
    ========================== */

    if (menuToggle && mainNav) {

        menuToggle.addEventListener("click", () => {

            mainNav.classList.toggle("open");

        });

    }


    /* =========================
       CLOSE MOBILE MENU
       AFTER CLICKING LINK
    ========================== */

    navLinks.forEach((link) => {

        link.addEventListener("click", () => {

            if (mainNav) {
                mainNav.classList.remove("open");
            }

        });

    });


    /* =========================
       HEADER ON SCROLL
    ========================== */

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

    window.addEventListener("scroll", updateHeader);

    updateHeader();


    /* =========================
       ACTIVE NAVIGATION
    ========================== */

    const sections = document.querySelectorAll("main section[id]");

    function updateActiveNav() {

        let currentSection = "";

        sections.forEach((section) => {

            const sectionTop = section.offsetTop - 180;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection = section.getAttribute("id");

            }

        });


        navLinks.forEach((link) => {

            link.classList.remove("active");

            const linkTarget = link.getAttribute("href");

            if (linkTarget === `#${currentSection}`) {

                link.classList.add("active");

            }

        });

    }

    window.addEventListener("scroll", updateActiveNav);

    updateActiveNav();


    /* =========================
       MENU FILTER
    ========================== */

    menuTabs.forEach((tab) => {

        tab.addEventListener("click", () => {

            const category = tab.getAttribute("data-category");


            menuTabs.forEach((item) => {

                item.classList.remove("active");

            });

            tab.classList.add("active");


            menuCards.forEach((card) => {

                const cardCategory = card.getAttribute("data-category");


                if (
                    category === "all" ||
                    category === cardCategory
                ) {

                    card.classList.remove("hidden");

                } else {

                    card.classList.add("hidden");

                }

            });

        });

    });


    /* =========================
       SHOW FULL MENU
    ========================== */

    if (showFullMenu) {

        showFullMenu.addEventListener("click", () => {

            menuCards.forEach((card) => {

                card.classList.remove("hidden");

            });


            menuTabs.forEach((tab) => {

                tab.classList.remove("active");

            });


            const allTab = document.querySelector(
                '.menu-tab[data-category="all"]'
            );


            if (allTab) {

                allTab.classList.add("active");

            }


            showFullMenu.innerHTML =
                'تم عرض القائمة كاملة <i class="fa-solid fa-check"></i>';

        });

    }


    /* =========================
       MINIMUM RESERVATION DATE
    ========================== */

    if (dateInput) {

        const today = new Date();

        const year = today.getFullYear();

        const month = String(
            today.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            today.getDate()
        ).padStart(2, "0");


        const todayString =
            `${year}-${month}-${day}`;


        dateInput.min = todayString;

    }


    /* =========================
       PHONE FORMATTING
    ========================== */

    if (phoneInput) {

        phoneInput.addEventListener("input", () => {

            let value = phoneInput.value;

            value = value.replace(/\D/g, "");

            if (value.length > 10) {

                value = value.substring(0, 10);

            }

            phoneInput.value = value;

        });

    }


    /* =========================
       RESERVATION FORM
    ========================== */

    if (reservationForm) {

        reservationForm.addEventListener("submit", (event) => {

            event.preventDefault();


            const name =
                document.getElementById("name").value.trim();

            const phone =
                document.getElementById("phone").value.trim();

            const date =
                document.getElementById("date").value;

            const time =
                document.getElementById("time").value;

            const guests =
                document.getElementById("guests").value;


            /* =========================
               BASIC VALIDATION
            ========================== */

            if (
                name === "" ||
                phone === "" ||
                date === "" ||
                time === "" ||
                guests === ""
            ) {

                showNotification(
                    "يرجى إكمال جميع البيانات المطلوبة",
                    "تأكد من تعبئة الحقول قبل إرسال الحجز"
                );

                return;

            }


            /* =========================
               PHONE VALIDATION
            ========================== */

            if (!/^07\d{8}$/.test(phone)) {

                showNotification(
                    "رقم الهاتف غير صحيح",
                    "يرجى إدخال رقم أردني مكون من 10 أرقام ويبدأ بـ 07"
                );

                phoneInput.focus();

                return;

            }


            /* =========================
               DATE VALIDATION
            ========================== */

            const selectedDate =
                new Date(`${date}T00:00:00`);

            const today =
                new Date();

            today.setHours(0, 0, 0, 0);


            if (selectedDate < today) {

                showNotification(
                    "التاريخ غير صحيح",
                    "يرجى اختيار تاريخ اليوم أو تاريخًا قادمًا"
                );

                dateInput.focus();

                return;

            }


            /* =========================
               SUCCESS
            ========================== */

            showNotification(
                "تم استلام طلبك",
                "سنتواصل معك لتأكيد الحجز"
            );


            reservationForm.reset();


            if (dateInput) {

                const currentDate =
                    new Date();

                const year =
                    currentDate.getFullYear();

                const month =
                    String(
                        currentDate.getMonth() + 1
                    ).padStart(2, "0");

                const day =
                    String(
                        currentDate.getDate()
                    ).padStart(2, "0");


                dateInput.min =
                    `${year}-${month}-${day}`;

            }

        });

    }


    /* =========================
       NOTIFICATION
    ========================== */

    let notificationTimer;


    function showNotification(title, message) {

        if (!notification) {
            return;
        }


        const titleElement =
            notification.querySelector(
                ".notification-content strong"
            );


        const messageElement =
            notification.querySelector(
                ".notification-content span"
            );


        if (titleElement) {

            titleElement.textContent = title;

        }


        if (messageElement) {

            messageElement.textContent = message;

        }


        notification.classList.add("show");


        clearTimeout(notificationTimer);


        notificationTimer = setTimeout(() => {

            notification.classList.remove("show");

        }, 5000);

    }


    /* =========================
       CLOSE NOTIFICATION
    ========================== */

    if (closeNotification) {

        closeNotification.addEventListener("click", () => {

            notification.classList.remove("show");

            clearTimeout(notificationTimer);

        });

    }


    /* =========================
       REVEAL ELEMENTS
    ========================== */

    const revealElements = document.querySelectorAll(
        ".story-content, .story-images, .menu-card, .experience-content, .gallery-item, .review-card, .reservation-content, .reservation-form-wrapper, .contact-content, .contact-map"
    );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

    });


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

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
       SMOOTH SCROLL
    ========================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");


            if (
                !targetId ||
                targetId === "#"
            ) {

                return;

            }


            const target =
                document.querySelector(targetId);


            if (!target) {

                return;

            }


            event.preventDefault();


            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;


            const targetPosition =
                target.offsetTop - headerHeight;


            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =========================
       ESCAPE KEY
    ========================== */

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {

            if (mainNav) {

                mainNav.classList.remove("open");

            }


            if (notification) {

                notification.classList.remove("show");

            }

        }

    });


    /* =========================
       CLOSE MOBILE MENU
       WHEN CLICKING OUTSIDE
    ========================== */

    document.addEventListener("click", (event) => {

        if (
            mainNav &&
            menuToggle &&
            mainNav.classList.contains("open") &&
            !mainNav.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {

            mainNav.classList.remove("open");

        }

    });


    /* =========================
       CONSOLE MESSAGE
    ========================== */

    console.log(
        "NÉRAVA Restaurant website loaded successfully"
    );

});