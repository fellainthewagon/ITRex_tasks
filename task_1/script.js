const bodyData = document.querySelector(".body-data");
const errorMessage = document.querySelector(".alert");

/* * * * * * * * * LOADING CONTENT * * * * * * * * */

document.addEventListener("DOMContentLoaded", () => {
  const url = "https://www.nbrb.by/api/exrates/rates";
  const param = { periodicity: 0 };

  getData(url, param).then((currencies) => setupUI(currencies));
});

/* * * * * * * * * GET DATA * * * * * * * * */

async function getData(url, param) {
  try {
    let response = await $.getJSON(url, param);

    const data = response.map((item) => {
      const {
        Cur_Name: name,
        Cur_Scale: scale,
        Cur_Abbreviation: short,
        Cur_OfficialRate: rate,
      } = item;
      return { name, scale, rate, short };
    });

    return data;
  } catch (error) {
    errorMessage.style.display = "block";
    setTimeout(() => (errorMessage.style.display = "none"), 3000);

    throw new Error("Failed to load data: " + error.message);
  }
}

/* * * * * * * * * SET DATA to UI * * * * * * * * */

function setupUI(currencies) {
  let result = "";

  currencies.forEach((currency) => {
    result += `
      <tr>
        <td class="currency-name">
          <div class="country">
            <i class="flag-icon flag-icon-${currency.short
              .toLowerCase()
              .slice(0, 2)}"></i>
            <span class="name">${currency.name}</span>
          </div>
        </td>
        <td class="currency-amount">${currency.scale} ${currency.short}</td>
        <td class="rate">${currency.rate}</td>
      </tr>`;
  });

  bodyData.innerHTML = result;
}
