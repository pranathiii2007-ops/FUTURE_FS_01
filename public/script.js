// Wait until page fully loads
document.addEventListener("DOMContentLoaded", () => {

    // Explore button scroll
    const exploreBtn = document.querySelector(".explore-btn");

    if(exploreBtn){
        exploreBtn.addEventListener("click", () => {
            document.querySelector("#projects").scrollIntoView({
                behavior: "smooth"
            });
        });
    }

    // Scroll animation
    const sections = document.querySelectorAll("section");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add("show");
            }
        });
    });

    sections.forEach(section => {
        observer.observe(section);
    });

    // Navbar glow on scroll
    window.addEventListener("scroll", () => {

        const navbar = document.querySelector(".navbar");

        if(!navbar) return;

        if(window.scrollY > 50){
            navbar.style.boxShadow = "0 0 20px rgba(218,241,222,0.3)";
        } else {
            navbar.style.boxShadow = "none";
        }

    });

    // CONTACT FORM
    const form = document.getElementById("contactForm");

    if(form){

        form.addEventListener("submit", async (e) => {

            e.preventDefault();

            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const message = document.getElementById("message").value;

            const responseMsg = document.getElementById("responseMsg");
            const submitBtn = form.querySelector(".contact-btn");

            submitBtn.disabled = true;
            submitBtn.innerText = "Sending...";

            try {

                const response = await fetch("/contact", {

                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({ name, email, message })

                });

                const data = await response.json();

                responseMsg.innerText = data.message;
                responseMsg.style.color = data.success ? "#4ade80" : "#f87171";

                if (data.success) {
                    form.reset();
                }

            } catch(error) {

                responseMsg.innerText = "❌ Could not reach server. Make sure the server is running.";
                responseMsg.style.color = "#f87171";

            } finally {
                submitBtn.disabled = false;
                submitBtn.innerText = "Send Message";
            }

        });

    }

});