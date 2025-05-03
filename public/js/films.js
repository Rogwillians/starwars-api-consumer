function displayFilmDetails(film, filmId) {
    const modal = $("#modal");
    const filmDetails = $("#film-details");
    const characterDetails = $("#character-details");

    filmDetails.empty();
    characterDetails.empty();

    const trailerRow = $("<div>").addClass("row mb-3");
    const trailerCol = $("<div>").addClass("col-12");

    trailerRow.append(trailerCol);
    filmDetails.append(trailerRow);

    const filmRow = $("<div>").addClass("row");
    const filmInfoCol = $("<div>").addClass("col-md-6");
    const additionalInfoCol = $("<div>").addClass("col-md-2 ms-auto");

    filmRow.append(filmInfoCol, additionalInfoCol);
    filmDetails.append(filmRow);

    filmInfoCol.html(`
        <h2>${film.title}</h2>
        <p>Episode Number: ${film.episode_id}</p>
    `);

    const trailerUrl = filmTrailers[film.title];
    if (trailerUrl) {
        const $trailerTitle = $("<h5>").text("Trailer:");
        trailerCol.append($trailerTitle);

        const iframe = $("<iframe>").attr({
            width: "100%",
            height: "500",
            src: trailerUrl,
            title: `${film.title} Trailer`,
            frameBorder: "0",
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
            allowFullscreen: true
        });

        trailerCol.append(iframe);
    } else {
        trailerCol.text("Trailer not available for this film.");
    }


    const redirectButton = $("<button>")
        .text("View Details")
        .addClass("btn btn-primary mt-3")
        .on("click", () => {
            window.location.href = `/testePratico/templates/views/film_details.html?filmUrl=${film.url}`;
        });

    filmDetails.append(redirectButton);


    const bootstrapModal = new bootstrap.Modal(modal[0]);
    bootstrapModal.show();
}


function closeModal() {
    const characterDetails = $("#character-details");
    const modalElement = $("#modal");

    const bootstrapModal = bootstrap.Modal.getInstance(modalElement[0]);
    if (bootstrapModal) {
        bootstrapModal.hide();
    }


    const backdrop = $(".modal-backdrop");
    if (backdrop.length) {
        backdrop.remove();
    }

    $("body").css("overflow", '');

    characterDetails.text("");
}


const closeButton = $('#closeButton');
closeButton.on('click', closeModal);


const modal = $('#modal');
modal.on('hidden.bs.modal', () => {
    $('body').css('overflow', '');
});


const page = $('#page');
const themeToggle = $('#themeToggle');

themeToggle.on('click', () => {
    const currentTheme = page.attr('data-bs-theme');

    if (currentTheme === 'light') {
        page.attr('data-bs-theme', 'dark');
        themeToggle.removeClass('light').addClass('dark');
    } else {
        page.attr('data-bs-theme', 'light');
        themeToggle.removeClass('dark').addClass('light');
    }
});

