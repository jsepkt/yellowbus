// assets/js/script.js

document.addEventListener('DOMContentLoaded', () => {

    // 1. AOS Initialization
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            offset: 120, // Adjusted offset
            once: true,
            easing: 'ease-out-sine', // A slightly different easing
        });
    } else {
        console.warn('AOS library not found. Scroll animations will not work.');
    }

    // 2. Mobile Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu-main');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            navToggle.setAttribute('aria-expanded', navMenu.classList.contains('active'));
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        document.addEventListener('click', (event) => {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = navToggle.contains(event.target);
            if (navMenu.classList.contains('active') && !isClickInsideNav && !isClickOnToggle) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    } else {
        console.warn('Mobile navigation elements (toggle or menu) not found.');
    }


    // 3. Sticky Header with "scrolled" class
    const siteHeader = document.getElementById('site-header');
    if (siteHeader) {
        const scrollThreshold = 50;
        window.addEventListener('scroll', () => {
            if (window.scrollY > scrollThreshold) {
                siteHeader.classList.add('scrolled');
            } else {
                siteHeader.classList.remove('scrolled');
            }
        });
    } else {
        console.warn('Site header element not found for sticky behavior.');
    }


    // 4. Smooth Scrolling for Anchor Links & Active Nav State
    const allNavLinks = document.querySelectorAll('.nav-menu a.nav-link, a.back-to-top-btn');
    const mainHeader = document.getElementById('site-header');

    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.startsWith('#') && href.length > 1) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    let headerOffset = 0;
                    if (mainHeader && getComputedStyle(mainHeader).position === 'sticky') {
                        headerOffset = mainHeader.offsetHeight;
                    }
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset - 20;
                    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    if (this.classList.contains('nav-link') && navMenu && navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        navToggle.classList.remove('active');
                        navToggle.setAttribute('aria-expanded', 'false');
                        document.body.style.overflow = '';
                    }
                }
            } else {
                if (this.classList.contains('nav-link') && navMenu && navMenu.classList.contains('active')) {
                     document.body.style.overflow = '';
                }
            }
        });
    });

    const currentPath = window.location.pathname.split("/").pop() || "index.html";
    const navMenuLinks = document.querySelectorAll('.nav-menu a.nav-link');
    navMenuLinks.forEach(link => {
        link.classList.remove('active');
        const linkPath = (link.getAttribute('href') || "").split("/").pop() || "index.html";
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });


    // 5. Back to Top Button Visibility
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        const showButtonThreshold = 300;
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > showButtonThreshold) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
    } else {
        console.warn('Back to top button not found.');
    }


    // 6. Current Year in Footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    } else {
        console.warn('Current year span in footer not found.');
    }

    // 7. Animated Number Counters for Hero Stats (for index.html hero)
    // Check if we are on index.html or if the specific element exists before running
    if (document.querySelector('.hero-stats-strip .stat-value')) {
        const statValues = document.querySelectorAll('.hero-stats-strip .stat-value');
        const animateCounter = (element) => {
            const target = +element.getAttribute('data-target');
            const duration = 2000;
            const incrementTime = 15; 
            const totalSteps = duration / incrementTime;
            const stepValue = target / totalSteps;
            let current = 0;
            const updateCounter = () => {
                current += stepValue;
                if (current < target) {
                    element.innerText = Math.ceil(current);
                    setTimeout(updateCounter, incrementTime);
                } else {
                    element.innerText = target;
                }
            };
            if (!element.dataset.animated) {
                updateCounter();
                element.dataset.animated = "true";
            }
        };
        if (statValues.length > 0) {
            const observerOptions = { root: null, rootMargin: '0px', threshold: 0.2 };
            const counterObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        observer.unobserve(entry.target);
                    }
                });
            }, observerOptions);
            statValues.forEach(stat => counterObserver.observe(stat));
        }
    }


    // 8. Video Modal Functionality (for index.html hero video)
    // Check if we are on index.html or if the specific elements exist
    if (document.getElementById('play-video-pitch')) {
        const playVideoButton = document.getElementById('play-video-pitch');
        const videoModalOverlay = document.getElementById('video-modal-overlay');
        const videoModalClose = document.getElementById('video-modal-close');
        const youtubePlayerIframe = document.getElementById('youtube-video-player'); 

        function controlYouTubePlayer(action) {
            if (youtubePlayerIframe && youtubePlayerIframe.contentWindow && typeof youtubePlayerIframe.contentWindow.postMessage === 'function') {
                youtubePlayerIframe.contentWindow.postMessage(JSON.stringify({'event': 'command', 'func': action === 'play' ? 'playVideo' : 'pauseVideo', 'args': []}), '*');
            }
        }
        
        if (playVideoButton && videoModalOverlay && videoModalClose && youtubePlayerIframe) {
            playVideoButton.addEventListener('click', (e) => {
                e.preventDefault();
                videoModalOverlay.classList.add('active');
                document.body.style.overflow = 'hidden';
                setTimeout(() => controlYouTubePlayer('play'), 100); 
            });
            const closeModal = () => {
                videoModalOverlay.classList.remove('active');
                document.body.style.overflow = '';
                controlYouTubePlayer('pause');
            };
            videoModalClose.addEventListener('click', closeModal);
            videoModalOverlay.addEventListener('click', (e) => { if (e.target === videoModalOverlay) closeModal(); });
            document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && videoModalOverlay.classList.contains('active')) closeModal(); });
        } else {
            // More specific warnings if elements are expected but not all found
            if (!playVideoButton) console.warn('Play video button element not found on this page.');
            if (!videoModalOverlay) console.warn('Video modal overlay element not found on this page.');
            if (!videoModalClose) console.warn('Video modal close button element not found on this page.');
            if (!youtubePlayerIframe) console.warn('YouTube player iframe element not found on this page.');
        }
    }

    // ---- Global Export Functions ----
    // These are defined here so they are available when financials.html (or other pages) load this script.
    // The actual export libraries (SheetJS, jsPDF) should be linked in the HTML of the page that uses these buttons.
    window.exportTableToExcel = function(tableID, filename = 'Exported_Data') {
        if (typeof XLSX === 'undefined') {
            console.error('SheetJS (XLSX) library is not loaded for Excel export.');
            alert('Excel export library not found. Please ensure it is linked in your HTML before this script.');
            return;
        }
        const tableEl = document.getElementById(tableID);
        if (!tableEl) {
            console.error(`Table with ID "${tableID}" not found for Excel export.`);
            alert('Table not found for export.');
            return;
        }
        try {
            const wb = XLSX.utils.book_new();
            const ws = XLSX.utils.table_to_sheet(tableEl);
            XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
            XLSX.writeFile(wb, `${filename}_${new Date().toISOString().slice(0,10)}.xlsx`);
        } catch (error) {
            console.error("Error exporting to Excel:", error);
            alert("An error occurred while exporting to Excel. Check the console.");
        }
    };

    window.exportTableToPDF = function(tableID, filename = 'Exported_Data') {
        if (typeof jspdf === 'undefined' || typeof jspdf.jsPDF === 'undefined' || (typeof autoTable === 'undefined' && (typeof jspdf.jsPDF.API === 'undefined' || typeof jspdf.jsPDF.API.autoTable === 'undefined'))) {
            console.error('jsPDF or jsPDF-AutoTable library is not loaded for PDF export.');
            alert('PDF export library not found. Please ensure it is linked in your HTML before this script.');
            return;
        }
        const { jsPDF } = jspdf; // Ensure jsPDF is correctly accessed
        const tableEl = document.getElementById(tableID);
        if (!tableEl) {
            console.error(`Table with ID "${tableID}" not found for PDF export.`);
            alert('Table not found for export.');
            return;
        }

        try {
            const doc = new jsPDF({ orientation: 'landscape', unit: 'pt', format: 'a4' });
            
            const companyName = "Yellow Bus Transportation Pvt. Ltd.";
            // Try to get title from section header containing the table, or fallback
            const sectionContainingTable = tableEl.closest('section');
            const sectionHeaderH2 = sectionContainingTable ? sectionContainingTable.querySelector('.section-header h2') : null;
            const reportTitle = sectionHeaderH2 ? sectionHeaderH2.innerText.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim() : "Financial Data";

            const exportDate = `Exported on: ${new Date().toLocaleDateString()}`;
            let startY = 40;

            doc.setFontSize(16); doc.setFont("helvetica", "bold");
            doc.text(companyName, doc.internal.pageSize.getWidth() / 2, startY, { align: 'center' });
            startY += 20;
            doc.setFontSize(12); doc.setFont("helvetica", "normal");
            doc.text(reportTitle, doc.internal.pageSize.getWidth() / 2, startY, { align: 'center' });
            startY += 15;
            doc.setFontSize(9);
            // Position date to the right, accounting for its width
            const dateWidth = doc.getTextWidth(exportDate);
            doc.text(exportDate, doc.internal.pageSize.getWidth() - dateWidth - 40 , 35 , { align: 'left'});


            doc.autoTable({
                html: `#${tableID}`, startY: startY + 5, theme: 'grid',
                headStyles: { fillColor: [10, 25, 47], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 7 }, // Primary Dark
                bodyStyles: { fontSize: 7, cellPadding: 3 }, // Adjusted cellPadding
                styles: { font: 'helvetica', overflow: 'linebreak' },
                columnStyles: { 0: { cellWidth: 120, fontStyle: 'bold' } }, // First column wider and bold
                pageBreak: 'auto',
                didDrawPage: function (data) {
                    doc.setFontSize(7); doc.setTextColor(100);
                    doc.text('Yellow Bus Confidential', data.settings.margin.left, doc.internal.pageSize.height - 10);
                    doc.text('Page ' + doc.internal.getNumberOfPages(), doc.internal.pageSize.width - data.settings.margin.right, doc.internal.pageSize.height - 10, { align: 'right' });
                }
            });
            doc.save(`${filename}_${new Date().toISOString().slice(0,10)}.pdf`);
        } catch (error) {
            console.error("Error exporting to PDF:", error);
            alert("An error occurred while exporting to PDF. Check the console.");
        }
    };

    window.exportTableToCSV = function(tableID, filename = 'Exported_Data') {
        const tableEl = document.getElementById(tableID);
        if (!tableEl) {
            console.error(`Table with ID "${tableID}" not found for CSV export.`);
            alert('Table not found for export.');
            return;
        }
        try {
            let csv = [];
            const rows = tableEl.querySelectorAll("tr");
            
            for (const row of rows) {
                const rowData = [];
                const cols = row.querySelectorAll("td, th");
                for (const col of cols) {
                    let data = col.innerText.replace(/"/g, '""'); // Escape double quotes
                    if (data.includes(',') || data.includes('\n') || data.includes('"')) {
                        data = `"${data}"`; // Enclose in double quotes
                    }
                    rowData.push(data);
                }
                csv.push(rowData.join(","));
            }

            const csvFile = new Blob([csv.join("\n")], { type: "text/csv;charset=utf-8;" });
            const downloadLink = document.createElement("a");
            downloadLink.href = URL.createObjectURL(csvFile);
            downloadLink.download = `${filename}_${new Date().toISOString().slice(0,10)}.csv`;
            downloadLink.style.display = "none";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } catch (error) {
            console.error("Error exporting to CSV:", error);
            alert("An error occurred while exporting to CSV. Check the console.");
        }
    };

    // assets/js/script.js (APPEND THIS INSIDE DOMContentLoaded)

    // ... (all previous global JS code) ...

    // 9. Contact Form Handling (for contact.html)
    const contactForm = document.getElementById('investor-contact-form');
    if (contactForm) {
        const formStatusMessage = document.getElementById('form-status-message');

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default page reload

            // Basic client-side validation (can be more extensive)
            const name = contactForm.querySelector('#contact-name').value.trim();
            const email = contactForm.querySelector('#contact-email').value.trim();
            const message = contactForm.querySelector('#contact-message').value.trim();

            if (!name || !email || !message) {
                formStatusMessage.textContent = 'Please fill in all required fields.';
                formStatusMessage.className = 'form-status error'; // Add error class
                return;
            }
            if (!/^\S+@\S+\.\S+$/.test(email)) { // Simple email validation
                formStatusMessage.textContent = 'Please enter a valid email address.';
                formStatusMessage.className = 'form-status error';
                return;
            }

            // Placeholder for form submission logic
            // In a real application, you would use Fetch API or XMLHttpRequest
            // to send data to a backend endpoint or a third-party service.

            // Simulate submission
            formStatusMessage.textContent = 'Sending your message...';
            formStatusMessage.className = 'form-status'; // Reset classes
            
            const formData = new FormData(contactForm);
            // Example: Using Fetch with Formspree (replace YOUR_FORM_ID)
            // fetch('https://formspree.io/f/YOUR_FORM_ID', {
            //     method: 'POST',
            //     body: formData,
            //     headers: {
            //         'Accept': 'application/json'
            //     }
            // })
            // .then(response => {
            //     if (response.ok) {
            //         formStatusMessage.textContent = 'Thank you! Your message has been sent successfully.';
            //         formStatusMessage.className = 'form-status success';
            //         contactForm.reset(); // Clear the form
            //     } else {
            //         response.json().then(data => {
            //             if (Object.hasOwn(data, 'errors')) {
            //                 formStatusMessage.textContent = data["errors"].map(error => error["message"]).join(", ");
            //             } else {
            //                 formStatusMessage.textContent = 'Oops! There was a problem submitting your form.';
            //             }
            //             formStatusMessage.className = 'form-status error';
            //         })
            //     }
            // })
            // .catch(error => {
            //     console.error('Form submission error:', error);
            //     formStatusMessage.textContent = 'Oops! There was a problem submitting your form. Please try again.';
            //     formStatusMessage.className = 'form-status error';
            // });

            // --- SIMULATED SUCCESS FOR DEMO ---
            setTimeout(() => {
                formStatusMessage.textContent = 'Thank you! Your message has been sent successfully. (This is a demo)';
                formStatusMessage.className = 'form-status success';
                contactForm.reset(); 
            }, 1500);
            // --- END SIMULATED SUCCESS ---
        });
    }

// }); // This should be the very last line of your script.js if it was opened at the top.


    // -- NO CHART INITIALIZATION CODE SHOULD BE HERE --
    // -- That belongs in charts-financials.js for the financials page --

}); // End DOMContentLoaded