function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res =>  res.json() )
        .then( states => {
            for ( const state of states ) {
                ufSelect.innerHTML += `<option value=${state.id}> ${state.nome} </option>`
            }
        })
}

populateUFs();

function getCities(event) {
    const citiesSelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("[name=state]")
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${event.target.value}/municipios`

    stateInput.value = event.target.options[event.target.selectedIndex].text

    fetch(url)
        .then(res => res.json())
        .then(cities => {
            for (const city of cities) {
                citiesSelect.innerHTML += `<option value=${city.id}> ${city.nome} </option>`
            }
        })
    
    citiesSelect.disabled = false
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)