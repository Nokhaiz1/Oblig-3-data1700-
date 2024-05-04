let liste = [];

function kjopBillett() {
  const film = $("#film-liste").val();
  const antall = $("#antall-felt").val();
  const fornavn = $("#fornavn-felt").val();
  const etternavn = $("#etternavn-felt").val();
  const telefonnr = $("#telefonnr-felt").val();
  const epost = $("#epost-felt").val();

  if (!validerNavn(fornavn, telefonnr, epost)) {
    return;
  }

  if (!validerNavn()) {
    // Validate the name first
    return;
  }
  let kunde = {
    film: film,
    antall: parseInt(antall, 10),
    fornavn: fornavn,
    etternavn: etternavn,
    telefonnummer: parseInt(telefonnr, 10), // Assuming phone number is to be stored as integer
    epost: epost,
  };

  $.post(
    "/lagre",
    JSON.stringify(kunde),
    function () {
      hentAlle();
    },
    "json"
  ).fail(function () {
    alert("Error saving data");
  });

  function hentAlle() {
    $.get("/hent", function (data) {
      formaterBilett(data);
    });
  }

  if (kunde.antall === "") {
    feilAntall.html("Antall mangler");
  } //Sjekker om det skrives noe i feltet,
  else feilAntall.html(""); //dersom feltet er tomt sendes feilmeldingen, og når feltet blir fylt fjernes den

  if (kunde.fornavn === "") {
    feilFornavn.html("Fornavn mangler");
  } else feilFornavn.html("");

  if (kunde.etternavn === "") {
    feilEtternavn.html("Etternavn mangler");
  } else feilEtternavn.html("");

  if (kunde.telefonnummer === "") {
    feilTelefonnr.html("Telefonnummer mangler");
  } else feilTelefonnr.html("");

  if (kunde.epost === "") {
    feilEpost.html("Epost mangler");
  } else feilEpost.html("");

  if (
      //Her sjekkes det om alle feltene har fått en verdi,
      kunde.antall !== "" && // og hvis de har fått en verdi så dyttes objektet inn i lista.
      kunde.fornavn !== "" && // I tillegg kjøres utMelding funksjonen som presenterer objektet på en fin måte
      kunde.etternavn !== "" && // Til slutt tømmes feltene slik at "neste" kunde kan fylle de inn igjen
      kunde.telefonnr !== "" &&
      kunde.epost !== ""
  ) {
    liste.push(kunde);
    formaterBilett();

    $("#film-liste").val("");
    $("#antall-felt").val("");
    $("#fornavn-felt").val("");
    $("#etternavn-felt").val("");
    $("#telefonnr-felt").val("");
    $("#epost-felt").val("");
  }
}

function formaterBilett() {
  let ut =
      "<tr>" +
      "<th>Film</th>" + // Setter opp visningen av bestillinger slik vist i opggaven
      "<th>Antall</th>" +
      "<th>Fornavn</th>" +
      "<th>Etternavn</th>" +
      "<th>Telefonnr</th>" +
      "<th>Epost</th>" +
      "</tr>";
  for (let bestilling of liste) {
    ut += "<tr>";

    ut +=
        "<td>" +
        bestilling.film +
        "</td>" + // Henter ut alle bestillingene fra lista
        "<td>" +
        bestilling.antall +
        "</td>" +
        "<td>" +
        bestilling.fornavn +
        "</td>" +
        "<td>" +
        bestilling.etternavn +
        "</td>" +
        "<td>" +
        bestilling.telefonnummer +
        "</td>" +
        "<td>" +
        bestilling.epost +
        "</td>" +
        "<br>";

  if (!regexp_navn.test(fNavn)) {
    $("#tom-fornavn").html("Fornavnet må være mellom 0 og 20 bokstaver");
    isValid = false;
  } else {
    $("#tom-fornavn").html("");
  }

  if (!regex_epost.test(epost)) {
    $("#tom-epost").html("Eposten er feil");
    isValid = false;
  } else {
    $("#tom-epost").html("");
  }

  if (!regex_tlf.test(tlf)) {
    $("#tom-telefonnr").html("Telefon er feil");
    isValid = false;
  } else {
    $("#tom-telefonnr").html("");
  }

  return isValid;
}

function clearInputFields() {
  $("#film-liste").val("");
  $("#antall-felt").val("");
  $("#fornavn-felt").val("");
  $("#etternavn-felt").val("");
  $("#telefonnr-felt").val("");
  $("#epost-felt").val("");
}

function updateErrorMessages(kunde) {
  // Simplified for brevity
}

function validerNavn() {
  const regexp = /^[A-Za-z]{2,32}$/; // This regex matches exactly 4 uppercase letters
  const fNavn = $("#fornavn-felt").val();
  const feilFornavn = $("#tom-fornavn");

  if (!regexp.test(fNavn)) {
    feilFornavn.html("Fornavnet må være 4 store bokstaver");
    return false;
  } else {
    feilFornavn.html("");
    return true;
  }
}
