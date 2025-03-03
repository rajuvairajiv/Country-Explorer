document.addEventListener("DOMContentLoaded", () => {

    const search = document.querySelector(".search");
    const reset = document.querySelector(".resetitems");
    const resultDiv = document.getElementById("result");

    async function searchCountry() {

        const searchInput = document.getElementById("searchInput").value;

        try {
            const response = await fetch(`https://restcountries.com/v3.1/name/${searchInput}`);
            const data = await response.json();

            if (data.status === 404) {
                throw new Error("Country not found");
            }

            const country = data[0];

            const currencies = Object.values(country.currencies || {})
                .map((currency) => {
                    return `${currency.name}(${currency.symbol})`;
                })
                .join(",");
            const languages = Object.values(country.languages || {}).join(",");
            resultDiv.innerHTML = `
                <br>
                <div class="papa-table">
                    <img class="flag" src="${country.flags.png}" />
                    <table  class='country-info-table'>
                        <tr>
                            <td><strong>Country--</strong></td>
                            <td class="result">${country.name.common}</td>
                        </tr>

                        <tr>
                            <td><strong>Capital--</strong></td>
                            <td class="result">${country.capital[0] || "N/A"}</td>
                        </tr>
                        <tr>
                            <td><strong>Population--</strong></td>
                            <td class="result">${country.population}</td>
                        </tr>
                        <tr>
                            <td><strong>Currencies--</strong></td>
                            <td class="result">${currencies}</td>
                        </tr>
                        <tr>
                            <td><strong>Region--</strong></td>
                            <td class="result">${country.region}</td>
                        </tr>
                        <tr>
                            <td><strong>Languages--</strong></td>
                            <td class="result">${languages || "N/A"}</td>
                        </tr>
                    </table>
                </div>
            `;

            resultDiv.classList.remove("hidden")

        } catch (error) { }


    }

    function resetSearch() {
        searchInput.value = "";
        resultDiv.innerHTML = "";
        resultDiv.classList.add("hidden");
    }


    search.addEventListener("click", searchCountry);
    reset.addEventListener("click", resetSearch);

});



