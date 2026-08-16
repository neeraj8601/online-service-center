const WHATSAPP_NUMBER = "918601351042";
const serviceData = [
  {
    name: "Scholarship Form Filling",
    price: "From ₹299",
    category: "Education",
    icon: "🎓",
    description: "Get assistance with scholarship application forms.",
  },
  {
    name: "Job Related Form Filling",
    price: "From ₹249",
    category: "Jobs",
    icon: "💼",
    description:
      "Assistance with online job and recruitment application forms.",
  },
  {
    name: "UP Polytechnic Form Filling",
    price: "From ₹299",
    category: "Education",
    icon: "📘",
    description: "Complete assistance for UP Polytechnic application forms.",
  },
  {
    name: "CUET UG & PG Form Filling",
    price: "From ₹349",
    category: "Education",
    icon: "🎯",
    description: "Assistance with CUET undergraduate and postgraduate forms.",
  },
  {
    name: "NIMCET Form Filling",
    price: "From ₹349",
    category: "Education",
    icon: "🧠",
    description: "Application assistance for NIMCET.",
  },
  {
    name: "BHU Form Filling",
    price: "From ₹349",
    category: "Education",
    icon: "🏛️",
    description: "Assistance with BHU admission and entrance forms.",
  },
  {
    name: "College Admission / Entrance Exam Forms",
    price: "From ₹399",
    category: "Education",
    icon: "📚",
    description:
      "Get help filling college admission and entrance examination forms.",
  },
  {
    name: "NEET UG Form Filling",
    price: "From ₹399",
    category: "Education",
    icon: "🩺",
    description: "Application assistance for NEET UG.",
  },
  {
    name: "UPSSSC PET Form Filling",
    price: "From ₹299",
    category: "Education",
    icon: "📝",
    description: "Get assistance with UPSSSC PET application forms.",
  },
  {
    name: "Aadhaar Card Services",
    price: "From ₹199",
    category: "Government Services",
    icon: "🪪",
    description:
      "Assistance with eligible Aadhaar updates and related services.",
  },
  {
    name: "Caste Certificate",
    price: "From ₹299",
    category: "Certificates",
    icon: "📄",
    description: "Assistance with caste certificate application.",
  },
  {
    name: "Annual Income Certificate",
    price: "From ₹299",
    category: "Certificates",
    icon: "💰",
    description: "Assistance with income certificate application.",
  },
  {
    name: "Train Ticket Booking",
    price: "From ₹150",
    category: "Travel Booking",
    icon: "🚆",
    description:
      "Train ticket booking assistance for different routes and distances.",
  },
  {
    name: "Tatkal Train Ticket Assistance",
    price: "From ₹199",
    category: "Travel Booking",
    icon: "⏱️",
    description:
      "Assistance with Tatkal booking subject to availability and official rules.",
  },
  {
    name: "Flight / Airline Ticket Booking",
    price: "From ₹250",
    category: "Travel Booking",
    icon: "✈️",
    description: "Domestic and international flight booking assistance.",
  },
  {
    name: "Bus Ticket Booking",
    price: "From ₹120",
    category: "Travel Booking",
    icon: "🚌",
    description: "Bus ticket booking assistance for different routes.",
  },
  {
    name: "Tatkal / Urgent Travel Assistance",
    price: "From ₹199",
    category: "Travel Booking",
    icon: "🚨",
    description:
      "Fast booking assistance subject to availability and applicable rules.",
  },
];

const state = {
  currentFilter: "All",
  searchQuery: "",
};

const serviceGrid = document.getElementById("serviceGrid");
const searchInput = document.getElementById("serviceSearch");
const filterButtons = document.querySelectorAll(".filter-btn");
const serviceSelect = document.getElementById("serviceSelect");
const modal = document.getElementById("enquiryModal");
const enquiryForm = document.getElementById("enquiryForm");
const selectedServiceInput = document.getElementById("selectedService");
const contactForm = document.getElementById("contactForm");
const formError = document.getElementById("formError");
const floatingWhatsAppButtons = document.querySelectorAll(
  "[data-whatsapp-message]",
);
const scrollTopButton = document.querySelector(".scroll-top");

function populateServiceOptions() {
  const options = serviceData
    .map(
      (service) => `<option value="${service.name}">${service.name}</option>`,
    )
    .join("");
  serviceSelect.innerHTML = `<option value="">Choose a service</option>${options}`;
}

function createServiceCard(service) {
  const card = document.createElement("article");
  card.className = "service-card reveal";
  card.innerHTML = `
    <div class="service-icon">${service.icon}</div>
    <h3>${service.name}</h3>
    <p>${service.description}</p>
    <div class="service-meta">
      <span class="service-price">${service.price}</span>
      <span class="service-tag">${service.category}</span>
    </div>
    <button type="button" class="btn btn-primary service-apply" data-service="${service.name}">Apply / Enquire</button>
  `;
  return card;
}

function renderServices() {
  const query = state.searchQuery.trim().toLowerCase();
  const filteredServices = serviceData.filter((service) => {
    const matchesCategory =
      state.currentFilter === "All" || service.category === state.currentFilter;
    const matchesQuery =
      service.name.toLowerCase().includes(query) ||
      service.description.toLowerCase().includes(query);
    return matchesCategory && matchesQuery;
  });

  serviceGrid.innerHTML = "";

  if (!filteredServices.length) {
    serviceGrid.innerHTML =
      '<div class="empty-state">No services found. Try another search or filter.</div>';
    return;
  }

  filteredServices.forEach((service) => {
    serviceGrid.appendChild(createServiceCard(service));
  });

  revealElements();
}

function revealElements() {
  const elements = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 },
  );

  elements.forEach((el) => observer.observe(el));
}

function showToast(message) {
  const toastContainer = document.querySelector(".toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toastContainer.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2500);
}

function openWhatsApp(message) {
  const encodedText = encodeURIComponent(message);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedText}`;
  window.open(url, "_blank");
}

function attachWhatsAppLinks() {
  floatingWhatsAppButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      const message =
        this.dataset.whatsappMessage ||
        "Hello, I want to know about your online services.";
      openWhatsApp(message);
    });
  });
}

function validateContactForm(formData) {
  const name = formData.get("fullName").trim();
  const mobile = formData.get("mobileNumber").trim();
  const email = formData.get("emailAddress").trim();
  const service = formData.get("serviceSelect").trim();
  const message = formData.get("message").trim();

  if (!name || !mobile || !email || !service || !message) {
    return "Please fill in all required fields.";
  }

  if (mobile.length < 10) {
    return "Please enter a valid mobile number.";
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return "Please enter a valid email address.";
  }

  return "";
}

function initContactFormHandling() {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(contactForm);
    const validationMessage = validateContactForm(formData);

    if (validationMessage) {
      formError.textContent = validationMessage;
      return;
    }

    formError.textContent = "";

    // Prepare WhatsApp message so owner receives enquiry
    const name = formData.get('fullName').trim();
    const mobile = formData.get('mobileNumber').trim();
    const email = formData.get('emailAddress').trim();
    const service = formData.get('serviceSelect').trim() || 'Not specified';
    const messageText = formData.get('message').trim();

    const whatsappText = `New Enquiry:\nName: ${name}\nMobile: ${mobile}\nEmail: ${email}\nService: ${service}\nMessage: ${messageText}`;

    // Open WhatsApp to send the enquiry to the configured number
    showToast('Opening WhatsApp to send your enquiry...');
    openWhatsApp(whatsappText);

    // Reset form after short delay to allow WhatsApp to open
    setTimeout(() => contactForm.reset(), 600);
  });
}

function openEnquiryModal(serviceName) {
  selectedServiceInput.value = serviceName;
  const sendWhatsappBtn = document.querySelector(".send-whatsapp");
  const nameField = document.getElementById("modalName");
  const phoneField = document.getElementById("modalPhone");
  const messageField = document.getElementById("modalMessage");

  nameField.value = "";
  phoneField.value = "";
  messageField.value = "";

  const message = `Hello, I am interested in ${serviceName}. Please help me with this service.`;
  sendWhatsappBtn.dataset.whatsappMessage = message;
  modal.classList.add("show");
  modal.setAttribute("aria-hidden", "false");
}

function closeEnquiryModal() {
  modal.classList.remove("show");
  modal.setAttribute("aria-hidden", "true");
}

function handleServiceApplication() {
  document.addEventListener("click", function (event) {
    const serviceButton = event.target.closest(".service-apply");
    const offerButton = event.target.closest(".offer-button");
    const closeButton = event.target.closest(".modal-close");
    const closeModalButton = event.target.closest(".modal-close-btn");
    const sendWhatsAppButton = event.target.closest(".send-whatsapp");

    if (serviceButton) {
      const serviceName = serviceButton.dataset.service;
      openEnquiryModal(serviceName);
    }

    if (offerButton) {
      const serviceName = offerButton.dataset.service;
      openEnquiryModal(serviceName);
    }

    if (closeButton || closeModalButton) {
      closeEnquiryModal();
    }

    if (sendWhatsAppButton) {
      const name = document.getElementById("modalName").value.trim();
      const phone = document.getElementById("modalPhone").value.trim();
      const selectedService = selectedServiceInput.value.trim();
      const message = document.getElementById("modalMessage").value.trim();

      if (!name || !phone || !selectedService || !message) {
        showToast("Please fill in all fields before sending on WhatsApp.");
        return;
      }

      const whatsappText = `Customer Name: ${name}\nMobile Number: ${phone}\nSelected Service: ${selectedService}\nMessage: ${message}`;
      openWhatsApp(whatsappText);
    }
  });
}

function updateActiveNav() {
  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll(".main-nav a")];

  function setActive(sectionId) {
    navLinks.forEach((link) => {
      const active = link.getAttribute("href") === `#${sectionId}`;
      link.classList.toggle("active", active);
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      const visibleEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visibleEntry) {
        setActive(visibleEntry.target.id);
      }
    },
    { threshold: [0.2, 0.5, 0.8] },
  );

  sections.forEach((section) => observer.observe(section));
}

function handleSearchAndFilter() {
  searchInput.addEventListener("input", (event) => {
    state.searchQuery = event.target.value;
    renderServices();
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      state.currentFilter = button.dataset.filter;
      filterButtons.forEach((btn) =>
        btn.classList.toggle("active", btn === button),
      );
      renderServices();
    });
  });
}

function initFaqAccordion() {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-question");

    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      faqItems.forEach((faq) => {
        faq.classList.remove("active");
        faq
          .querySelector(".faq-question")
          .setAttribute("aria-expanded", "false");
        faq.querySelector(".faq-answer").style.maxHeight = null;
      });

      if (!isOpen) {
        item.classList.add("active");
        button.setAttribute("aria-expanded", "true");
        const answer = item.querySelector(".faq-answer");
        answer.style.maxHeight = `${answer.scrollHeight}px`;
      }
    });
  });

  const firstFaq = document.querySelector(".faq-item.active .faq-answer");
  if (firstFaq) {
    firstFaq.style.maxHeight = `${firstFaq.scrollHeight}px`;
  }
}

function animateCounters() {
  const counters = document.querySelectorAll(".counter");
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = Number(counter.dataset.target || 0);
        const suffix = target >= 24 ? " / 7" : "";
        let current = 0;
        const step = Math.max(1, Math.ceil(target / 80));

        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }

          const displayValue = suffix ? `${current}${suffix}` : current;
          counter.textContent = `${displayValue}${displayValue === target && target !== 24 ? "+" : ""}`;
        }, 18);

        counterObserver.unobserve(counter);
      });
    },
    { threshold: 0.6 },
  );

  counters.forEach((counter) => counterObserver.observe(counter));
}

function initScrollTop() {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 420) {
      scrollTopButton.classList.add("visible");
    } else {
      scrollTopButton.classList.remove("visible");
    }
  });

  scrollTopButton.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initHamburgerMenu() {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".main-nav");

  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuToggle.classList.toggle("open", isOpen);
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuToggle.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

function setCurrentYear() {
  const yearNode = document.getElementById("year");
  yearNode.textContent = new Date().getFullYear();
}

function modalCloseOnOutsideClick() {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) {
      closeEnquiryModal();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("show")) {
      closeEnquiryModal();
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  populateServiceOptions();
  renderServices();
  attachWhatsAppLinks();
  initContactFormHandling();
  handleSearchAndFilter();
  updateActiveNav();
  initFaqAccordion();
  animateCounters();
  initScrollTop();
  initHamburgerMenu();
  setCurrentYear();
  handleServiceApplication();
  modalCloseOnOutsideClick();
  revealElements();
});
