document.addEventListener("DOMContentLoaded", () => {
    const filmUrl = new URLSearchParams(window.location.search).get("filmUrl");

    $('#backButton').on('click', function() {
        window.history.back();
    });

    if (filmUrl) {
        fetch(`/testePratico/src/EndPoints/film_endpoint.php?filmUrl=${encodeURIComponent(filmUrl)}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro ao buscar os detalhes do filme.");
                }
                return response.json();
            })
            .then((film) => {

                $("#film-title").text(film.title);

                $("#film-details").html(`
                    <p>Episode Number: ${film.episode_id}</p>
                    <p>Synopsis: ${film.opening_crawl}</p>
                    <p>Director: ${film.director}</p>
                    <p>Producer: ${film.producer}</p>
                    <p>Release Date: ${film.release_date}</p>
                    <p>Film Age: ${film.age.years} Years ${film.age.months} Months and ${film.age.days} Days</p>
                `);

                const trailerUrls = {
                    "A New Hope": "https://www.youtube-nocookie.com/embed/vZ734NWnAHA?si=ZlLAjdnJZqFA-2VX",
                    "The Empire Strikes Back": "https://www.youtube-nocookie.com/embed/JNwNXF9Y6kY",
                    "Return of the Jedi": "https://www.youtube-nocookie.com/embed/7L8p7_SLzvU",
                    "The Phantom Menace":"https://www.youtube-nocookie.com/embed/bD7bpG-zDJQ?si=A7xwSBTBiW0INPTr",
                    "Attack of the Clones":"https://www.youtube-nocookie.com/embed/gYbW1F_c9eM?si=W2PTLMZHe2Ma8uHi",
                    "Revenge of the Sith":"https://www.youtube-nocookie.com/embed/5UnjrG_N8hU?si=Qp-lODKYcsw3AcRK",
                    "The Force Awakens":"https://www.youtube-nocookie.com/embed/sGbxmsDFVnE?si=h9zS7z7I6Pe3BCCd",
                };

                const trailerUrl = trailerUrls[film.title];
                if (trailerUrl) {
                    $("#film-trailer").attr({
                        src: trailerUrl,
                        width: "100%",
                        height: "750"
                    });
                }

                const charactersList = $("#character-list");
                charactersList.html("<h3>Characters:</h3>");
                const ul = $("<ul>").css("list-style", "none");

                film.characters.forEach((character, index) => {
                    const characterItem = $("<li>");
                    const characterLink = $("<a>").text(character).attr("href", "#").css("text-decoration", "none");

                    characterLink.on("click", function(event) {
                        event.preventDefault();
                        fetchCharacterDetails(film.chLinks[index]);
                    });

                    characterItem.append(characterLink);
                    ul.append(characterItem);
                });

                charactersList.append(ul);

            })
            .catch((error) => {
                console.error(error);
            });
    }

    function fetchCharacterDetails(characterUrl) {


        $("#loading-indicator").css("display", "block");


        const modal = new bootstrap.Modal($("#modal")[0]);
        modal.show();


        $("#character-details").css("display", "none");


        fetch(`/testePratico/src/EndPoints/character_endpoint.php?characterUrl=${encodeURIComponent(characterUrl)}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Erro na requisição");
                }
                return response.json();
            })
            .then((data) => {
                const modalPage = $('#modal');
                const characterDetails = $('#character-details');
                const loadingIndicator = $('#loading-indicator');

                const modal = new bootstrap.Modal(modalPage[0]);
                modal.show();

                characterDetails.empty();

                const row = $('<div>').addClass('row align-items-start g-3');

                const colLeft = $('<div>').addClass('col-md-8').html(`
                    <h2>${data.name}</h2>
                    <p><strong>Gender:</strong> ${data.gender}</p>
                    <p><strong>Birth Year:</strong> ${data.birth_year}</p>
                    <p><strong>Hair Color:</strong> ${data.hair_color}</p>
                    <p><strong>Species:</strong> ${data.species}</p>
                    <p><strong>Homeworld:</strong> ${data.homeworld}</p>
                    <p><strong>Skin Color:</strong> ${data.skin_color}</p>
                    <p><strong>Mass:</strong> ${data.mass} KG</p>
                `);

                const colRight = $('<div>').addClass('col-md-4 text-end');

                const filmsList = $('<ul>').css('list-style', 'none').html('<h5>Appears in:</h5>');
                data.films.forEach((film) => {
                    const $filmItem = $('<li>').text(film);
                    filmsList.append($filmItem);
                });

                const starshipsList = $('<ul>').css('list-style', 'none').html('<h5>Starships:</h5>');
                data.starships.forEach((ship) => {
                    const shipItem = $('<li>').text(ship);
                    starshipsList.append(shipItem);
                });

                colRight.append(filmsList);
                colRight.append(starshipsList);

                row.append(colLeft);
                row.append(colRight);

                characterDetails.append(row);

                loadingIndicator.css('display', 'none');
                characterDetails.css('display', 'block');


            })
            .catch((error) => {
                console.error("Erro ao buscar detalhes do personagem:", error);
                loadingIndicator.style.display = "none";
            });
    }



    const page = $("#page");
    const themeToggle = $("#themeToggle");

    themeToggle.on("click", () => {
        const currentTheme = page.attr("data-bs-theme");

        if (currentTheme === "light") {
            page.attr("data-bs-theme", "dark");
            themeToggle.removeClass("light").addClass("dark");
        } else {
            page.attr("data-bs-theme", "light");
            themeToggle.removeClass("dark").addClass("light");
        }
    });


    function closeModal() {
        const filmDetails = $('#film-details');
        const characterDetails = $('#character-details');
        const modalElement = $('#modal');

        if (filmDetails.css('display') === 'none') {
            characterDetails.css('display', 'none');
            filmDetails.css('display', 'block');
        } else {
            const bootstrapModal = bootstrap.Modal.getInstance(modalElement[0]);
            if (bootstrapModal) {
                bootstrapModal.hide();
            }

            const backdrop = $('.modal-backdrop');
            if (backdrop.length) {
                backdrop.remove();
            }

            filmDetails.empty();
            characterDetails.empty();
        }
    }

    const closeButton = $("#closeButton");

    if (closeButton.length) {
        closeButton.on('click', closeModal);
    }

    const modal = $("#modal");

    modal.on('hidden.bs.modal', () => {
        $("body").css("overflow", '');
    });
});
